import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'
import gsap from 'gsap'

// Show
document.body.style.display = 'block'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(w, h)

// Sphere
const geometry = new THREE.SphereGeometry(1, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff83, roughness: 0.7 })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Light
const light = new THREE.PointLight(0xffffff, 1.2, 100)
light.position.set(5, 10, 10)
light.intensity = 1.25
scene.add(light)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3

// Mouse animation colors
let mouseDown = false

window.addEventListener('pointerdown', () => (mouseDown = true))
window.addEventListener('pointerup', () => (mouseDown = false))
window.addEventListener('pointermove', (e: PointerEvent) => {
  if (mouseDown) {
    const rgb = [Math.round((e.pageX / w) * 255), Math.round((e.pageY / h) * 255), Math.round(Math.random() * 255)]
    gsap.to(sphere.material.color, new THREE.Color(`rgb(${rgb.join(',')})`))
  }
})

// View
camera.position.z = 10

renderer.setPixelRatio(2)
renderer.render(scene, camera)

// GSAP
const tl = gsap.timeline({ defaults: { duration: 1, ease: 'ease-in-out' } })
// tl.fromTo('body', { opacity: 0 }, { opacity: 1 }, 0)
tl.fromTo(sphere.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
tl.fromTo('nav', { y: '-100%' }, { y: 0 })
tl.fromTo('h1', { opacity: 0 }, { opacity: 1 })

// Resize
window.addEventListener('resize', () => {
  ;[w, h] = useWindowDimensions()
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
})

// Loop
function loop() {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
