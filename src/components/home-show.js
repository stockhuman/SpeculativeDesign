import React from 'react'
import Link from 'gatsby-link'
import { Grid, Row, Col } from 'react-flexbox-grid';

import img from '../assets/bboard.jpg'

const HomeShow = ({data}) => (
	<div>
	<section className="home-show">
		<Grid fluid>
		 <Row>
			{/*About Section */}
			 <Col xs={12} md={6}>
				 <img src={img} alt="Blackboard"/>
			 </Col>
			  <Col xs={12} md={6}>
			 	 <p>{data['about']}</p>
			 	 	<Link to='/projects' className="btn">Projects</Link>
			  </Col>
		 </Row>
	 </Grid>
	</section>
	<footer id="site-footer">

	</footer>
	</div>
)

export default HomeShow
