import React, { useState } from 'react'
import { navigate } from 'gatsby'

export default function Portal({ link, obj }) {
	const [visible, setVisibility] = useState(false);
	obj.material.opacity = 0;
	return (
		<mesh
			onPointerEnter={() => setVisibility(true)}
			onPointerLeave={() => setVisibility(false)}
			onPointerDown={() => navigate(link)}
			position={obj.position}
			geometry={obj.geometry}
			scale={obj.scale}>
			<meshNormalMaterial attach="material" visible={visible} />
		</mesh>
	)
}
