import React, { useEffect } from 'react'
import { Link, withPrefix } from 'gatsby'
import { Environment } from '@react-three/drei'
import { useAsset } from 'use-asset'

// Page Structure
import Page from '../templates/layout/Page'
import HUD from '../templates/layout/HUD'

import Canvas from '../components/canvas/Canvas'
import { useNonsense } from '../components/hooks/Nonsense'

import '../scss/main.scss'
import HomeCanvas from '../components/canvas/scenes/home'

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const IndexPage = () => {
	const { nonsense } = useNonsense()

	// see https://github.com/pmndrs/drei/issues/332#issuecomment-808119185
	useEffect(() => () => useAsset.clear(), [])

	// The stop nonsense button
	if (!nonsense) {
		return (
			<Page title="Welcome">
				<main className="page">
					<article>
						<Link to={'/about/'} className="nn-nav">
							<img
								src={withPrefix('/img/bboard.jpg')}
								style={{ width: '100%' }}
							/>
						</Link>
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
					<Environment preset="sunset" />
					<HomeCanvas />
				</Canvas>
			</main>
			<HUD />
		</Page>
	)
}

export default IndexPage
