import React, { useState, useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Scene ({ url }) {

	const loader = new GLTFLoader()
	const [gltf, set] = useState()

	useMemo(() => {
		loader.load(url, set)
	}, [url])

	if (gltf) {
		if (gltf.scene.children.length < 1)
			return null
		// if the scene contains only one object
		else if (gltf.scene.children.length === 1) {
			return <primitive object={gltf.scene.children[0]} />
		}
		// if it contains many, iterate over all of them (no depth)
		else if (gltf.scene.children.length > 1) {
			let scene = []
			gltf.scene.children.forEach(element => {
				scene.push(<primitive key={element.uuid} object={element}></primitive>)
			})

			return <>{scene}</>
		}
	} else return null
}
