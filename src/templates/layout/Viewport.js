import React from 'react'
import { Link, withPrefix } from 'gatsby'

// Import r3f Canvas, to render a 3D scene
import Canvas from '../../components/canvas/Canvas'

// context hook, to be aware of "global" state
import { useNonsense } from '../../components/hooks/Nonsense'

export default function Viewport({ data, images, children }) {
	const { nonsense } = useNonsense()
	const d = data.frontmatter

	const title = d.title || d.name

	// gets the link to previous and next rooms
	const next = d.linkto
	const prev = d.linkfrom

	// The stop nonsense button renders a lighter page
	if (!nonsense) {
		return (
			<main className="page">
				<article>
					<Link to={prev} className="nn-nav">
						Prev
					</Link>
					<Link to={next} className="nn-nav">
						Next
					</Link>
					<h1>{title}</h1>
					<div dangerouslySetInnerHTML={{ __html: data.html }} />
					<div className="nn-grid">
						{images.map((img) => {
							return (
								<img
									src={withPrefix(`/img/${img}`)}
									key={img}
									className="nn-image"
								/>
							)
						})}
					</div>
				</article>
			</main>
		)
	}

	return (
		<main id="viewport">
			<Canvas>{children}</Canvas>
		</main>
	)
}
