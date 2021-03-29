import React from 'react'
import { Door } from '../Link'

// Sets up walls and links to adjacent rooms in people & project templates
export default function Room({ to, from, alt }) {

	return (
		<group>
			{/* <mesh>
				<planeBufferGeometry args={[10, 10]} />
			</mesh> */}
			<mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
				<planeBufferGeometry args={[100, 100]} />
			</mesh>
			<fog color={'#111'} />
			<ambientLight intensity={0.6} />
			{to ? <Door link={to} position={[1, 1, 1]} /> : null}
			{from ? <Door link={from} /> : null}
			{alt ? <Door link={alt} /> : null}
		</group>
	)
}
