import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import '../../scss/main.scss'

export default ({ children }) => {

  const data = useStaticQuery(graphql`
		query PageTitleQuery($path: String!) {
			markdownRemark(frontmatter: { path: { eq: $path } }) {
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
		}`
  )

  let pageTitle = data.markdownRemark ? data.markdownRemark.frontmatter.title : null
  const title = pageTitle ? pageTitle : data.site.siteMetadata.title

  return (
  <HelmetProvider>
    <Helmet>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content={''} />
      <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text" />
      <title>{title}</title>
    </Helmet>
    {children}
  </HelmetProvider>
  )
}
