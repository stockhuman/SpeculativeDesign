import React from 'react'
import { navigate } from 'gatsby'

import View from '../components/canvas/canvas'
import Model from '../components/canvas/Model'
import Layout from '../components/layouts/page'
import Sidebar from '../components/layouts/Sidebar'
import queries from '../components/data/queries'

// The about page serves to branch the two paths: one to artists and the other
// to projects. This interstitial space also serves to describe the project

// Each branch takes one on a successive journey though each room, project or person.
// the order of each project is determined by alphanumeric sorting, thus the numbered entries.
const About = () => {
	// first one (as it is the shallowest in the project tree)
	const { people, projects } = queries()
	const firstProject = projects[0].path
	const firstPerson = people[0].path

	return (
		<Layout>
			<View center={[0,0,0]}>
				<mesh
					position={[0, 1, -4]}
					onClick={() => navigate('/bibliography')}>
					<planeBufferGeometry attach="geometry" args={[2, 2]} />
					<meshLambertMaterial attach="material" transparent />
				</mesh>
				<mesh
					position={[4, 1, 0]}
					rotation={[1,-1,1]}
					onClick={() => navigate(firstProject)}>
					<planeBufferGeometry attach="geometry" args={[2, 2]} />
					<meshBasicMaterial attach="material" color="peachpuff" />
				</mesh>
				<mesh
					position={[-4, 1, 0]}
					rotation={[0,1,0]}
					onClick={() => navigate(firstPerson)}>
					<planeBufferGeometry attach="geometry" args={[2, 2]} />
					<meshLambertMaterial attach="material" color="blue" />
				</mesh>
				<Model url={'/meshes/about/about2_002.glb'} />
				<directionalLight intensity={2} position={[0, 2, 2]} />
			</View>
			<Sidebar />
		</Layout>
	)
}

export default About
