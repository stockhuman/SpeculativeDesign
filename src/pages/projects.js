import React from 'react'

import '../scss/pages/_projects.scss'
import ProjectsPageWrapper from '../components/projects/projects-page'

// Project Images
import img1 from '../assets/home/1.png'
import love1 from '../assets/img/love/about.png'
import love2 from '../assets/img/love/desktop.png'
import love3 from '../assets/img/love/petite-mort.png'
import love4 from '../assets/img/love/play.png'
import love5 from '../assets/img/love/slow-down.png'
import love6 from '../assets/img/love/title.png'

import work1 from '../assets/img/work/About.png'
import work2 from '../assets/img/work/Break.png'
import work3 from '../assets/img/work/Login.png'
import work4 from '../assets/img/work/Music.png'
import work5 from '../assets/img/work/Promotion.png'
import work6 from '../assets/img/work/Working_1.png'
import work7 from '../assets/img/work/Working_2.png'

import matches1 from '../assets/img/matches/Corridor.png'

const projects = [
	{
		img1: love1,
		img2: love2,
		img3: love3,
		img4: love4,
		img5: love5,
		img6: love6,
		img7: love6,
		img8: img1,
		name: 'Love',
		title: 'It is as if you were making love',
		date: 'jan 2',
		wallColor: 'FFEFE5'
	},
	{
		img1: work1,
		img2: work2,
		img3: work3,
		img4: work4,
		img5: work5,
		img6: work6,
		img7: work7,
		img8: img1,
		name: 'Work',
		title: 'It is as if you were doing work',
		date: 'jan 3',
		wallColor: 'A7BBC3'
	},
	{
		img1: matches1,
		img2: img1,
		img3: img1,
		img4: img1,
		img5: img1,
		img6: img1,
		img7: love6,
		img8: img1,
		name: 'Doot me good',
		title: 'hey hey',
	}
] // todo => query projects for data


const ProjectsPage = () => (
	<ProjectsPageWrapper projects={projects} />
)

export default ProjectsPage
