import React, { useState, useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Model({ url }) {
	const [gltf, set] = useState()
	useMemo(() => new GLTFLoader().load(url, set), [url])

	return gltf ? <primitive object={gltf.scene} /> : null
}
