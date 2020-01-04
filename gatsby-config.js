/* eslint-disable no-undef */
module.exports = {
  siteMetadata: {
    title: 'Speculative Play'
  },
  plugins: [
		'gatsby-plugin-sass',
		'gatsby-remark-copy-linked-files',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
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
		},
		'gatsby-transformer-remark'
  ],
	pathPrefix: `/site/sp` // for live.arthem.co/site/sp
	// pathPrefix: `/new` // for staging
}
