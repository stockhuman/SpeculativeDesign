import fonts from '../components/fonts'

// This is such a massive pain for custom fonts, but hey

const style = `
@font-face {
	font-family: 'Uni Neue';
	src: url(${fonts.UniNeueLightWOFF2}) format('woff2'),
		url(${fonts.UniNeueLightWOFF}) format('woff'),
		url(${fonts.UniNeueLightTTF}) format('truetype');
	font-weight: light;
	font-style: normal;
}

@font-face {
	font-family: 'Uni Neue';
	src: url(${fonts.UniNeueHeavyItalicWOFF2}) format('woff2'),
		url(${fonts.UniNeueHeavyItalicWOFF}) format('woff'),
		url(${fonts.UniNeueHeavyItalicTTF}) format('truetype');
	font-weight: bold;
	font-style: italic;
}
`

export default style
