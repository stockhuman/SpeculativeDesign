import React, { useState, useRef } from 'react'
import { navigate, withPrefix } from 'gatsby'
import { Text, useGLTF } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial'
/**
 * Creates a navigable link given a path and a GLTF file
 * @param {string} link the page to navigate to
 * @param {object} url The path to a .glb, .gltf file to load
 */
export function LinkedModel({ link = '/', url, ...props }) {
	const gltf = useGLTF(withPrefix(url))
	const [hovered, setVisibility] = useState(false)

	const scene = gltf.scene.clone(true)
	let pos = [0, 0, 0]
	scene.traverse((obj) => {
		let color = obj.material ? obj.material.color : 'yellow'
		obj.material = new MeshBasicMaterial({ wireframe: true, visible: hovered, color })
		pos = obj.position
	})

	const group = useRef()
	useFrame(() => {
		group.current && hovered ? (group.current.rotation.y += 0.05) : null
	})

	return (
		<group
			{...props}
			ref={group}
			onPointerEnter={() => {
				setVisibility(true)
				document.body.style.cursor = 'pointer'
			}}
			onPointerLeave={() => {
				setVisibility(false)
				document.body.style.cursor = ''
			}}
			onClick={() => {
				document.body.style.cursor = ''
				navigate(link)
			}}
		>
			<primitive object={gltf.scene} />
			<primitive object={scene} />

			{hovered ? (
				<Text color="white" position={pos}>
					Navigate to {link}
				</Text>
			) : null}
		</group>
	)
}

export function Door(props) {
	const { nodes } = useGLTF(withPrefix('/models/door.glb'))
	const [hovered, setVisibility] = useState(false)
	return (
		<group
			{...props}
			onPointerEnter={() => {
				setVisibility(true)
				document.body.style.cursor = 'pointer'
			}}
			onPointerLeave={() => {
				setVisibility(false)
				document.body.style.cursor = ''
			}}
			onClick={() => {
				document.body.style.cursor = ''
				navigate(props.link)
			}}
		>
			<mesh geometry={nodes.DoorFrame.geometry}>
				<meshStandardMaterial color="#302122" roughness={0.7} />
			</mesh>
			<mesh geometry={nodes.Door.geometry}>
				{hovered ? (
					<meshStandardMaterial color="#d2e63e" />
				) : (
					<meshNormalMaterial />
				)}
			</mesh>
			<mesh geometry={nodes.DoorFace.geometry} />
			{hovered ? <Text color="white">Navigate to {props.link}</Text> : null}
		</group>
	)
}

useGLTF.preload(withPrefix('/door.glb'))
