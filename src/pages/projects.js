import React, { Suspense } from 'react'

// Page Structure
import View from '../components/canvas/canvas'
import Model from '../components/canvas/RoomLoader'
import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'

// As the user approaches the website, an imposing museum facade looms in the index..

// note the path is relative to the 'static' directory
// at the root of the project. .glTF files (or binary, in this case)
// are not natively supported by webpack, and cannot be imported as the css above.
const ProjectsPage = () => (
	<Layout>
		<View center={[0, 1.3, 8]}>
			<Suspense fallback={null}>
				<Model url={'meshes/tests/testroom.glb'} />
			</Suspense>
			<ambientLight intensity={0.2} />
			<spotLight intensity={3} position={[3, 4, 10]} angle={2} penumbra={2} />
		</View>
		<Sidebar />
	</Layout>
)

export default ProjectsPage
