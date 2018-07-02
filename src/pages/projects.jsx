import React from 'react'
import Link from 'gatsby-link'

import '../scss/pages/_projects.scss'
import ProjectsPageWrapper from '../components/projects/projects-page'

// Project Images
import img1 from '../assets/home/1.png'

const projects = [
	{
		img1: img1,
		name: 'Test',
		title: 'title',
		date: 'jan 2'
	},
	{
		img1: img1,
		name: 'name',
		title: 'title',
		date: 'jan 3'
	},
	{
		img1: img1,
		name: 'Doot me good',
		title: 'hey hey',
		date: 'jan 3'
	}
] // todo => query projects for data


const ProjectsPage = () => (
	<ProjectsPageWrapper projects={projects} />
)

export default ProjectsPage
