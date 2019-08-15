import React from 'react'
import { navigate } from 'gatsby'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Model from '../canvas/Model'
import Text from '../canvas/Text'

// Materials and Loaders from Three

// Links and data
import queries from '../data/queries'

export default ({ data }) => {
	const title = data.markdownRemark.frontmatter.title
	const path = data.markdownRemark.frontmatter.path

	let q = queries()
	let e = q.indeces.filter(val => val.node.path == path)

	const next = e[0].next.path
	const prev = e[0].previous.path

	return (
		<View center={[0, 0, 0]}>
			<mesh
				position={[0, 1, -4]}
				onClick={() => navigate(next)}>
				<planeBufferGeometry attach="geometry" args={[2, 2]} />
				{/* Note the invisible element is only hidden from the camera,
				it is still clickable. */}
				<meshLambertMaterial attach="material" visible={false} />
			</mesh>
			<mesh
				position={[4, 1, -4]}
				onClick={() => navigate(prev)}>
				<planeBufferGeometry attach="geometry" args={[2, 2]} />
				<meshLambertMaterial attach="material" transparent />
			</mesh>
			<Model url={'/meshes/room7.glb'} />
			<Text
				string={title}
				options={
					{
						position: [-1,1,Math.random()],
						rotation: [Math.random(),Math.random(),Math.random()],
						color: 'yellow'
					}
				}
				size={0.4 + Math.random()}
				bevelEnabled={true}
				height={0.1}
				bevelThickness={0.01}
				bevelSize={0.01}
				bevelSegments={2}
				curveSegments={2}
		/>
		</View>
	)
}
