import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'
import '../../scss/main.scss'

export default class Layout extends Component {
	constructor() {
		super()
		this.state = { title: '' }
	}

	componentDidMount() {
		if (this.props.title) {
			this.setState({title: this.props.title})
		}
	}

	render () {
		return (
			<Fragment>
				<StaticQuery
					query={graphql`
						query PageTitleQuery($path: String!) {
							markdownRemark(frontmatter: {path: { eq: $path } }) {
								frontmatter {
									path
									title
								}
							}
							site {
              	siteMetadata {
               		title
             		}
            	}
						}
					`}
					render={data => (
						<div>
							<Helmet
								title={this.state.title}
								meta={[
									{ name: 'description', content: 'Sample' },
									{ name: 'keywords', content: 'sample, something' },
								]}
								link={[
									{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text' }
								]}
							/>
							<Header siteTitle={data.site.siteMetadata.title} />
						</div>
					)}
				/>
				<div
					style={{
						margin: '0 auto',
						maxWidth: 960,
						padding: '0px 1.0875rem 1.45rem',
						paddingTop: 0,
					}}
				>
					{this.props.children}
				</div>
			</Fragment>
		)
	}
}
