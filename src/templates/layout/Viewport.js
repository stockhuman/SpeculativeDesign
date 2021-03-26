import React, { Suspense } from 'react'
import { Link, withPrefix } from 'gatsby'

// Import r3f Canvas, to render a 3D scene
import Canvas from '../../components/canvas/Canvas'

// context hook, to be aware of "global" state
import { useNonsense } from '../../components/hooks/Nonsense'

export default function Viewport({ data, images = [], children }) {
	const { nonsense } = useNonsense()

	let d = data
	let prev, next, title
	if (data && data.frontmatter) {
		d = data.frontmatter
		title = d.title || d.name

		// gets the link to previous and next rooms
		next = d.linkto || null
		prev = d.linkfrom || null
	}

	// The stop nonsense button renders a lighter page
	if (!nonsense) {
		return (
			<main className="page">
				<article>
					{prev ? (
						<Link to={prev} className="nn-nav">
							Prev
						</Link>
					) : null}
					{next ? (
						<Link to={next} className="nn-nav">
							Next
						</Link>
					) : null}

					<h1>{title || 'lol'}</h1>
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
			<Canvas>
				<Suspense fallback={null}>{children}</Suspense>
			</Canvas>
		</main>
	)
}
