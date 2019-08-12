import React from 'react'
import Link from 'gatsby-link'

import View from '../components/canvas/canvas'
import Scene from '../components/canvas/Model'

import Layout from '../components/layouts/page'

const About = () => (
	<Layout>
		<h4>Playful Speculators</h4>
		<Link to='people'><h3>People</h3></Link>
		<Link to='projects'><h3>Projects</h3></Link>

		<View center={[0,0,0]}>
			<Scene url={'meshes/icosphere.glb'} material />
			<spotLight intensity={0.2} position={[0, 2, 10]} angle={0.4} penumbra={1} castShadow />
		</View>
	</Layout>
)

export default About
