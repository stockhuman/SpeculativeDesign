import React, { useMemo } from 'react'
import { withPrefix } from 'gatsby'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from 'react-three-fiber'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Model({ url }) {
	const {scene} = useLoader(GLTFLoader, withPrefix(url))
	useMemo(()=> {
		scene.traverse(obj => {
			if (obj.isMesh) {
				obj.castShadow = true
				obj.receiveShadow = true
			}
		})
	})
	return <primitive object={scene} />
}
