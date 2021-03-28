import React, { useMemo } from 'react'
import { withPrefix } from 'gatsby'
import { useGLTF } from '@react-three/drei'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Model({ url }) {
	const { scene } = useGLTF(withPrefix(url))
	useMemo(() => {
		scene.traverse((obj) => {
			if (obj.isMesh) {
				obj.castShadow = true
				obj.receiveShadow = true
			}
		})
	})
	return <primitive object={scene} />
}
