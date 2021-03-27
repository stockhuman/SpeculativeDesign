import React, { useEffect, useRef, useState } from 'react'
import { withPrefix } from 'gatsby'
import { Font } from 'three/src/extras/core/Font'

// implements https://threejs.org/docs/#api/en/geometries/TextGeometry
export default function Text({
	string,
	options = { position: [0, 0, 0] },
	props,
}) {
	const ref = useRef()
	const [typeface, setTypeface] = useState(null)

	useEffect(() => {
		const get = async () => {
			const data = await fetch(
				withPrefix('/fonts/uni-neue-italic.json')
			).then((res) => res.json())
			setTypeface(new Font(data))
		}

		get()
	}, [])

	return typeface ? (
		<mesh
			ref={ref}
			position={options.position}
			rotation={options.rotation || [0, 0, 0]}
		>
			<textGeometry
				args={[string, { ...{font: typeface}, ...props }]}
				onUpdate={(geo) => geo.center()}
			/>
			<meshNormalMaterial />
		</mesh>
	) : null
}
