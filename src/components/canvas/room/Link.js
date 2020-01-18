import React, { useState } from 'react'
import { navigate } from 'gatsby'

import { PlaneBufferGeometry } from 'three'

export default function Portal({ link = "/", obj = {}}) {
	const [visible, setVisibility] = useState(false);
	// set initial material to be invisible
	if (obj && obj.material) obj.material.opacity = 0;
	const geo = obj.geometry || new PlaneBufferGeometry(2, 2)

	return (
		<mesh
			onPointerEnter={() => setVisibility(true)}
			onPointerLeave={() => setVisibility(false)}
			onPointerDown={() => navigate(link)}
			position={obj.position || [0,0,0]}
			geometry={geo}
			scale={obj.scale || 1}>
			<meshNormalMaterial attach="material" visible={visible} />
		</mesh>
	)
}
