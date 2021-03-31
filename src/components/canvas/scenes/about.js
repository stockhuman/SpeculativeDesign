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
			<LinkedModel
				link={'/people/agustina-isidori'}
				url={'/models/bust.glb'}
				position={[-5, 2, -2]}
				rotation={[0, Math.PI / 2, 0]}
			/>
			<spotLight
				intensity={6}
				position={[-4, 6, -3]}
				penumbra={0.4}
				angle={1}
			/>
			<pointLight position={[-5, 2, -2]} intensity={2} />
			<LinkedModel
				link={'/projects/it-is-as-if-you-were-doing-work'}
				url={'/models/door.glb'}
				position={[0, 1, -2]}
				rotation={[0, Math.PI / 2, 0]}
			/>
		</>
	)
}
