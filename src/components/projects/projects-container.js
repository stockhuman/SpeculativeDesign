import React, { Component } from 'react'

import Room from './projects-room'


class ProjectsContainer extends Component {

	render () {
		return (
			<div className="container" style={{position:'fixed', top: '0', left: '0', zIndex: '-2'}}>
				<div className="scroller">
					{this.props.projects.map((project, i) =>
						<Room
							project={project}
							key={i}
							isActive={this.props.isActive}
							index={i}
						/>
					)}
				</div>
			</div>
		)
	}
}

export default ProjectsContainer
