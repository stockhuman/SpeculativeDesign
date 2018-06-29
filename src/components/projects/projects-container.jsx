import React, { Component } from 'react'
import Anime from 'react-anime'
import ImagesLoaded from 'react-images-loaded';

import Room from './room'
import '../../scss/pages/_projects.scss'

import img1 from '../../assets/home/1.png'



const projects = [
	{isActive: true,
		img1: img1
	},
	{isActive: false,
		img1: img1
	}
] // todo => query projects for data

class ProjectsContainer extends Component {

	render () {
		const s1 = require('../../assets/misc/anime.min.js')
		const s2 = require('../../assets/misc/imagesloaded.pkgd.min.js')
		const s3 = require('../../assets/misc/main.js')
		return (
			<div className="scroller">
				{projects.map((project, i) =>
					<Room
						project={project}
						key={i}
					/>
				)}
			</div>
		)
	}
}

export default ProjectsContainer
