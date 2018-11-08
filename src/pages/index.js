/* @meta
	layout: layout
*/

// Styles
import '../scss/main.scss'
import '../scss/pages/_home.scss'
// import Fonts from '../scss/style.js'

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layouts/layout'
import HomeCanvas from '../components/index/HomeCanvas'

const IndexPage = () => (
	<Layout>
		<HomeCanvas />
		<div className="home-blurb">
			<p>Not fucking around, speculative play is an approach to critical design that involves creating interactive digital artifacts that propose to be from a future or an alternate present. When we step into the magic circle of a speculative play experience, we agree we are in that future or alternate present for the time being. The speculative play experience supports us in our imagining, reacts to us in our playing, speaks to us in a low voice about the world outside the magic circle. Within the magic circle, in that other time, we ask questions about the time and place outside the magic circle. Why is it like that when in here is is like this?</p>
		</div>
	</Layout>
)

export default IndexPage
