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
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

//CANVAS
const canvas = document.querySelector(".webgl")

//SCENE
const scene = new THREE.Scene()
//scene.background = new THREE.Color("black")

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
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height) //pulls from SIZES at the top of the script
renderer.shadowMap.enabled = true

//CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//MESHES

const caveGeo = new THREE.PlaneGeometry(15.5, 7.5)
const caveMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
});

const cave = new THREE.Mesh(caveGeo, caveMat)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave);

//OBJECTS

const sphere1Geo = new THREE.SphereGeometry(0.45) 
const sphere1Mat = new THREE.MeshNormalMaterial() 

const sphere1 = new THREE.Mesh(sphere1Geo, sphere1Mat)
sphere1.position.set(6, 2.8, 1.6)
sphere1.castShadow = true
scene.add(sphere1);

const sphere2Geo = new THREE.SphereGeometry(0.45) 
const sphere2Mat = new THREE.MeshNormalMaterial() 

const sphere2 = new THREE.Mesh(sphere2Geo, sphere2Mat)
sphere2.position.set(6, 2.8, -1.6)
sphere2.castShadow = true
scene.add(sphere2)

/*
const torusGeo = new THREE.TorusGeometry(0.8, 0.4, 4, 100); 
const torusMat = new THREE.MeshNormalMaterial();

const torus = new THREE.Mesh(torusGeo, torusMat)
torus.position.set(6, 0.3, 0)
torus.rotation.y = Math.PI * 0.5
torus.castShadow = true
scene.add(torus)
*/

//SMILE

class SmileCurve extends THREE.Curve {
    constructor(scale = 1) {
        super()
        this.scale = scale
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) 
    {
        const tx = (t - 0.5) * 3
        const ty = -Math.pow(tx, 2) + 1
        const tz = 0

        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
    }
}

const smilePath = new SmileCurve(0.5); // Adjust scale as needed
const smileGeo = new THREE.TubeGeometry(smilePath, 50, 0.3, 30, false)
const smileMat = new THREE.MeshNormalMaterial()
const smile = new THREE.Mesh(smileGeo, smileMat)

smile.position.set(9, 0.8, 0) 
smile.castShadow = true
smile.rotation.y = Math.PI * 0.5
smile.rotation.z = Math.PI * 1
scene.add(smile);

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
directionalLight.position.set(20, 2, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1048
directionalLight.shadow.mapSize.height = 1048

//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
//scene.add(directionalLightHelper)

//Dom Interactions

const domObject = {
    part: 0,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

//part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}

//part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

//first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

//second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

//third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
    domObject.firstChange = false
}

//fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

//UI

/* const ui = new dat.GUI()

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
*/

//ANIMATION LOOP

const clock = new THREE.Clock()
const animation = () =>
{
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    console.log(domObject.part)
    //console.log(camera.position)

    //part-one
        if(domObject.part === 1)
        {
            camera.position.set(8, 0, 0)
            camera.lookAt(0, 0, 0)
        }

    //part-two
    if(domObject.part === 2)
        {
            camera.position.set(20, 1, 0)
            camera.lookAt(0, 0, 0)
        }

    //first-change
    if(domObject.firstChange)
        {
            smile.rotation.x = elapsedTime
        }
    
    //second-change
    if(domObject.secondChange)
        {
            sphere1.scale.x = 1.5;
            sphere2.scale.x = 1.5;
            sphere1.scale.y = 1.5;
            sphere2.scale.y = 1.5;
            sphere1.scale.z = 1.5;
            sphere2.scale.z = 1.5;
        }
    
    //third-change
    if(domObject.thirdChange)
        {
            sphere1.position.y = Math.sin(elapsedTime)
            sphere2.position.y = Math.cos(elapsedTime)
            //smile.rotaion.y = elapsedTime
        }
    
    //fourth-change
    if(domObject.fourthChange)
        {
            sphere1.visible = false;
            sphere2.visible = false;
            smile.visible = false;
        }

    //animate objects
    //sphere1.rotation.y = elapsedTime

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