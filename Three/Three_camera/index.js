window.addEventListener('DOMContentLoaded', init);
 
function init(){
    
    //サイズを指定   
    const width = 960;
    const height = 540;
    let rot = 0;
    let mouseX = 0;

    //レンダラーを作成
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#myCanvas')});
    renderer.setSize(width, height);

    //シーンを作成
    const scene = new THREE.Scene();

    //カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 500, +1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1,1,1);
    scene.add(directionalLight);
    
    //マテリアルを作成
    const material = new THREE.MeshStandardMaterial({color: 0xFF0000});

    //球体ジオメトリを作成
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    //形状とマテリアルからメッシュを作成します。
    const earthMesh = new THREE.Mesh(geometry, material);
    //シーンにメッシュを追加します。
    scene.add(earthMesh);

    //星屑を作成します（カメラの動きを解り易くするため)
    createStarField();

    function createStarField(){
        //形状データを作成
        const geometry = new THREE.Geometry();
        for(let i = 0; i < 1000; i++){
            geometry.vertices.push(
                new THREE.Vector3(
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5),
                    3000 * (Math.random() - 0.5)
                )
            );
        }

        //マテリアル作成
        const material = new THREE.PointsMaterial({
            size: 10,
            color: 0xffffff
        });

        //物体を作成
        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);
    }


    //マウスの座標はマウスが動いた時のみ取得できる
    document.addEventListener("mousemove", (event) => {mouseX = event.pageX;})

    tick();

    //毎フレーム時に実行されるループイベント
    function tick(){
        //マウスの位置に応じて角度を設定
        //マウスのX座標がステージの幅の何％の位置にあるか調べてそれを360°で乗算する。
        const targetRot = (mouseX / window.innerWidth)*360;
        //イージングの公式を用いて滑らかにする
        //値 += (目標値-現在の値)*減速値
        rot += (targetRot - rot)*0.02;

        //ラジアンに変換する
        const radian = (rot * Math.PI)/180;
        //角度に応じてカメラの位置を設定
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 1000 * Math.cos(radian);
        //原点方向を見つめる
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        //レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

    
}

