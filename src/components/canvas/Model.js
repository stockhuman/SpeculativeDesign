import React, { useState, useMemo, Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { navigate } from 'gatsby'

export default function Model({ url, material }) {
	const [scene, set] = useState()

	useMemo(() =>
		new GLTFLoader().load(url, gltf => {
			gltf.scene.traverse(obj => {
				if (obj.isMesh) {
					obj.castShadow = true
					obj.receiveShadow = true
					if (material) {
						obj.material.dispose()
						obj.material = material
					} else {
						obj.material.color.convertSRGBToLinear()
					}
				}
			})
			set(gltf.scene)
		}), [url]
	)

	return scene ? <primitive object={scene} /> : null
}

// loads corresponding interactive elements within a scene.
// could be combined into a monolithic function
// Currently creates invisible meshes.
export function SceneLinks({ url, linkto, linkfrom, linkalt }) {
	const [scene, set] = useState()
	const [dataTo, setTo] = useState({})
	const [dataFrom, setFrom] = useState({})
	const [dataAlt, setAlt] = useState({})

	useMemo(() =>
		new GLTFLoader().load(url, gltf => {
			gltf.scene.traverse(obj => {
				if (linkto && obj.name === 'linkto') {
					setTo({
						position: obj.position,
						rotation: obj.geometry,
						scale: obj.scale
					})
				}
				if (linkfrom && obj.name === 'linkfrom') {
					setFrom({
						position: obj.position,
						rotation: obj.geometry,
						scale: obj.scale
					})
				}
				if (linkalt && obj.name === 'linkalt') {
					setAlt({
						position: obj.position,
						rotation: obj.geometry,
						scale: obj.scale
					})
				}
			})
			set(gltf.scene)
		}), [url]
	)

	// Note the invisible element is only hidden from the camera,
	// it is still clickable.
	return scene ? <>
		{linkto ?
			<mesh
				onClick={() => navigate(linkto)}
				position={dataTo.position}
				geometry={dataTo.geometry}>
				<meshLambertMaterial attach="material" visible={true} />
			</mesh>
		: null}
		{linkfrom ?
			<mesh
				onClick={() => navigate(linkfrom)}
				position={dataFrom.position}
				geometry={dataFrom.geometry}>
				<meshLambertMaterial attach="material" visible={true} />
			</mesh>
			: null}
		{linkalt ?
			<mesh
				onClick={() => navigate(linkalt)}
				position={dataAlt.position}
				geometry={dataAlt.geometry}>
				<meshLambertMaterial attach="material" visible={true} />
			</mesh>
			: null}
	</> : null
}
