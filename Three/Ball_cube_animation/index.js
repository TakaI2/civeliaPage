window.addEventListener('DOMContentLoaded', init);

//�ϐ�
let step = 0;   

let camera;
let scene;
let renderer;     

function init(){

        let stats = initStats(); //FPS��\�����邽�߂̊֐���錾

        //dat.GUI�I�u�W�F�N�g�Ƀv���p�e�B��n��
        let controls = new function(){
            this.rotationSpeed = 0.02;
            this.bouncingSpeed = 0.03
        }

        let gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'bouncingSpeed', 0, 0.5);

        //�u���E�U�T�C�Y�̕ύX�ɑΉ�
        window.addEventListener('resize', onResize, false);

        // �T�C�Y���w��
        const width = 960;
        const height = 540;

        // �����_���[���쐬
        renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
        });
        renderer.setClearColor(new THREE.Color(0xEEEEEE)); //�w�i�𔒂�����
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight); //�V�[���̑傫�����w��

        //�����_�[�ɉe�̕`����w��
        renderer.shadowMap.enabled = true;

        // �V�[�����쐬
        scene = new THREE.Scene();

        // �J�������쐬
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, +1000);

        //�����쐬
        let axes = new THREE.AxisHelper(20);
        scene.add(axes);

        // �����쐬
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        const material = new THREE.MeshNormalMaterial();
        //const material = new THREE.MeshBasicMaterial({color: 0x0000FF});
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);

        //���ʂ��쐬
        let planeGeometry = new THREE.PlaneGeometry(60, 20);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        plane.receiveShadow = true; // ���ʂɉe���ł���悤�ɐݒ�

        scene.add(plane);



        //�L���[�u���쐬
        let cubeGeometry = new THREE.BoxGeometry(4,4,4);
        let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        //�L���[�u�̉e��ݒ�
        cube.castShadow = true;

        scene.add(cube);



        //���̂��쐬
        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        let sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;

        sphere.castShadow = true;

        scene.add(sphere);
        
        
        //�J��������]
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);


        //�X�|�b�g���C�g
        let spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-20, 30, -5);
        spotLight.castShadow = true; //�X�|�b�g���C�g���e�̔������ɂ���B
        scene.add(spotLight);

        renderScene();

        // ���t���[�����Ɏ��s����郋�[�v�C�x���g�ł�
        
        function renderScene(){
            stats.update();

            //�L���[�u����]
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            //�{�[�����ړ�
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * (Math.cos(step)));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        }
        

        function initStats(){
            
            let stats = new Stats();   
            
            stats.setMode(0); //0�ɂ���ƕb�Ԃ̃t���[�����𑪒�ł���悤�ɂȂ�B
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

