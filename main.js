import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGLAvailable()) {
    // // 오브젝트를 놓을 공간 
    // const scene = new THREE.Scene();

    // // 정보를 화면에 그려줄 렌더러
    // const renderer = new THREE.WebGLRenderer({
    //     // alpha: true, // 투명한 배경을 가진 캔버스 사용 가능
    //     // antialias: true // 렌더링 된 이미지 품질을 향상시키는 안티앨리어싱 활성화
    // });

    // // 피사체
    // const geometry = new THREE.BoxGeometry( 15, 20, 1, 8, 10 ); // 각각 width, height, depth, widthSegments, heightSegments
    // const materail = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    // const table = new THREE.Mesh( geometry, materail );
    // scene.add( table );

    // // 카메라
    // const WIDTH = 400
    // const HEIGHT = 400

    // const FIELD_OF_VIEW = 20
    // const ASPECT = WIDTH / HEIGHT
    // const NEAR = 0.1
    // const FAR = 10000
    
    // const camera = new THREE.PerspectiveCamera(
    //     FIELD_OF_VIEW,
    //     ASPECT,
    //     NEAR,
    //     FAR
    // )

    // renderer.setSize(WIDTH, HEIGHT)
    // document.body.appendChild( renderer.domElement )
    // renderer.render(scene, camera)
    // // 빛

    // 오브젝트를 놓을 공간 
    const scene = new THREE.Scene();

    // 정보를 화면에 그려줄 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true, // 투명한 배경을 가진 캔버스 사용 가능
        antialias: true // 렌더링 된 이미지 품질을 향상시키는 안티앨리어싱 활성화
    });

    const WIDTH = 800
    const HEIGHT = 800

    const FIELD_OF_VIEW = 75
    const ASPECT = WIDTH / HEIGHT
    const NEAR = 0.1
    const FAR = 10000

    const camera = new THREE.PerspectiveCamera(
        FIELD_OF_VIEW,
        ASPECT,
        NEAR,
        FAR
    )

    renderer.setSize(WIDTH, HEIGHT)
    document.body.appendChild( renderer.domElement )
    renderer.render(scene, camera)


    // 탁구대 피사체
    const geometry = new THREE.BoxGeometry( 5, 3, 0.2, 1, 1 ); // 각각 width, height, depth, widthSegments, heightSegments
    const material = new THREE.MeshBasicMaterial( { color: 0x00509f } );
    const table = new THREE.Mesh( geometry, material );
    scene.add( table );

    camera.position.z = 5;

    function animate() {
	    requestAnimationFrame( animate );

	    // table.rotation.x += 0.01;
	    // table.rotation.z += 0.01;

	    renderer.render( scene, camera );
    }

animate();

} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
