import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
	<div
		style={{
			background: '#FAFAFA',
			marginBottom: '1.45rem',
		}}
	>
		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '1.45rem 1.0875rem',
			}}
		>
			<h1 className="title" style={{margin: 0}}>
				<Link
					to="/"
					style={{
						color: '#DDD',
						textDecoration: 'none'
					}}
				>
					{siteTitle}
				</Link>
			</h1>
		</div>
	</div>
)

export default Header
