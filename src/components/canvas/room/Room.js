import React from 'react'
import { withPrefix } from 'gatsby'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from 'react-three-fiber'

import Frame from './Frame'
import Portal from './Link'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {object} data information about links to other pages, page data and images
 */
export default ({ url, data = {} }) => {
	let availableImages = data.images ? data.images.length - 1 : 0
	let objects = []

	const gltf = useLoader(GLTFLoader, withPrefix(url))
	const scene = gltf.scene.clone(true)

	scene.traverse(obj => {

		// picture frames
		if (obj.name.startsWith('Frame')) {
			if (availableImages > 0) {
				objects.push(<Frame key={obj.uuid} url={data.images[availableImages]} obj={obj} />)
				availableImages -= 1;
			}
		}

		// interactable surfaces
		// an object named 'LinkA' will look for 'LinkA' in the data object
		// and use the value as its url
		else if (obj.name.startsWith('Link')) {
			objects.push(<Portal key={obj.uuid} link={data[obj.name] || '/'} obj={obj} />)
		} else {
			// All other meshes
			obj.receiveShadow = true
			obj.castShadow = true
			objects.push(<primitive key={obj.uuid} object={obj} />)
		}

	})

	return <scene>{objects}</scene>
}

// see https://codesandbox.io/embed/react-three-fiber-gltf-loader-animations-c671i
// to integrate GLTF animations directly from Blender
