import React, { useState, useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model({ url, material }) {
	const [scene, set] = useState()

	useMemo(() =>
		new GLTFLoader().load(url, gltf => {
			gltf.scene.traverse(obj => {
				if (obj.isMesh && material) {
					obj.material.dispose()
					obj.material = material
					console.log(obj.material)
				}
			})
			set(gltf.scene)
		}), [url]
	)

	return scene ? <primitive object={scene} /> : null
}
