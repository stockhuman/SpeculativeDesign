import React from 'react'
import { Link, withPrefix } from 'gatsby'
// import { StaticImage } from 'gatsby-plugin-image'

// Page Structure & Scene components
import View from '../canvas/canvas'
import Room from '../canvas/room/Room'
import Text from '../canvas/Text'
import Model from '../canvas/Model'

// Links and data
import Sculpture from '../canvas/Sculpture'

import { useNonsense } from './Nonsense'

export default function Viewport ({ data, images }) {
	const { nonsense } = useNonsense()
	const d = data.frontmatter

	const title = d.title || d.name

	// gets the link to previous and next rooms
	const next = d.linkto
	const prev = d.linkfrom

	// The stop nonsense button
	if (!nonsense) {
		return (
			<main className="page">
				<article>
					<Link to={prev} className="nn-nav">Prev</Link>
					<Link to={next} className="nn-nav">Next</Link>
					<h1>{title}</h1>
					<div dangerouslySetInnerHTML={{ __html: data.html }} />
					{images.map((img) => {
						return (
							<img src={withPrefix(`/assets/img/${img}`)} key={img} />
						)
					})}
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
				data={{ LinkA: next, LinkB: prev, images }} />
			<Model url={`/meshes/rooms/plinths/plinth-${Math.floor(Math.random() * 3)}.glb`} />
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
