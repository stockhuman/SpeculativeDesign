import React, { Component } from 'react'
import Link from 'gatsby-link'

class ProjectsContent extends Component {

	render () {
		return (
			<div className="content">
				<h4 className="location"></h4>
				<div className="slides">
					{this.props.projects.map((slide, i) =>
						<div className="slide" key={i}>
							<Link to={slide.link} className="slide__name">{slide.name}</Link>
							<h3 className="slide__title">
								<span>{slide.title}</span>
							</h3>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default ProjectsContent
