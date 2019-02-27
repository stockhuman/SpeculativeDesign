/* @meta
	layout: home
*/

import React from 'react'

import Canvas from '../components/canvas'
// import Caption from '../components/caption'
import Layout from '../components/layouts/home'

// Styles
import '../scss/main.scss'
import '../scss/pages/_home.scss'
// import Fonts from '../scss/style.js'


// const copy = {
// 	about: 'The Speculative Play project brings together the critical practices and forecasting of speculative design with the hands-on experience of play, and especially the play of interactive digital game-like things. The project operates out of the Technoculture, Art, and Games (TAG) Lab in the Milieux Institute for Arts, Culture, and Technology and the Department of Design and Computation Arts at Concordia University in Montréal and is funded by an FRQSC Team Research-Creation grant.'
// }

const IndexPage = () => (
  <Layout>
		<section className="home-intro">
			{/* <Caption interval={80} /> */}
			<div className="title"><h1>Speculative Play</h1></div>
		</section>
    <Canvas />
  </Layout>
)

export default IndexPage
