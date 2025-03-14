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

//RESIZING

window.addEventListener('resize', () =>
{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
)

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
camera.position.set(10, 0, 20)

//RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height) //pulls from SIZES at the top of the script

//CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//LIGHTS
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

//MESHES

//cube geometry

const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    //create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    //randomize cube rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI

    //add cube to scene
    scene.add(cube)
}

//UI

const ui = new dat.GUI()

let preset = {}

const uiObj = {
    sourceText: "The quick brown fox jumped over the lazy dog.",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'fox',
    color1: '#aa00ff',
    term2: 'dog',
    color2: '#00ffaa',
    term3: '',
    color3: '',
    saveTerms() {
        saveTerms()
    }
}

//UI functions
const saveSourceText = () =>
    {
        //UI
        preset = ui.save()
        textFolder.hide()
        termsFolder.show()
        visualizeFolder.show()

        console.log(uiObj.sourceText)
    
        //text analysis
        tokenizeSourceText(uiObj.sourceText)
    }

    const saveTerms = () =>
        {
            //UI
            preset = ui.save
            visualizeFolder.hide()
            console.log("saveTerms function")

            //text analysis
            findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
            findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
            findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)
        }        

//text folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

//terms and visualize folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj, 'color1')
    .name("Term 1 Colour")

termsFolder
    .add(uiObj, 'term2')
    .name("Term 2")

termsFolder
    .addColor(uiObj, 'color2')
    .name("Term 2 Colour")

termsFolder
    .add(uiObj, 'term3')
    .name("Term 3")

termsFolder
    .addColor(uiObj, 'color3')
    .name("Term 3 Colour")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

//terms and visualize folders hidden by default
termsFolder.hide()
visualizeFolder.hide()

//TEXT ANALYSIS

//SourceText

//variables
let parsedText, tokenizedText

//parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    //delete periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    //tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

//find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    console.log("Your search term is: " + term)

    //for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        //if tokenizedText[i] matches our searchTerm, draw a cube
        if(tokenizedText[i] === term){

            //convert i into height, with a value between 0 and 20, so that visualization doesn't extend infinitely
            const height = (100 / tokenizedText.length) * i * 0.2

            //call drawCube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            {
                drawCube(height, color)
            }
        }
    }
}

/*findSearchTermInTokenizedText("porch", "black")
findSearchTermInTokenizedText("family", "red")
findSearchTermInTokenizedText("cat", "orange")*/

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