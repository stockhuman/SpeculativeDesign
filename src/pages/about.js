import React from 'react'

// Page Structure
import View from '../components/canvas/canvas'
import Room from '../components/canvas/room/Room'
import Layout from '../components/layouts/Page'
import Sidebar from '../components/layouts/HUD'

// Components
import Model from '../components/canvas/Model'

// Styles
import '../scss/main.scss'
import '../scss/layout/_base.scss'

// Text
import { about } from '../components/data/strings'

// The about page serves to branch the two paths: one to artists and the other
// to projects. This interstitial space also serves to describe the project

// Each branch takes one on a successive journey though each room, project or person.
// the order of each project is determined by alphanumeric sorting, thus the numbered entries.
const About = () => (
	<Layout>
		<View center={[0, 1.3, 0]}>
			<Room url={'/meshes/about/about3_015.glb'} data={{
				LinkProjects: '/projects/it-is-as-if-you-were-doing-work',
				LinkPeople: '/people/agustina-isidori',
				LinkBibliography: '/bibliography'
			}} />
			<Model url={'/meshes/about/Sphinx.glb'} />
			<hemisphereLight color={0xffffff} groundColor={0xffffff} intensity={0.4} />
		</View>
		<Sidebar intro="Welcome, welcome, welcome!" info={about}/>
	</Layout>
)

export default About
