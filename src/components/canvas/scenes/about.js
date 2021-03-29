import React from 'react'
import { LinkedModel } from '../Link'

export default function AboutScene() {
	return (
		<>
			<ambientLight intensity={0.6} />
			<LinkedModel
				link={'/bibliography'}
				url={'/models/book.glb'}
				position={[4, 2, -3]}
				rotation={[-0.5, 0.3, 0.4]}
			/>
		</>
	)
}
