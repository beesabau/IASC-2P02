//console.log("Hello world!")
import * as THREE from 'three'
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(THREE)
console.log(dat)
console.log(OrbitControls)

//console.log(THREE)

//SETUP

//SIZES
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}



//CANVAS
const canvas = document.querySelector(".webgl")

//SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color("black")

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    sizes.aspectRatio, //aspect ratio, pulls from SIZES at the top of the script
    0.1, //how near can the camera see
    100 //how far can the camera see
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height) //pulls from SIZES at the top of the script
renderer.shadowMap.enabled = true

//CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//MESHES

const caveGeo = new THREE.PlaneGeometry(15.5, 7.5);
const caveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
});

const cave = new THREE.Mesh(caveGeo, caveMat);
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave);

//OBJECTS

const bodyGeo = new THREE.CylinderGeometry(1, 1, 3, 32); 
const bodyMat = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const body = new THREE.Mesh(bodyGeo, bodyMat); 

body.castShadow = true
body.position.set (6, 0.5, 0)
body.rotation.x = Math.PI * 0.5
scene.add(body);

const headGeo = new THREE.SphereGeometry(1, 32, 16); 
const headMat = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const head = new THREE.Mesh(headGeo, headMat); 

head.castShadow = true
head.position.set (4, 1, 2)
scene.add(head);

const leg1Geo = new THREE.CylinderGeometry(0.3, 0.3, 2, 32); 
const leg1Mat = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const leg1 = new THREE.Mesh(leg1Geo, leg1Mat); 

leg1.castShadow = true
leg1.position.set (7, -0.6, -1)
scene.add(leg1);

const leg2Geo = new THREE.CylinderGeometry(0.3, 0.3, 2, 32); 
const leg2Mat = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const leg2 = new THREE.Mesh(leg2Geo, leg2Mat); 

leg2.castShadow = true
leg2.position.set (8, -0.6, 1)
scene.add(leg2);

const earGeo = new THREE.ConeGeometry(0.3, 0.6, 32); 
const earMat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const ear = new THREE.Mesh(earGeo, earMat); 

ear.castShadow = true
ear.position.set (4, 2.2, 2)
scene.add(ear);

//LIGHTS

/*
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

const directionalLight = new THREE.DirectionalLight( 
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1048
directionalLight.shadow.mapSize.height = 1048

//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(directionalLightHelper)

//UI

const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')
lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')
lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')


//ANIMATION LOOP

const clock = new THREE.Clock()
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //animate objects
    //sphere1.rotation.y = elapsedTime
    directionalLight.position.y = Math.sin(elapsedTime)

    //Update Directional Light Helper
    directionalLightHelper.update()

    //update OrbitControls
    controls.update()

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}
animation()

/* const myFirstFunction = () =>
{
    console.log("Function")
}

myFirstFunction() */