import React from 'react'
import { navigate } from 'gatsby'

// Page Structure
import Page from '../templates/layout/Page'
import HUD from '../templates/layout/HUD'

import Canvas from '../components/canvas/Canvas'
import Text from '../components/canvas/Text'

const NotFoundPage = () => (
	<Page title="404">
		<main id="viewport">
			<Canvas center={[0, 0, 0]} background="#c9534b">
				<mesh onClick={() => navigate('/')} position={[0, 0, 0]}>
					<planeBufferGeometry args={[20, 20]} />
					<meshBasicMaterial visible={false} />
				</mesh>
				<directionalLight intensity={2} position={[0, 2, 2]} />
				<Text
					string={'?'}
					options={{
						position: [0, 100, -180],
						color: 'white',
					}}
					size={30}
					height={2}
					bevelEnabled={true}
					bevelThickness={3}
					bevelSize={5}
					bevelSegments={1}
					curveSegments={3}
				/>
			</Canvas>
		</main>
		<HUD />
	</Page>
)

export default NotFoundPage
