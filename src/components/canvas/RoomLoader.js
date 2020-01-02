import React, { useState, useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import { navigate } from 'gatsby'

/**
 * Drastically simplified Model importer no longer takes custom material parameters
 * @param {string} url The path to a .glb, .gltf file to load
 */
export default function Model({ url }) {
	const gltf = useLoader(GLTFLoader, url)
	let objects = []
	console.log(gltf.scene)
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

/**
 * 'Frames' an image texture as a painting
 * @param {string} url path to an image texture, relative /static
 */
export function Frame({ url, obj }) {
	const texture = useMemo(() => new TextureLoader().load(url), [url])
	console.log(obj)
	return (
		<mesh position={obj.position} rotation={obj.rotation} >
			<planeBufferGeometry attach="geometry" args={[5, 5]} />
			<meshLambertMaterial attach="material" transparent>
				<primitive attach="map" object={texture} />
			</meshLambertMaterial>
		</mesh>
	)
}

export function Portal({ link, obj }) {
	let visible = false
	return (
		<mesh
			onPointerEnter={e => visible = true}
			onPointerLeave={e => visible = false}
			onClick={() => navigate(link)}
			position={obj.position}
			geometry={obj.geometry}
			scale={obj.scale}>
			<meshNormalMaterial attach="material" visible={visible}/>
		</mesh>
	)
}
