import React from 'react'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Room from '../canvas/room/Room'
import Text from '../canvas/Text'
import Model from '../canvas/Model'

// Materials and Loaders from Three

// Links and data
import Sculpture from '../canvas/Sculpture'

export default ({ data }) => {
	const d = data.markdownRemark.frontmatter
	const title = d.title || d.name

	// gets the link to previous and next rooms
	const next = d.linkto
	const prev = d.linkfrom
	const alt = d.linkalt

	// gets a random room shape
	const room = d.room
		? d.room
		: `room${Math.floor(Math.random() * 2)}.glb`

	return (
		<View center={[0, 0, 0]}>
			<Room url={`/meshes/rooms/${room}`} />
			<Model url={`/meshes/rooms/plinths/plinth-0.glb`} />
			<ambientLight intensity={1} />
			<directionalLight intensity={1} position={[-1, 1, -1]} />
			{d.sculpture ? <Model url={`/meshes/sculptures/${d.sculpture}`} /> : <Sculpture />}
			<Text
				string={title}
				options={
					{
						position: [0,-0.2,1.5],
						rotation: [0, 0, 0],
						color: '#fce867'
					}
				}
				size={0.2}
				bevelEnabled={true}
				height={0.2}
				bevelThickness={0.01}
				bevelSize={0.01}
				bevelSegments={1}
				curveSegments={4}
		/>
		</View>
	)
}
