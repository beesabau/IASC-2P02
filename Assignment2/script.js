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

const drawCube = (height, params) =>
{
    //create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color),
        transparent: true, 
        opacity: 1.0
    })

    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //scale cube
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    //position cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height - 10

    //randomize cube rotation
    if(params.randomized)
    {
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
    }

    //add cube to group
    params.group.add(cube)
}

const drawSphere = (height, params) => 
    {
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32)
    const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color),
        transparent: true,
        opacity: 1.0,
    })

    //create sphere
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)

    //scale sphere
    sphere.scale.x = params.scale
    sphere.scale.y = params.scale
    sphere.scale.z = params.scale

    //position sphere
    sphere.position.x = (Math.random() - 0.5) * params.diameter
    sphere.position.z = (Math.random() - 0.5) * params.diameter
    sphere.position.y = height - 10

    params.group.add(sphere)
    }

    const drawCone = (height, params) => 
        {
        const coneGeo = new THREE.ConeGeometry(0.5, 0.8, 3)
        const coneMat = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color(params.color), 
            transparent: true, 
            opacity: 1.0 
        })

    //create cone
    const cone = new THREE.Mesh(coneGeo, coneMat)

    //scale cone
    cone.scale.x = params.scale
    cone.scale.y = params.scale
    cone.scale.z = params.scale

    //position cone
    cone.position.x = (Math.random() - 0.5) * params.diameter
    cone.position.z = (Math.random() - 0.5) * params.diameter
    cone.position.y = height - 10

    //randomize cone rotation
    if(params.randomized)
        {
            cone.rotation.x = Math.random() * 2 * Math.PI
            cone.rotation.z = Math.random() * 2 * Math.PI
            cone.rotation.y = Math.random() * 2 * Math.PI
        }
    
        params.group.add(cone);
    }

//UI

const ui = new dat.GUI()

let preset = {}

//groups

const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

//ui objects

const uiObj = {
    sourceText: "",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'achilles',
        color: '#f8da07',
        group: group1,
        diameter: 6,
        scale: 1,
        nCubes: 100,
        randomized: true,
    },
    term2: {
        term: 'patroclus',
        color: '#fb5404',
        group: group2,
        diameter: 10,
        scale: 1,
        nCubes: 100,
        randomized: true,
    },
    term3: {
        term: 'hector',
        color: '#0f9de1',
        group: group3,
        diameter: 6.5,
        scale: 1,
        nCubes: 100,
        randomized: false,
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
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
            cameraFolder.show()
            console.log("saveTerms function")

            //text analysis
            findSearchTermInTokenizedText(uiObj.term1)
            findSearchTermInTokenizedText(uiObj.term2)
            findSearchTermInTokenizedText(uiObj.term3)
        }        

//text folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

//terms and visualize and camera folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Colour")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Colour")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Colour")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")

//terms and visualize folders hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

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
const findSearchTermInTokenizedText = (params) =>
{
    console.log("Your search term is: " + params.term)

    //for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        //if tokenizedText[i] matches our searchTerm, draw a cube
        if(tokenizedText[i] === params.term){

            //convert i into height, with a value between 0 and 20, so that visualization doesn't extend infinitely
            const height = (100 / tokenizedText.length) * i * 0.2

            //sets term 3's randomized status to true midway through the visualization
            if (params.term === "hector" && height > 10)
            {
                params.randomized = true
            }

            //call drawCube function 100 times using converted height value
            for(let a = 0; a < params.nCubes; a++)
            {
                if (params.term === "achilles") 
                {
                    drawCone(height, params);
                } 
                else if (params.term === "patroclus") 
                {
                    drawSphere(height, params);
                } 
                else if (params.term === "hector") 
                {
                    drawCube(height, params)
                }
                //drawCube(height, params)
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

    //colour gradient term 1
    group1.children.forEach(cone => {
        if (cone.material) 
        {
            const height = (cone.position.y + 10) / 20
            
            const newColor = new THREE.Color().lerpColors //I love you lerp
            (
                new THREE.Color(0xf8da07),
                new THREE.Color(0xff0000),
                height
            )

            cone.material.color.set(newColor);
        }
    })

    //fade term 2
    const fade = (Math.sin(elapsedTime))

    group2.children.forEach(cube => 
    {
    if (cube.material) 
    {
        cube.material.opacity = fade;
    }
    })

    //rotate camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0, 2, 0)
    }

    //renderer
    renderer.render(scene, camera)

    //request next frame
    window.requestAnimationFrame(animation)
}
animation()