import React from 'react'
import fonts from '../components/fonts'

// This is such a massive pain for custom fonts, but hey

const f = `
@font-face {
	font-family: 'Maison Neue Mono';
	src: url(${fonts.MaisonNeueMonoWOFF2}) format('woff2'),
		url(${fonts.MaisonNeueMonoWOFF}) format('woff'),
		url(${fonts.MaisonNeueMonoTTF}) format('truetype');
	font-weight: normal;
	font-style: normal;
}

@font-face {
	font-family: 'Maison Neue Mono';
	src: url(${fonts.MaisonNeueMonoItalicWOFF2}) format('woff2'),
		url(${fonts.MaisonNeueMonoItalicTTF}) format('truetype');
	font-weight: normal;
	font-style: italic;
}
`


const Fonts = () => (
	<style>{f}</style>
)

export default Fonts
