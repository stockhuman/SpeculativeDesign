/* @meta
	layout: home
*/

import React from 'react'

import HomeCanvas from '../components/canvas/canvas'
import Layout from '../components/layouts/home'

// Styles
import '../scss/main.scss'
import '../scss/pages/_home.scss'
// import Fonts from '../scss/style.js'

const IndexPage = () => (
  <Layout>
    <HomeCanvas scene={{}} />
  </Layout>
)

export default IndexPage
