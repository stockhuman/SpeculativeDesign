import React, { useState, useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { navigate } from 'gatsby'

// Drastically simplified Model importer no longer takes custom material parameters
export default function Model({ url }) {
	const gltf = useLoader(GLTFLoader, url)
	return <primitive object={gltf.scene} />
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
						geometry: obj.geometry,
					})
				}
				if (linkfrom && obj.name === 'linkfrom') {
					setFrom({
						position: obj.position,
						geometry: obj.geometry,
					})
				}
				if (linkalt && obj.name === 'linkalt') {
					setAlt({
						position: obj.position,
						geometry: obj.geometry,
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
			// <mesh position={dataTo.position}><boxBufferGeometry attach="geometry" args={[2, 3, 1]} />
			// 	<meshNormalMaterial attach="material" /></mesh>
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
