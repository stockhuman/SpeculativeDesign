module.exports = {
  siteMetadata: {
    title: 'Speculative Play'
  },
  plugins: [
  	'gatsby-plugin-react-helmet',
  	'gatsby-plugin-sass',
  	{
  		resolve: 'gatsby-source-filesystem',
  		options: {
  			path: `${__dirname}/src/pages/`,
  			name: 'pages'
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/img/`,
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'gatsby-starter-default',
				short_name: 'starter',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/assets/mono.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-transformer-remark',
		'gatsby-plugin-offline',
  ],
  pathPrefix: `/site/sp` // for live.arthem.co/site/sp
}
