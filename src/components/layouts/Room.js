import React from 'react'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Model, { SceneLinks } from '../canvas/Model'
import Text from '../canvas/Text'

// Materials and Loaders from Three

// Links and data
import Sculpture from '../canvas/Sculpture'

export default ({ data }) => {
	const title = data.markdownRemark.frontmatter.title

	// gets the link to previous and next rooms
	const next = data.markdownRemark.frontmatter.linkto
	const prev = data.markdownRemark.frontmatter.linkfrom
	const alt = data.markdownRemark.frontmatter.linkalt

	// gets a random room shape
	const room = data.markdownRemark.frontmatter.room
		? data.markdownRemark.frontmatter.room
		: `room${Math.floor(Math.random() * 1)}.glb`

	return (
		<View center={[0, 0, 0]}>
			<SceneLinks url={`/meshes/room1.temp.001.glb`}
				linkto={next}
				linkfrom={prev}
				linkalt={alt}
			/>
			<Model url={`/meshes/${room}`} />
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
