import React from 'react'
import Link, { withPrefix } from 'gatsby-link'

import { useNonsense } from '../../components/hooks/Nonsense'

export default function HUD() {
	const { nonsense, toggleNonsense } = useNonsense()
	const logo = Math.floor(Math.random() * 29)
	return (
		<>
			<Link to="/" id="logo">
				<img src={withPrefix(`/logos/${logo}.png`)} />
				<h1 className="title">Speculative Play</h1>
			</Link>

			<button
				className={`nonsense-btn${nonsense ? ' toggled' : ''}`}
				onClick={toggleNonsense}
			>
				{nonsense ? 'Stop this nonsense': 'Resume nonsense'}
			</button>
			<div className="social-container">
				<a
					href="https://www.facebook.com/profile.php?id=100013471624792"
					className="social-icon"
				>
					<i className="fa fa-facebook">FB</i>
				</a>
				<a href="https://twitter.com/speculativeplay" className="social-icon">
					<i className="fa fa-twitter">TW</i>
				</a>
				<a
					href="https://www.instagram.com/speculativeplay/"
					className="social-icon"
				>
					<i className="fa fa-instagram">IN</i>
				</a>
			</div>
		</>
	)
}
