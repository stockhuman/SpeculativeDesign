import React from 'react'
import { graphql } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'
import { Text } from '@react-three/drei'

function stripHTML(html) {
	let tmp = document.createElement('div')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

export default function Template({ data }) {
	const fm = data.markdownRemark.frontmatter

	console.log(data)

	const html = stripHTML(data.markdownRemark.html)

	return (
		<Page title={fm.title} description={html}>
			<Viewport data={data.markdownRemark} images={fm.images}>
				<Text maxWidth={4} fontSize={0.2}>
						<meshNormalMaterial
							depthWrite={false}
							depthTest={false}
						/>
					{html}
				</Text>
			</Viewport>
			<HUD />
		</Page>
	)
}

export const projectQuery = graphql`
	query ProjectByPath($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
				room
				linkto
				linkfrom
				linkalt
				images
				sculpture
			}
		}
	}
`
