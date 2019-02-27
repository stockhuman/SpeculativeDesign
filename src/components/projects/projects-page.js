import React, { Component } from 'react'

import Layout from '../layouts/page'

class ProjectsPageWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
	}

	setActiveSlide(int) {
		this.setState({ active : int })
	}

	getActiveSlide() {
		return this.state.active
	}

	start () {
	}

	componentDidMount() {
		this.start()
	}

	render () {
		return (
			<Layout title='projects'>
				<div id="projects">
					<h1>projects</h1>
				</div>
			</Layout>
		)
	}
}

export default ProjectsPageWrapper
