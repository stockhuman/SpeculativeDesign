import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'

import Header from '../header'
import '../../scss/main.scss'

const Layout = ({ children }) => (
	<StaticQuery
		query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
		render={data => (
			<>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{ name: 'description', content: 'Sample' },
						{ name: 'keywords', content: 'sample, something' },
					]}
					link={[
						{ rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text' }
					]}
				>
					<html lang="en" />
				</Helmet>
				<Header siteTitle={data.site.siteMetadata.title} />
				<PageTransition
					defaultStyle={{
						transition: 'left 500ms cubic-bezier(0.47, 0, 0.75, 0.72)',
						left: '100%',
						position: 'absolute',
						width: '100%',
					}}
					transitionStyles={{
						entering: { left: '0%' },
						entered: { left: '0%' },
						exiting: { left: '100%' },
					}}
					transitionTime={500}
				>
					{children}
				</PageTransition>
			</>
		)}
	/>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
