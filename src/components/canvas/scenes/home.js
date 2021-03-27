import React, { useRef, Suspense, useState } from 'react'
import { Stars, Sky, useGLTF } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'
import { withPrefix, navigate } from 'gatsby'

// wraps the homepage canvas scene, to allow for canvas hooks
// (and to keep things tidy)
export default function HomeCanvas() {
	const { nodes } = useGLTF(withPrefix('/models/index.glb'))
	const [visible, setVisibility] = useState(false)

	const ico = useRef()
	const cone = useRef()

	useFrame(() => {
		ico && ico.current
			? (ico.current.rotation.x = ico.current.rotation.y += 0.002)
			: null

		cone && cone.current ? (cone.current.rotation.y += 0.0005) : null
	})

	// the primary group was mostly generated with the gltfjsx utility.
	// see https://github.com/pmndrs/gltfjsx
	return (
		<Suspense fallback={null}>
			<Sky inclination={Math.random()} />
			<Stars />
			<ambientLight intensity={0.2} />
			<fog args={['#cc7b32', 16, 20]} />

			<group>
				<mesh
					geometry={nodes.Text.geometry}
					position={[-12.11, -1.98, -9.49]}
					rotation={[2.85, 0.27, 0.19]}
					scale={[2.66, 2.66, 2.66]}
				>
					<meshNormalMaterial />
				</mesh>
				<mesh geometry={nodes.Plane.geometry} position={[3.97, -2.9, -19.17]}>
					<meshStandardMaterial color={'black'} roughness={0.1} />
				</mesh>
				<mesh
					ref={cone}
					geometry={nodes.Cone.geometry}
					position={[2.64, 9.94, -25.54]}
					onPointerEnter={() => {
						setVisibility(true)
						document.body.style.cursor = 'pointer'
					}}
					onPointerLeave={() => {
						setVisibility(false)
						document.body.style.cursor = ''
					}}
					onClick={() => {
						document.body.style.cursor = ''
						navigate('about')
					}}
				>
					<meshStandardMaterial
						color="hotpink"
						wireframe={visible}
						roughness={0}
					/>
				</mesh>
				<mesh
					ref={ico}
					geometry={nodes.Icosphere.geometry}
					position={[2.88, 21.12, -25.64]}
					scale={[4.35, 4.35, 4.35]}
				>
					<meshStandardMaterial emissive={'navy'} />
				</mesh>
			</group>
		</Suspense>
	)
}

useGLTF.preload(withPrefix('/models/index.glb'))
