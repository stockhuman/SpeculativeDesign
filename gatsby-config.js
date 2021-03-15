/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: 'Speculative Play'
  },
  plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		'gatsby-remark-copy-linked-files',
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages/`,
				name: 'pages'
			}
		}
  ],
	pathPrefix: `/site/sp` // for live.arthem.co/site/sp
	// pathPrefix: `/new` // for staging
}
