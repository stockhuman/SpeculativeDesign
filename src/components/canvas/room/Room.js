import React, { useState, useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Frame from './Frame'
import Portal from './Link'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Room({ url, data = {} }) {

	let availableImages = data.images ? data.images.length : 0
	const [objects, setObjects] = useState([])
	const [gltf, setScene] = useState()

	useMemo(() => new GLTFLoader().load(url, gltf => {
		console.log(gltf.scene)

		gltf.scene.traverse(obj => {
			// literal picture frames
			if (obj.name.startsWith('Painting')) {
				if (availableImages > 0) {
					objects.push(<Frame key={obj.uuid} url={data.images[availableImages]} obj={obj} />)
					availableImages -= 1;
				}
				// interactable surfaces
			} else if (obj.name.startsWith('Link')) {
				objects.push(<Portal key={obj.uuid} link={data[obj.name] || '/'} obj={obj} />)
			} else {
				objects.push(<primitive key={obj.uuid} object={obj} />)
			}
			setObjects(objects)
		})
		setScene(gltf.scene)
	}), [url])

	return gltf ? <scene>{objects}</scene> : null
}
