import React from 'react'

import '../scss/layout/_projects.scss'
import ProjectsPageWrapper from '../components/projects/projects-page'

// Project Images
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

import matches1 from '../assets/img/matches/Chess-UI.png'
import matches2 from '../assets/img/matches/Corridor.png'
import matches3 from '../assets/img/matches/Ramp.png'
import matches4 from '../assets/img/matches/Room2.png'
import matches5 from '../assets/img/matches/Snow.png'
import matches6 from '../assets/img/matches/Stairs.png'
import matches7 from '../assets/img/matches/UI.jpg'
import matches8 from '../assets/img/matches/Room.png'

import neoqab1 from '../assets/img/neoqab/Neoqab.jpg'
import neoqab2 from '../assets/img/neoqab/Neoqab2.png'

import drift1 from '../assets/img/drift/drift.jpg'

import jam1 from '../assets/img/jam/deeptimejam.png'

import orifice0 from '../assets/img/orifice/0.png'

const projects = [
	{
		img1: love1,
		img2: love2,
		img3: love3,
		img4: love4,
		img5: love5,
		img6: love6,
		img7: love6,
		img8: love4,
		name: 'Love',
		title: 'It is as if you were making love',
		link: '/projects/love',
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
		img8: work2,
		name: 'Work',
		title: 'It is as if you were doing work',
		link: '/projects/it-is-as-if-you-were-doing-work',
		wallColor: 'A7BBC3'
	},
	{
		img1: drift1,
		img2: '',
		img3: '',
		img4: '',
		img5: '',
		img6: '',
		img7: '',
		img8: '',
		name: 'DRIFT',
		title: 'DRIFT workshop',
		link: 'projects/drift-workshop'
	},
	{
		img1: '',
		img2: orifice0,
		img3: '',
		img4: '',
		img5: '',
		img6: '',
		img7: '',
		img8: '',
		name: 'Mono-Orifice™',
		title: '',
		link: '/projects/mono-orifice'
	},
	{
		img1: jam1,
		img2: '',
		img3: '',
		img4: '',
		img5: '',
		img6: '',
		img7: '',
		img8: '',
		name: 'Deep Time Jam',
		title: '',
		link: '/projects/deep-time-jam'
	},
	{
		img1: neoqab1,
		img2: neoqab2,
		img3: '',
		img4: '',
		img5: '',
		img6: '',
		img7: '',
		img8: '',
		name: 'NEO//QAB',
		title: '',
		link: '/projects/neoqab'
	},
	{
		img1: matches1,
		img2: matches2,
		img3: matches3,
		img4: matches4,
		img5: matches5,
		img6: matches6,
		img7: matches7,
		img8: matches8,
		name: 'Burnt Matches',
		title: '',
		link: '/projects/burnt-matches'
	}
] // todo => query projects for data


const ProjectsPage = () => (
	<ProjectsPageWrapper projects={projects} />
)

export default ProjectsPage
