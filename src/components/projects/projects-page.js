import React, { Component } from 'react'

import Layout from '../layouts/page'

// import helpers from './helpers'

class ProjectsPageWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
	}

	componentDidMount() {
	}

	render () {
		return (
			<Layout title='projects'>
			</Layout>
		)
	}
}

export default ProjectsPageWrapper
