import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader, TextGeometry} from "three/addons";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const text1 = 'Thibaut'
        const text2 = 'Lefrancois'

        const textGeometry1 = new TextGeometry(
            text1,
            {
                font: font,
                size: 0.4,
                depth: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry1.center()

        const textGeometry2 = new TextGeometry(
            text2,
            {
                font: font,
                size: 0.4,
                depth: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry2.center()

        const material = new THREE.MeshNormalMaterial()

        const textMesh1 = new THREE.Mesh(textGeometry1, material)
        const textMesh2 = new THREE.Mesh(textGeometry2, material)

        // Adjust the y position of the second text to simulate a new line
        textMesh1.position.y = 0.25
        textMesh2.position.y = -0.25

        scene.add(textMesh1)
        scene.add(textMesh2)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for(let i=0; i < 200; i++){
            const donutMesh = new THREE.Mesh(donutGeometry, material)

            donutMesh.position.x = (Math.random() - 0.5) * 10
            donutMesh.position.y = (Math.random() - 0.5) * 10
            donutMesh.position.z = (Math.random() - 0.5) * 10

            donutMesh.rotation.x = Math.random() * Math.PI
            donutMesh.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donutMesh.scale.set(scale, scale, scale)

            scene.add(donutMesh)
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()