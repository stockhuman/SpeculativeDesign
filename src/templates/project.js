import React, { useMemo } from 'react'
import { graphql, withPrefix } from 'gatsby'
import { Text } from '@react-three/drei'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

import Cadre from '../components/canvas/Cadre'
import Model from '../components/canvas/Model'
import Room from '../components/canvas/scenes/room'

function stripHTML(html) {
	let tmp = document.createElement('div')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

export default function Template({ data }) {
	const fm = data.markdownRemark.frontmatter
	const html = stripHTML(data.markdownRemark.html)

	// arranges images listed in markdown as 3D image planes
	const Pictures = () => {
		let pics = []

		const rand = (max, min) => Math.random() * (max - min) + min

		fm.images.forEach((img, i) => {
			pics[i] = {
				src: img,
				key: i,
				pos: [rand(-5, 5), rand(-4, 3), -3],
				rot: [rand(-5, 5), rand(-5, 5), 0],
				animated: true,
			}
		})

		return pics.map((pic) => (
			<Cadre
				img={pic.src}
				position={pic.pos}
				rotation={pic.rot}
				key={pic.key}
				animated={pic.animated}
			/>
		))
	}

	const pics = useMemo(() => Pictures(), [])

	return (
		<Page title={fm.title} description={html}>
			<Viewport data={data.markdownRemark} images={fm.images} background={fm.room}>
				<Text
					maxWidth={4.5}
					fontSize={0.2}
					font={withPrefix(
						'/fonts/UniNeue-HeavyItalic.woff'
					)}
				>
					<meshNormalMaterial depthWrite={false} depthTest={false} side={2} />
					{html}
				</Text>
				{fm.sculpture ? (
					<Model url={`/sculptures/${fm.sculpture}`} position={[-2, 0, 4]} />
				) : null}
				{pics}
				<Room to={fm.linkto} from={fm.linkfrom} />
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
