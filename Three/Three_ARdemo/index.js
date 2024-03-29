﻿const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(new THREE.Color(), 0);
renderer.setSize(640, 480);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0px';
renderer.domElement.style.left = '0px';
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.visible = false;
const camera = new THREE.Camera();
scene.add(camera);

const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam'
});

arToolkitSource.init(() => {
    setTimeout(() => {
        onresize();
    }, 2000);
});

addEventListener('resize', () => {
    onresize();
})

function onResize(){
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if(arToolkitContext.arController !== null){
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
};



const arToolkitSource = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'data/camera_para.dat',
    detectionMode: 'mono'
});

arToolkitContext.init(() => {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});
 
const arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
    type: 'pattern',
    patternUrl: 'data/patt.hiro',
    changeMatrixMode: 'cameraTransformMatrix'
});

const mesh = new THREE.Mesh(
    new THREE.CubeGeometry(1,1,1),
    new THREE.MeshNormalMaterial(),
);
mesh.position.y = 1.0;
scene.add(mesh);

const clock = new THREE.Clock();
requestAnimationFrame(function animate(){
    requestAnimationFrame(animate);
    if(arToolkitSource.ready){
        arToolkitContext.update(arToolkitSource.domElement);
        scene.visible = camera.visible;
    }
    const delta = clock.getDelta();
    mesh.rotation.x += delta * 1.0;
    mesh.rotation.y += delta * 1.5;
    renderer.render(scene, camera);
});



