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
scene.background = new THREE.Color("pink")

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    sizes.aspectRatio, //aspect ratio, pulls from SIZES at the top of the script
    0.1, //how near can the camera see
    100 //how far can the camera see
)
scene.add(camera)
camera.position.set(0, 0, 5)
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

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0, 0, 0)

//UI

const ui = new dat.GUI()

//ANIMATION LOOP

const clock = new THREE.Clock()
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

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