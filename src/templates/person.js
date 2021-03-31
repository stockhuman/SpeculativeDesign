import React from 'react'
import { graphql, withPrefix } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

import Cadre from '../components/canvas/Cadre'
import { Text } from '@react-three/drei'

function stripHTML(html) {
	let tmp = document.createElement('div')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}


export default function Template({ data }) {
	const person = data.markdownRemark
	const html = stripHTML(data.markdownRemark.html)

	return (
		<Page title={person.frontmatter.name}>
			<Viewport
				data={data.markdownRemark}
				images={[person.frontmatter.image]}
				background={'#ebf7f3'}
			>
				<Text
					maxWidth={4.5}
					fontSize={0.2}
					color="#0b1121"
					font={withPrefix('/fonts/UniNeue-HeavyItalic.woff')}
				>
					{html}
				</Text>
				<Cadre img={person.frontmatter.image} position={[2, 2, 2]} />
			</Viewport>
			<HUD />
		</Page>
	)
}

export const personQuery = graphql`
	query PersonByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				name
				image
				linkto
				linkfrom
			}
		}
	}
`
