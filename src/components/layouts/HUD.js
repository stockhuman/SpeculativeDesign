import React, { Component } from 'react'
import Link from 'gatsby-link'

import Log from '../log'
import Menu from './Menu'

import Logo from '../../assets/logos/22.png'

export default function Sidebar ({intro = null, info = null}) {
	return (
		<>
			<Link to="/" id="logo">
				<img src={Logo} />
				<h1 className="title">Speculative Play</h1>
			</Link>
			<Menu />
			<Log intro={intro} info={info} />
			<div className="social-container">
				<a href="https://www.facebook.com/profile.php?id=100013471624792" className="social-icon">
					<i className="fa fa-facebook">FB</i>
				</a>
				<a href="https://twitter.com/speculativeplay" className="social-icon">
					<i className="fa fa-twitter">TW</i>
				</a>
				<a href="https://www.instagram.com/speculativeplay/" className="social-icon">
					<i className="fa fa-instagram">IN</i>
				</a>
			</div>
		</>
	)
}
