import React from 'react'
import { Door } from '../Link'

// Sets up walls and links to adjacent rooms in people & project templates
export default function Room({ to, from, alt }) {
	return (
		<group>
			<fog color={'#111'} />
			<ambientLight intensity={0.7} />
			<pointLight intensity={1.3} />
			{to ? (
				<Door
					link={to}
					position={[-3, 2, 1]}
					rotation={[0.07, Math.PI / 3, 0.03]}
				/>
			) : null}
			{from ? (
				<Door
					link={from}
					position={[3, 1, 2]}
					rotation={[0.07, -Math.PI / 3.1, 0.03]}
				/>
			) : null}
			{alt ? <Door link={alt} position={[4, 4, 1]} /> : null}
		</group>
	)
}
