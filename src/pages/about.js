import React from 'react'
import Link from 'gatsby-link'

import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts/page'

// The about page serves to branch the two paths: one to artists and the other
// to projects. This interstitial space also serves to describe the project
const About = () => (
	<Layout>
		<h4>Playful Speculators</h4>
		<Link to='/people'><h3>People</h3></Link>
		<Link to='/projects'><h3>Projects</h3></Link>

		<View center={[0,0,0]}>
			<Model url={'/meshes/about/about2_003.glb'} />
			<directionalLight intensity={2} position={[0, 2, 2]} />
		</View>
	</Layout>
)

export default About
