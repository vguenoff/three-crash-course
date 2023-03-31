import * as THREE from 'three'
import './style.css'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Clock
const clock = new THREE.Clock()

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(w, h)

// Sphere
const geometry = new THREE.SphereGeometry(1, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: 0xf6f1d5 })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Light
const light = new THREE.PointLight(0xffffff, 1.2, 100)
// light.position.set(10, 10, 10)
scene.add(light)

// View
camera.position.z = 10

renderer.render(scene, camera)

// Resize
window.addEventListener('resize', () => {
  ;[w, h] = useWindowDimensions()
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
})

// Loop
function loop() {
  animate(clock.getElapsedTime())
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

function animate(elapsedTime: number) {
  sphere.rotation.y = elapsedTime
  light.position.set(
    Math.sin(elapsedTime) * Math.PI * 2,
    Math.sin(elapsedTime) * Math.PI * 2,
    Math.cos(elapsedTime) * Math.PI * 2
  )
  sphere.position.y = Math.sin(elapsedTime)
  sphere.position.x = Math.cos(elapsedTime)
}

loop()
