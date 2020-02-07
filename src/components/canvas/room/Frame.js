import React from 'react'
import { withPrefix } from 'gatsby'
import { TextureLoader } from 'three'
import { useLoader } from 'react-three-fiber'

/**
 * 'Frames' an image texture as a painting
 * @param {string} url path to an image texture, relative /static
 * @param {Three object} obj gltf object data to position frame
 */
export default function Frame({ url, obj }) {
	const texture = useLoader( TextureLoader, withPrefix(url))

	return (
		<mesh position={obj.position} rotation={obj.rotation} geometry={obj.geometry} >
			<meshStandardMaterial attach="material" transparent>
				<primitive attach="map" object={texture} />
			</meshStandardMaterial>
		</mesh>
	)
}
