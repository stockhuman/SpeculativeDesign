import React, { Component } from 'react'
import chinese from './data/chinese'

class PageGenerator extends Component {

	titles (noun) {
		const dict = [
			`10 Ways To Immediately Start Selling ${noun}`,
			`${noun} Made Simple - Even Your Kids Can Do It`,
			`7 Ways To Keep Your ${noun} Growing Without Burning The Midnight Oil`,
			`Why Most People Will Never Be Great At ${noun}`,
			`How To Learn ${noun}`,
			`${noun}: What A Mistake!`,
			`Crafting the perfect ${noun}`,
			`Love, ${noun}`,
			`Ah, sweet`,
			`New wave ${noun}`,
			`The future looks like ${noun}`,
			`Not this again`,
			`${noun}`,
			`presenting: ${noun}`
		]

		return dict[Math.floor(Math.random() * dict.length)]
	}

	title () {
		return this.titles('doot')
	}

	body () {
		return chinese(Math.floor(Math.random() * 2000))
	}

	componentDidMount() {

	}

	render () {
		return (
			<article>
				<h1>{this.title()}</h1>
				<img src="" alt=""/>
				<p>{this.body()}</p>
			</article>
		)
	}
}

export default PageGenerator
