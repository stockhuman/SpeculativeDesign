import React, { Component } from 'react'

class ProjectsContent extends Component {

	render () {
		return (
			<div className="content">
				<h4 className="location">loc</h4>
				<div className="slides">
					{this.props.projects.map((slide, i) =>
						<div className="slide" key={i}>
							<h2 className="slide__name">{slide.name}</h2>
							<h3 className="slide__title">
								<span>&ldquo;{slide.title}&rdquo;</span>
								<div className="slide__number">{i}</div>
							</h3>
							<p className="slide__date">{slide.date}</p>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default ProjectsContent
