import React from 'react'

import Head from './Head'
import '../../scss/main.scss'

export default (props) => (
	<>
		<Head />
		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '0px 1.0875rem 1.45rem',
				paddingTop: 0,
			}}
		>
			{props.children}
		</div>
	</>
)
