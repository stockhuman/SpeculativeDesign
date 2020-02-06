import React from 'react'
import { withPrefix } from 'gatsby'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from 'react-three-fiber'
/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Model({ url }) {
	const gltf = useLoader(GLTFLoader, withPrefix(url))
	return <primitive object={gltf.scene} dispose={null}/>
}
