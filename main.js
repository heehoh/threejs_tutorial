import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// function init() {

//     initScene(); 씬 초기화
//     initShadowMapViewers(); <- 이건 뭘까
//     initMisc(); <- 이것도 뭘까

//     document.body.appendChild( renderer.domElement ); <- 돔에 캔버스 추가
//     window.addEventListener( 'resize', onWindowResize ); <- 이벤트 리스너 추가

// }

// function initScene() {

//     camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ); // 카메라 설치 시야각 
//     camera.position.set( 0, 15, 35 ); // 카메라 위치 설정 <- 중요할 듯!!

//     scene = new THREE.Scene();

//     // Lights

//     scene.add( new THREE.AmbientLight( 0x404040, 3 ) ); // 회색 계열(0x404040), 강도 3의 주변광을 추가하는 코드 씬 전체에 균일하게 비추는 광원을 추가

    // spotLight = new THREE.SpotLight( 0xffffff, 500 ); // 하얀색, 강도 500의 점 광원 생성하고 설정한 뒤 추가
    // spotLight.name = 'Spot Light'; // Spot Ligth로 이름 설정
    // spotLight.angle = Math.PI / 5; // 광원이 비추는 각도 설정 Math.Pi / 5는 36도 정도이다.
    // spotLight.penumbra = 0.3; // 펜엄브라(반영역) 값을 0.3으로 설정함. 이 값이 커질수록 광원 가장자리 그림자가 부드러워짐
    // spotLight.position.set( 10, 10, 5 );
    // spotLight.castShadow = true;
    // spotLight.shadow.camera.near = 8;
    // spotLight.shadow.camera.far = 30;
    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;
    // scene.add( spotLight );

//     scene.add( new THREE.CameraHelper( spotLight.shadow.camera ) );

//     dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
//     dirLight.name = 'Dir. Light';
//     dirLight.position.set( 0, 10, 0 );
//     dirLight.castShadow = true;
//     dirLight.shadow.camera.near = 1;
//     dirLight.shadow.camera.far = 10;
//     dirLight.shadow.camera.right = 15;
//     dirLight.shadow.camera.left = - 15;
//     dirLight.shadow.camera.top	= 15;
//     dirLight.shadow.camera.bottom = - 15;
//     dirLight.shadow.mapSize.width = 1024;
//     dirLight.shadow.mapSize.height = 1024;
//     scene.add( dirLight );

//     scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

//     // Geometry
//     let geometry = new THREE.TorusKnotGeometry( 25, 8, 75, 20 );
//     let material = new THREE.MeshPhongMaterial( {
//         color: 0xff0000,
//         shininess: 150,
//         specular: 0x222222
//     } );

//     torusKnot = new THREE.Mesh( geometry, material );
//     torusKnot.scale.multiplyScalar( 1 / 18 );
//     torusKnot.position.y = 3;
//     torusKnot.castShadow = true;
//     torusKnot.receiveShadow = true;
//     scene.add( torusKnot );

//     geometry = new THREE.BoxGeometry( 3, 3, 3 );
//     cube = new THREE.Mesh( geometry, material );
//     cube.position.set( 8, 3, 8 );
//     cube.castShadow = true;
//     cube.receiveShadow = true;
//     scene.add( cube );

//     geometry = new THREE.BoxGeometry( 10, 0.15, 10 );
//     material = new THREE.MeshPhongMaterial( {
//         color: 0xa0adaf,
//         shininess: 150,
//         specular: 0x111111
//     } );

//     const ground = new THREE.Mesh( geometry, material );
//     ground.scale.multiplyScalar( 3 );
//     ground.castShadow = false;
//     ground.receiveShadow = true;
//     scene.add( ground );

// }

// WEBGL 호환성 확인
if (WebGL.isWebGLAvailable()) {

    // 오브젝트를 놓을 공간 
    const scene = new THREE.Scene();

    // 정보를 화면에 그려줄 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true, // 투명한 배경을 가진 캔버스 사용 가능
        antialias: true // 렌더링 된 이미지 품질을 향상시키는 안티앨리어싱 활성화
    });

    // 카메라
    const WIDTH = 800
    const HEIGHT = 800

    const FOV = 90 // 카메라 시야각, 커질 수록 시야각 넓어짐 단위 degree
    const ASPECT = WIDTH / HEIGHT // 시야의 가로세로비 -> 컨테이너 가로세로비와 같은 크기로 해주는 게 좋음
    const NEAR = 0.1 // 렌더링 할 물체 거리의 하한값, 카메라로부터 거리가 이 값보다 작은 물체는 화면에 그리지 않음 0보다 크고 FAR보다 작은 값을 가질 수 있다.
    const FAR = 10000 // 렌더링 할 물체 거리의 상한값, 너무 멀리 있는 물체를 그리지 않는 것, 카메라로부터 거리가 이 값보다 큰 물체는 화면에 그리지 않음

    const camera = new THREE.PerspectiveCamera(
        FOV,
        ASPECT,
        NEAR,
        FAR
    )

    camera.position.z = 6;
    renderer.setSize(WIDTH, HEIGHT)
    document.body.appendChild( renderer.domElement )


    // 탁구대 피사체
    const geometry = new THREE.BoxGeometry( 5, 3, 0.2, 1, 1 ); // 각각 width, height, depth, widthSegments, heightSegments
    // const material = new THREE.MeshBasicMaterial( { color: 0x00509f } );
    const material = new THREE.MeshLambertMaterial( { color: 0xffffff });
    const table = new THREE.Mesh( geometry, material );
    scene.add( table );

    // 광원
    const pointLight = new THREE.AmbientLight( 0x404040, 50);

    pointLight.position.x = 100;
    pointLight.position.y = 100;
    pointLight.position.z = 30;

    scene.add(pointLight)


    function animate() {
	    requestAnimationFrame( animate );

	    table.rotation.x += 0.01;
	    table.rotation.z += 0.01;

	    renderer.render( scene, camera );
    }

animate();

} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
