// This is such a massive pain for custom fonts, but hey

import { withPrefix } from 'gatsby-link'

const UniNeueLightTTF = withPrefix('/fonts/UniNeue-Light.ttf')
const UniNeueLightWOFF = withPrefix('/fonts/UniNeue-Light.woff')
const UniNeueLightWOFF2 = withPrefix('/fonts/UniNeue-Light.woff2')

const UniNeueHeavyItalicTTF = withPrefix('/fonts/UniNeue-HeavyItalic.ttf')
const UniNeueHeavyItalicWOFF = withPrefix('/fonts/UniNeue-HeavyItalic.woff')
const UniNeueHeavyItalicWOFF2 = withPrefix('/fonts/UniNeue-HeavyItalic.woff2')

const style = `
@font-face {
	font-family: 'Uni Neue';
	src: url(${UniNeueLightWOFF2}) format('woff2'),
		url(${UniNeueLightWOFF}) format('woff'),
		url(${UniNeueLightTTF}) format('truetype');
	font-weight: light;
	font-style: normal;
}

@font-face {
	font-family: 'Uni Neue';
	src: url(${UniNeueHeavyItalicWOFF2}) format('woff2'),
		url(${UniNeueHeavyItalicWOFF}) format('woff'),
		url(${UniNeueHeavyItalicTTF}) format('truetype');
	font-weight: bold;
	font-style: italic;
}
`

export default style
