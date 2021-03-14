/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: 'Speculative Play'
  },
  plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		'gatsby-plugin-sharp',
		'gatsby-remark-copy-linked-files',
		'gatsby-transformer-sharp',
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/assets/img/`,
				name: 'images'
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages/`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-remark-images',
			options: {
				maxWidth: 1080,
			},
		}
  ],
	pathPrefix: `/site/sp` // for live.arthem.co/site/sp
	// pathPrefix: `/new` // for staging
}
