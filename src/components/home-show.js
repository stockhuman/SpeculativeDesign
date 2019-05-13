import React from 'react'
import Link from 'gatsby-link'

import img from '../assets/bboard.jpg'

const HomeShow = ({data}) => (
	<div>
	<section className="home-show">

		<div className="row">
			<div className="col">
				<img src={img} alt="Blackboard" />
				<p>{data['about']}</p>
			</div>

			<div className="col">
				<Link to='/projects' className="btn">Projects</Link>
				<Link to='/bibliography' className="btn">Bibliography</Link>
				<Link to='/people' className="btn">People</Link>
			</div>
		</div>
	</section>
	<footer id="site-footer">

	</footer>
	</div>
)

export default HomeShow
