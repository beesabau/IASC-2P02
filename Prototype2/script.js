//console.log("Hello world!")
import * as THREE from 'three'
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

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
scene.background = new THREE.Color("pink")

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    sizes.aspectRatio, //aspect ratio, pulls from SIZES at the top of the script
    0.1, //how near can the camera see
    100 //how far can the camera see
)
scene.add(camera)
camera.position.set(-2, 3, 5) //if at 0, 0, 0, camera and shape are in the same place and thus the shape is not visible - orbit controls also don't work

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height) //pulls from SIZES at the top of the script

//CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//MESHES

//testSphere

const torusKnoteometry = new THREE.TorusKnotGeometry(1, 0.4, 12, 12); 
const torusKnotMaterial = new THREE.MeshNormalMaterial(); 
const torusKnot = new THREE.Mesh(torusKnoteometry, torusKnotMaterial);

scene.add(torusKnot)
torusKnot.position.set(0, 0, 0)

//PLANE

const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshNormalMaterial({
    color: new THREE.Color('#ffab30'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 1.5 //Math.PI is 180 degrees
scene.add(plane)

//UI

const ui = new dat.GUI()

//UI Object
const uiObject = {
    speed: 3,
    distance: 2,
    play: false,
    rotation: 0
}

//torusKnot and plane UI

const torusKnotFolder = ui.addFolder('TorusKnot')
    torusKnotFolder
        .add(torusKnot.position, 'x')
        .min(-5)
        .max(5)
        .step(0.1)
        .name('Position')
    torusKnotFolder
        .add(uiObject, 'speed')
        .min(0.1)
        .max(10)
        .step(0.1)
        .name('Speed')
    torusKnotFolder
        .add(uiObject, 'distance')
        .min(0.1)
        .max(10)
        .step(0.1)
        .name('Distance')
    torusKnotFolder
        .add(uiObject, 'play')
        .name("Animate")
    torusKnotFolder
        .add(uiObject, 'rotation')
        .min(0.1)
        .max(10)
        .step(0.1)
        .name('Rotation')

const planeFolder = ui.addFolder('Plane')
    planeFolder
        .add(planeMaterial, 'wireframe')
        .name("Toggle Wireframe")


//ANIMATION LOOP

const clock = new THREE.Clock()
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //animate torusKnot
    
    if(uiObject.play)
    {
    torusKnot.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    }

    torusKnot.rotation.y = elapsedTime * uiObject.rotation

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