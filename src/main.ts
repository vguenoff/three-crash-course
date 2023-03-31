import * as THREE from 'three'
import './style.css'

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Sphere
const geometry = new THREE.SphereGeometry(1, 64, 64, 0, 1.2)
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// View
camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
