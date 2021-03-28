import React, { useRef, useMemo } from 'react'
import { withPrefix } from 'gatsby'
import { useTexture } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'

const easeInOutCubic = (t) =>
	t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export default function Cadre({ img, position, rotation, animated = false }) {
	const texture = useTexture(withPrefix(`/img/${img}`))

	const ref = useRef()
	const factor = useMemo(() => -0.5 + Math.random(), [])

	if (animated)
		useFrame((state) => {
			const t = easeInOutCubic(
				(Math.sin(state.clock.getElapsedTime() * factor)) / 4
			)
			ref.current.position.y = position[1] + t * 1.1
		})

	const w = texture.image.width
	const h = texture.image.height

	const planeX = (w / h) * 2
	const planeY = 2

	return (
		<mesh ref={ref} position={position} rotation={rotation}>
			<planeBufferGeometry args={[planeX, planeY]} />
			<meshBasicMaterial map={texture} side={2} />
		</mesh>
	)
}
