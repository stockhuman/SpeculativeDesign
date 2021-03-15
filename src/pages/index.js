import React from 'react'
import { Link } from 'gatsby'
import { Stars, Sky } from '@react-three/drei'

import HUD from '../templates/layout/HUD'
import Page from '../templates/layout/Page'
import Viewport from '../templates/layout/Viewport'


import Canvas from '../components/canvas/Canvas'
import { LinkedModel } from '../components/canvas/Link'
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
			<main className="page">
				<article>
					<Link to={'/about/'} className="nn-nav">
						About
					</Link>
					<h1>Welcome to Speculative Play!</h1>
				</article>
			</main>
		)
	}

	return (
		<Page title={'doot'}>
			<Viewport>
				<Canvas center={[0, 1.3, 8]}>
					<Sky inclination={Math.random()} />
					<Stars />
					<ambientLight intensity={1} />
					{/* <LinkedModel link={'/about/'} url={'meshes/index/SP_index8.glb'} />
			<spotLight intensity={2} position={[3, 4, 10]} angle={2} penumbra={2} /> */}
				</Canvas>
			</Viewport>
			<HUD />
		</Page>
	)
}

export default IndexPage
