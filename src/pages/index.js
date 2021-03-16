import React from 'react'
import { Link } from 'gatsby'
import { Stars, Sky } from '@react-three/drei'

// Page Structure
import Page from '../templates/layout/Page'
import HUD from '../templates/layout/HUD'

import Canvas from '../components/canvas/Canvas'
import { useNonsense } from '../components/hooks/Nonsense'

import '../scss/main.scss'

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const IndexPage = () => {
	const { nonsense } = useNonsense()

	// The stop nonsense button
	if (!nonsense) {
		return (
			<Page title="Welcome">
				<main className="page">
					<article>
						<Link to={'/about/'} className="nn-nav">
							About
						</Link>
						<h1>Welcome to Speculative Play!</h1>
					</article>
				</main>
				<HUD />
			</Page>
		)
	}

	return (
		<Page title="Welcome">
			<main id="viewport">
				<Canvas center={[0, 1.3, 8]}>
					<Sky inclination={Math.random()} />
					<Stars />
					<ambientLight intensity={1} />
					<fog args={['#cc7b32', 16, 20]} />
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]}>
						<planeBufferGeometry args={[1000, 1000]} />
					</mesh>
				</Canvas>
			</main>
			<HUD />
		</Page>
	)
}

export default IndexPage
