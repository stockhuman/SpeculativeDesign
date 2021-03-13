import React, { useState } from 'react'
import { navigate, withPrefix } from 'gatsby'
import { useLoader } from 'react-three-fiber'
import { Text } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three-stdlib'

/**
 * Creates a navigable link given a path and 3D object data
 * @param {string} link the page to navigate to
 * @param {object} obj THREE mesh object (or parameters)
 */
export default function LinkedObject({ link = "/", obj = {}}) {
	const [visible, setVisibility] = useState(false);
	// set initial material to be invisible
	if (obj && obj.material) obj.material.opacity = 0;
	const geo = obj.geometry

	return (
		<group>
			<mesh
				onPointerEnter={() => { setVisibility(true); document.body.style.cursor = 'pointer' }}
				onPointerLeave={() => { setVisibility(false); document.body.style.cursor = '' }}
				onClick={() => { document.body.style.cursor = ''; navigate(link)}}
				position={obj.position || [0,0,0]}
				geometry={geo}
				scale={obj.scale || 1}>
				<meshBasicMaterial visible={visible} wireframe />
			</mesh>
			{visible ?
				<Text color="white" position={obj.position}>Navigate to {link}</Text>
			: null}
		</group>
	)
}

/**
 * Creates a navigable link given a path and a GLTF file
 * @param {string} link the page to navigate to
 * @param {object} url The path to a .glb, .gltf file to load
 */
export function LinkedModel ({ link = '/', url }) {
	const gltf = useLoader(GLTFLoader, withPrefix(url))
	const [visible, setVisibility] = useState(false)

	const scene = gltf.scene.clone(true)
	let pos = [0,0,0]
	scene.traverse(obj => {
		obj.material = new MeshBasicMaterial({wireframe: true, visible})
		pos = obj.position
	})

	return (
		<group
			onPointerEnter={() => { setVisibility(true); document.body.style.cursor = 'pointer' }}
			onPointerLeave={() => { setVisibility(false); document.body.style.cursor = '' }}
			onClick={() => { document.body.style.cursor = ''; navigate(link) }}
		>
			<primitive object={scene}/>

			{visible ?
				<Text color="white" position={pos}>Navigate to {link}</Text>
				: null}
		</group>
	)

}
