import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { useThree } from 'react-three-fiber'
import typeface from '../../../assets/fonts/uni-neue-italic.json'
import { Font } from 'three/src/extras/core/Font'

export default function Portal({ link = "/", obj = {}}) {
	const [visible, setVisibility] = useState(false);
	// set initial material to be invisible
	if (obj && obj.material) obj.material.opacity = 0;
	const geo = obj.geometry
	const { camera } = useThree()
	const font = new Font(typeface)

	return (
		<group>
			<mesh
				onPointerEnter={() => { setVisibility(true); document.body.style.cursor = 'pointer' }}
				onPointerLeave={() => { setVisibility(false); document.body.style.cursor = '' }}
				onPointerDown={() => { document.body.style.cursor = ''; navigate(link)}}
				position={obj.position || [0,0,0]}
				geometry={geo}
				scale={obj.scale || 1}>
				<meshBasicMaterial attach="material" visible={visible} wireframe />
			</mesh>
			{visible ?
				<mesh
					onUpdate={self => self.lookAt(camera.getWorldPosition())}
					position={obj.position}
					rotation={obj.rotation || [0, 0, 0]}>
					<textGeometry attach="geometry"
						args={[link, { ...{ font },
							size: 0.4,
							height: 0.2,
							curveSegments: 2
						}]}
						onUpdate={geo => void geo.center() } />
					<meshNormalMaterial attach="material" />
				</mesh>
			: null}
		</group>
	)
}
