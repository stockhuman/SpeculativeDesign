import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Frame from './Frame'
import Portal from './Link'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Room({ url, data = {} }) {
	const gltf = useLoader(GLTFLoader, url)
	let objects = []
	gltf.scene.traverse(obj => {
		// literal picture frames
		if (obj.name.startsWith('Painting')) {
			objects.push(<Frame key={obj.uuid} url="textures/Bronze.png" obj={obj}/>)
			// interactable surfaces
		} else if (obj.name.startsWith('Link')) {
			objects.push(<Portal key={obj.uuid}link={'/'} obj={obj} />)
		} else {
			objects.push(<primitive key={obj.uuid} object={obj}/>)
		}
	})

	return <scene>{objects}</scene>
}
