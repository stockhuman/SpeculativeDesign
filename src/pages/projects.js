import React from 'react'

// Page Structure
import View from '../components/canvas/canvas'
import Room from '../components/canvas/room/Room'
import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'

// As the user approaches the website, an imposing museum facade looms in the index..

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
export default () => (
	<Layout>
		<View center={[0, 1.3, 8]}>
			<Room url={'/meshes/tests/about12.glb'} data={{
				LinkProjects: '/projects/it-is-as-if-you-were-doing-work',
				LinkPeople: '/people/agustina-isidori',
				LinkBibliography: '/bibliography'
			}}/>
			{/* <ambientLight intensity={1} /> */}
			<directionalLight intensity={0.3} position={[0, 2, 2]} />
			<spotLight intensity={8} position={[0, 1, 10]} angle={110} penumbra={0.5} castShadow />
		</View>
		<Sidebar />
	</Layout>
)
