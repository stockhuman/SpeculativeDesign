import React from 'react'
import Link from 'gatsby-link'

import ProjectsContainer from '../components/projects/projects-container'


const ProjectsPage = () => (
	<div id="projects">
		<h1>projects</h1>
	  <div className="container" style={{position:'fixed', top: '0', left: '0', zIndex: '-2'}}>
			<ProjectsContainer />
	  </div>
	  <div className="content" style={{position:'fixed', top: '0', left: '0', zIndex: '-2'}}>
		  <h4 className="location"></h4>
		  <div className="slides">
		  	<div className="slide">
		  		<h2 className="slide__name">Test<br/>Test</h2>
		  		<h3 className="slide__title">
		  			<span>&ldquo;Understanding Life&rdquo;</span>
		  			<div className="slide__number">Room <strong>Tenjin</strong></div>
		  		</h3>
		  		<p className="slide__date">25 Mar – 11 May 2017</p>
		  	</div>
		  	<div className="slide">
		  		<h2 className="slide__name">Aiko <br/>Akiyama</h2>
		  		<h3 className="slide__title">
		  			<span>&ldquo;Faces of Peace&rdquo;</span>
		  			<div className="slide__number">Room <strong>Suijin</strong></div>
		  		</h3>
		  		<p className="slide__date">31 Mar – 25 Apr 2017</p>
		  	</div>
		  	<div className="slide">
		  		<h2 className="slide__name">Misako <br/>Shiraishi</h2>
		  		<h3 className="slide__title">
		  			<span>&ldquo;Instant Gratification&rdquo;</span>
		  			<div className="slide__number">Room <strong>Izanami</strong></div>
		  		</h3>
		  		<p className="slide__date">4 Apr – 30 Apr 2017</p>
		  	</div>
		  	<div className="slide">
		  		<h2 className="slide__name">Tadashi <br/>Takayama</h2>
		  		<h3 className="slide__title">
		  			<span>&ldquo;Facts of Blossoms&rdquo;</span>
		  			<div className="slide__number">Room <strong>Raijin</strong></div>
		  		</h3>
		  		<p className="slide__date">15 Apr – 18 May 2017</p>
		  	</div>
		  	<div className="slide">
		  		<h2 className="slide__name">Etsuko <br/>Hamasaki</h2>
		  		<h3 className="slide__title">
		  			<span>&ldquo;In Loving Memory&rdquo;</span>
		  			<div className="slide__number">Room <strong>Hachiman</strong></div>
		  		</h3>
		  		<p className="slide__date">5 May – 17 Jun 2017</p>
		  	</div>
		  </div>
		  <nav className="nav">
		  	<button className="btn btn--nav btn--nav-left">
		  		<svg className="nav-icon nav-icon--left" width="42px" height="12px" viewBox="0 0 70 20">
		  			<path className="nav__triangle" d="M52.5,10L70,0v20L52.5,10z"/>
		  			<path className="nav__line" d="M55.1,11.4H0V8.6h55.1V11.4z"/>
		  		</svg>
		  	</button>
		  	<button className="btn btn--nav btn--nav-right">
		  		<svg className="nav-icon nav-icon--right" width="42px" height="12px" viewBox="0 0 70 20">
		  			<path className="nav__triangle" d="M52.5,10L70,0v20L52.5,10z"/>
		  			<path className="nav__line" d="M55.1,11.4H0V8.6h55.1V11.4z"/>
		  		</svg>
		  	</button>
		  </nav>
	  </div>
	</div>
)

export default ProjectsPage

exports.onRouteUpdate = ({ location }) => {
  console.log('new pathname', location.pathname)
}
