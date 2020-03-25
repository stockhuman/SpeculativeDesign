import React from 'react'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Room from '../canvas/room/Room'
import Text from '../canvas/Text'
import Model from '../canvas/Model'

// Links and data
import Sculpture from '../canvas/Sculpture'

import { useNonsense } from './Context'

export default ({ data, images, image }) => {
	const { nonsense } = useNonsense()
	const d = data.frontmatter

	const title = d.title || d.name

	// gets the link to previous and next rooms
	const next = d.linkto
	const prev = d.linkfrom


	console.log('nonsense is', nonsense)
	if (!nonsense) {
		return (
			<main className="page">
				<article>
					<h1>{d.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: data.html }} />
				</article>
			</main>
		)
	}

	// gets a random room shape
	const room = data.room
		? data.room
		: `room_${String(Math.floor(Math.random() * 4)).padStart(2, '0')}.glb`

	return (
		<View center={[0, 0, 0]}>
			<Room url={`/meshes/rooms/${room}`}
				data={{ LinkA: next, LinkB: prev, images: images || image }} />
			<Model url={`/meshes/rooms/plinths/plinth-${Math.floor(Math.random() * 2)}.glb`} />
			{ d.sculpture
				? <Model url={`/meshes/sculptures/${d.sculpture}`} />
				: <Sculpture />
			}
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
