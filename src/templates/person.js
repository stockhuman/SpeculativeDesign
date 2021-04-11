import React from 'react'
import { graphql, withPrefix } from 'gatsby'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

import Cadre from '../components/canvas/Cadre'
import { Door } from '../components/canvas/Link'
import { Text } from '@react-three/drei'

import { stripHTML } from './layout/util'

export default function Template({ data }) {
	const person = data.markdownRemark.frontmatter
	const html = stripHTML(data.markdownRemark.html)

	return (
		<Page title={person.name}>
			<Viewport
				data={data.markdownRemark}
				images={[person.image]}
				background={'#ebf7f3'}
			>
				<Text
					maxWidth={40}
					fontSize={8}
					font={withPrefix('/fonts/UniNeue-HeavyItalic.woff')}
					position={[0, -15, 0]}
					rotation={[-1, 0, 0]}
				>
					<meshStandardMaterial side={2} color="black" />
					{person.name}
				</Text>
				<Text
					maxWidth={4.5}
					fontSize={0.2}
					color="#0b1121"
					font={withPrefix('/fonts/UniNeue-HeavyItalic.woff')}
				>
					{html}
				</Text>
				<Cadre img={person.image} position={[2, 2, 2]} />
				<Door
					link={person.linkto}
					position={[-5, 0, 0.4]}
					rotation={[Math.random(), Math.random(), Math.random()]}
				/>
				<Door
					link={person.linkfrom}
					position={[5, 0, 3]}
					rotation={[Math.random(), Math.random(), Math.random()]}
				/>
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
