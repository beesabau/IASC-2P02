//console.log("Hello world!")
import * as THREE from 'three'

//console.log(THREE)

//CANVAS
const canvas = document.querySelector(".webgl")

//SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color("pink")

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
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
renderer.setSize(window.innerWidth, window.innerHeight)

//MESHES

//testSphere

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

//testDonut

const donutGeometry = new THREE.TorusGeometry(0.85, 0.3, 30, 100); 
const donutMaterial = new THREE.MeshNormalMaterial()
const testDonut = new THREE.Mesh(donutGeometry, donutMaterial)

scene.add(testSphere)
testSphere.position.set(0, 0, 0)

scene.add(testDonut)
testDonut.position.set(0, 0, 2)

//ANIMATION LOOP

const clock = new THREE.Clock()
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //animate testSphere
     console.log(elapsedTime)
     testSphere.position.z = Math.sin(elapsedTime)
     testSphere.position.y = Math.cos(elapsedTime)
    //animate testDonut
     testDonut.position.x = Math.sin(elapsedTime)
     testDonut.position.y = Math.cos(elapsedTime)
     testDonut.rotation.y = elapsedTime
 

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