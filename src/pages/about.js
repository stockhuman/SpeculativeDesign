import React from 'react'

// Page Structure
import View from '../components/canvas/canvas'
import Room from '../components/canvas/room/Room'
import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/Sidebar'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'

// Text
import { about } from '../components/data/strings'

// The about page serves to branch the two paths: one to artists and the other
// to projects. This interstitial space also serves to describe the project

// Each branch takes one on a successive journey though each room, project or person.
// the order of each project is determined by alphanumeric sorting, thus the numbered entries.
export default () => (
	<Layout>
		<View center={[0, 1.3, 0]}>
			<Room url={'/meshes/about/about3_013.glb'} data={{
				LinkProjects: '/projects/it-is-as-if-you-were-doing-work',
				LinkPeople: '/people/agustina-isidori',
				LinkBibliography: '/bibliography'
			}} />
			<hemisphereLight color={0xffffff} groundColor={0xffffff} intensity={0.6} />

			{/* <directionalLight intensity={0.3} position={[0, 2, 2]} />
			<spotLight intensity={8} position={[0, 1, 10]} angle={110} penumbra={0.5} castShadow /> */}
		</View>
		<Sidebar intro="Welcome, welcome, welcome!" info={about}/>
	</Layout>
)
