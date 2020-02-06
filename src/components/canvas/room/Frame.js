import React, { useMemo } from 'react'
import { withPrefix } from 'gatsby'
import { TextureLoader } from 'three'

/**
 * 'Frames' an image texture as a painting
 * @param {string} url path to an image texture, relative /static
 * @param {Three object} obj gltf object data to position frame
 */
export default function Frame({ url, obj }) {
	const texture = useMemo(() => new TextureLoader().load(withPrefix(url)), [url])

	return (
		<mesh position={obj.position} rotation={obj.rotation} >
			<planeBufferGeometry attach="geometry" args={[5, 5]} />
			<meshLambertMaterial attach="material" transparent>
				<primitive attach="map" object={texture} />
			</meshLambertMaterial>
		</mesh>
	)
}
