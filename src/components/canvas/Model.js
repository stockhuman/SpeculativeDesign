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
	return <primitive object={gltf.scene} />
}

/**
 * 'Frames' an image texture as a painting
 * @param {string} url path to an image texture
 */
export function Frame({ url }) {
	const texture = useMemo(() => new TextureLoader().load(url), [url])
	return (
		<mesh>
			<planeBufferGeometry attach="geometry" args={[5, 5]} />
			<meshLambertMaterial attach="material" transparent>
				<primitive attach="map" object={texture} />
			</meshLambertMaterial>
		</mesh>
	)
}

/**
 * For ease of room creation, export a gltf scene with named objects
 * corresponding to positions of interactive elements within a scene.
 * Creates invisible meshes that link to other urls.
 * @param {string} url GLTF scene containing named geometry
 * @param {string} linkto url to navigate to when clicking the linkto model
 * @param {string} linkfrom url to navigate to when clicking the linkfrom model
 * @param {string} linkalt url to navigate to when clicking the linkalt model
 */
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
