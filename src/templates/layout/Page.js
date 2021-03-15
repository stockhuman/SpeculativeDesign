import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby-link'

import Fonts from '../../scss/style'
import '../../scss/main.scss'

import Menu from './Menu'

export default function Page ({ title, description = '', children }) {
	let pageTitle = title ? `${title} • Speculative Play` : 'Speculative Play'

	return (
		<>
			<Helmet>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta name="description" content={description} />
				<link
					rel="icon"
					href={withPrefix('/icons/favicon.ico')}
					type="image/x-icon"
				/>
				<title>{pageTitle}</title>
				<style>{Fonts}</style>
			</Helmet>
			<Menu />
			<div id="viewport-container">{children}</div>
		</>
	)
}
