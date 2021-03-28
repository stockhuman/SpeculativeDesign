import React, { useMemo, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Text, Environment } from '@react-three/drei'
import { useAsset } from 'use-asset'

import HUD from './layout/HUD'
import Page from './layout/Page'
import Viewport from './layout/Viewport'

import Cadre from '../components/canvas/Cadre'
import Model from '../components/canvas/Model'


function stripHTML(html) {
	let tmp = document.createElement('div')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

export default function Template({ data }) {
	const fm = data.markdownRemark.frontmatter

	useEffect(() => () => useAsset.clear(), [])

	const html = stripHTML(data.markdownRemark.html)

	const Pictures = () => {
		let pics = []

		const rand = (max, min) => Math.random() * (max - min) + min

		fm.images.forEach((img, i) => {
			pics[i] = {
				src: img,
				key: i,
				pos: [rand(-5, 5), rand(-3, 2), -1.5],
				rot: [rand(-5, 5), rand(-5, 5), 0],
				animated: true,
			}
		})

		console.log(pics)

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
			<Viewport data={data.markdownRemark} images={fm.images}>
				<Text maxWidth={4.5} fontSize={0.2}>
					<meshNormalMaterial depthWrite={false} depthTest={false} side={2} />
					{html}
				</Text>
				<Environment preset="sunset" />
				{fm.sculpture ? <Model url={`/sculptures/${fm.sculpture}`} /> : null}
				{pics}
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
