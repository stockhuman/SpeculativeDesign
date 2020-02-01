import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import Fonts from '../../scss/style'
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
      <title>{title}</title>
      <style>{Fonts}</style>
    </Helmet>
    {children}
  </HelmetProvider>
  )
}
