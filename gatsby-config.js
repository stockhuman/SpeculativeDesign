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
  		}
  	},
  	'gatsby-transformer-remark'
  ],
  pathPrefix: `/site/sp` // for live.arthem.co/site/sp
}
