import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby-link'

import { useNonsense } from '../../components/hooks/Nonsense'
import Fonts from '../../scss/style'
import '../../scss/main.scss'

import Menu from './Menu'

export default function Page({ title, description = '', children }) {
	let pageTitle = title ? `${title} • Speculative Play` : 'Speculative Play'

	const { nonsense } = useNonsense()

	return (
		<>
			<Helmet>
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
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
			<div id="viewport-container" className={nonsense ? '' : 'nn'}>
				{children}
			</div>
		</>
	)
}
