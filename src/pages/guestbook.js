import React from 'react'

// Page Structure
import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts/page'

import Log from '../components/log'

// Materials and Loaders from Three
import { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'
// import Fonts from '../scss/style.js'

// As the user approaches the website, an imposing museum facade looms in the index..

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const Guestbook = () => (
	<Layout>
		<View center={[0, 0.2, 8]}>
			<mesh position={[0, 1, -4]}>
				<sphereBufferGeometry attach="geometry" args={[2, 20, 20]} />
				<meshLambertMaterial attach="material" color="blue" />
			</mesh>
			<Model url={'meshes/entrance_index.glb'} />
			<Model url={'meshes/entrance_lattice.glb'} material={new MeshNormalMaterial()} />

			<directionalLight intensity={0.5} position={[-25, 25, -25]} />
			<spotLight intensity={2} position={[1, 2, 10]} angle={0.4} penumbra={0.5} castShadow />
		</View>
		{/* <Caption /> */}
		<Log />
	</Layout>
)

export default Guestbook
