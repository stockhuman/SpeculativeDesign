import React from 'react'
import { navigate } from 'gatsby'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Model from '../canvas/Model'
import Text from '../canvas/Text'

// Materials and Loaders from Three

// Links and data
import queries from '../data/queries'
import Sculpture from '../canvas/Sculpture'

export default ({ data }) => {
	const title = data.markdownRemark.frontmatter.title
	const path = data.markdownRemark.frontmatter.path

	let q = queries()
	let e = q.indeces.filter(val => val.node.path == path)

	// gets the link to previous and next rooms
	const next = e[0].next.path
	const prev = e[0].previous.path

	// gets a random room shape
	const room = data.markdownRemark.frontmatter.room
		? data.markdownRemark.frontmatter.room
		: Math.floor(Math.random() * 2)

	let posprev, posnext
	switch (room) {
		case 0:
			posprev = [4, 1, -4]
			posnext = [0, 1, -4]
			break;
		case 1:
			posprev = [4, 1, -4]
			posnext = [0, 1, -4]
			break;
	}

	return (
		<View center={[0, 0, 0]}>
			<mesh
				position={posnext}
				onClick={() => navigate(next)}>
				<planeBufferGeometry attach="geometry" args={[2, 2]} />
				{/* Note the invisible element is only hidden from the camera,
				it is still clickable. */}
				<meshLambertMaterial attach="material" visible={true} />
			</mesh>
			<mesh
				position={posprev}
				onClick={() => navigate(prev)}>
				<planeBufferGeometry attach="geometry" args={[2, 2]} />
				<meshLambertMaterial attach="material" transparent />
			</mesh>
			<Model url={`/meshes/room${room}.glb`} />
			<ambientLight intensity={0.01} />
			<directionalLight intensity={0.5} position={[-1, 1, -1]} />
			<Sculpture />
			<Text
				string={title}
				options={
					{
						position: [-1,1,Math.random()],
						rotation: [Math.random(),Math.random(),Math.random()],
						color: 'yellow'
					}
				}
				size={0.2 + (Math.random() / 2)}
				bevelEnabled={true}
				height={0.1}
				bevelThickness={0.01}
				bevelSize={0.01}
				bevelSegments={1}
				curveSegments={4}
		/>
		</View>
	)
}
