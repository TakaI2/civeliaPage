window.addEventListener('DOMContentLoaded', init);

//変数
let step = 0;   

let camera;
let scene;
let renderer;     

function init(){

        let stats = initStats(); //FPSを表示するための関数を宣言

        //dat.GUIオブジェクトにプロパティを渡す
        let controls = new function(){
            this.rotationSpeed = 0.02;
            this.bouncingSpeed = 0.03
        }

        let gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'bouncingSpeed', 0, 0.5);

        //ブラウザサイズの変更に対応
        window.addEventListener('resize', onResize, false);

        // サイズを指定
        const width = 960;
        const height = 540;

        // レンダラーを作成
        renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
        });
        renderer.setClearColor(new THREE.Color(0xEEEEEE)); //背景を白くする
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight); //シーンの大きさを指定

        //レンダーに影の描画を指示
        renderer.shadowMap.enabled = true;

        // シーンを作成
        scene = new THREE.Scene();

        // カメラを作成
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, +1000);

        //軸を作成
        let axes = new THREE.AxisHelper(20);
        scene.add(axes);

        // 箱を作成
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        const material = new THREE.MeshNormalMaterial();
        //const material = new THREE.MeshBasicMaterial({color: 0x0000FF});
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);

        //平面を作成
        let planeGeometry = new THREE.PlaneGeometry(60, 20);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        plane.receiveShadow = true; // 平面に影ができるように設定

        scene.add(plane);



        //キューブを作成
        let cubeGeometry = new THREE.BoxGeometry(4,4,4);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        //キューブの影を設定
        cube.castShadow = true;

        scene.add(cube);



        //球体を作成
        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;

        sphere.castShadow = true;

        scene.add(sphere);
        
        
        //カメラを回転
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);


        //スポットライト
        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20, 30, -5);
        spotLight.castShadow = true; //スポットライトを影の発生源にする。
        scene.add(spotLight);

        renderScene();

        // 毎フレーム時に実行されるループイベントです
        
        function renderScene(){
            stats.update();

            //キューブを回転
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            //ボールを移動
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * (Math.cos(step)));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }
        

        function initStats(){
            
            let stats = new Stats();   
            
            stats.setMode(0); //0にすると秒間のフレーム数を測定できるようになる。
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById("Stats-output").appendChild(stats.domElement);
            return stats;
            
        }

        function onResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }


	}

