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
			<Model url={'/meshes/about/about.004.glb'} />
			<ambientLight color={0xFFFFFF} intensity={0.4}/>
			<spotLight intensity={0.71} position={[0.1, 1, 1]} angle={-1} penumbra={1} castShadow />
		</View>
	</Layout>
)

export default About
