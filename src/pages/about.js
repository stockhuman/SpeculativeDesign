/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link, withPrefix } from 'gatsby'

// Page Structure
import Page from '../templates/layout/Page'
import Canvas from '../components/canvas/Canvas'
import HUD from '../templates/layout/HUD'

import AboutPage from '../components/canvas/scenes/about'

// Context hook
import { useNonsense } from '../components/hooks/Nonsense'
import { Text } from '@react-three/drei'

// The about page serves to branch the two paths: one to artists and the other
// to projects. This interstitial space also serves to describe the project

// Each branch takes one on a successive journey though each room, project or person.
// the order of each project is determined by alphanumeric sorting, thus the numbered entries.
const aboutText = `The Speculative Play project brings together the critical practices and forecasting of speculative design with the hands-on experience of play, and especially the play of interactive digital game-like things. The project operates out of the Technoculture, Art, and Games (TAG) Lab in the Milieux Institute for Arts, Culture, and Technology and the Department of Design and Computation Arts at Concordia University in Montréal and is funded by an FRQSC Team Research-Creation grant.\n

Speculative design, related to design stances such as critical design and design fiction, takes the position that design can prompt speculation on alternative presents and futures. Speculative design re-imagines invisible and embedded cultural assumptions of how the world is and proposes instead, “How the world could be”, and “Why isn’t the world like this?” Many examples of speculative design concern physical objects, sometimes accompanied by adept social engineering to make them appear real. If speculative design is about inviting people to entertain alternative realities, however, we should consider how speculation is enacted and think through concerns around accessibility of speculative projects.\n

Play has traditionally been one way in which people have felt comfortable in performing speculation and transgressing their day-to-day roles. Interactivity can support the exploratory role of play, but is also dialogic and procedural, inviting us to reflect on the human assumptions that shape technologies.\n

In our work, we draw these classes of designed experience together: We explore the terrain of critical and speculative design in a playful, interactive and participatory manner, demanding interactors to engage, to question, and to be present.\n

Some of the more public activities that we engage in as part of this work that you should look out for are design jams and rapid prototyping sessions, casting calls, playtests, and exhibitions.`

const About = () => {
	const { nonsense } = useNonsense()

	const firstProject = '/projects/it-is-as-if-you-were-doing-work'
	const firstPerson = '/people/agustina-isidori'
	const bibliography = '/bibliography'

	// The stop nonsense button
	if (!nonsense) {
		return (
			<Page title="about">
				<main className="page">
					<article>
						<Link to={firstPerson} className="nn-nav">
							Who's here
						</Link>
						<Link to={firstProject} className="nn-nav">
							Check out projects
						</Link>
						<Link to={bibliography} className="nn-nav">
							Bibliography
						</Link>
						<h1>About</h1>
						<div>{aboutText}</div>
						<div className="nn-grid">
							<img
								src={withPrefix('/img/IMG_6839.jpg')}
								style={{ width: '100%' }}
							/>
						</div>
					</article>
				</main>
				<HUD />
			</Page>
		)
	}

	return (
		<Page title="about">
			<main id="viewport">
				<Canvas center={[0, 1.3, 0]} background={'#081529'}>
					<Text
						maxWidth={4}
						fontSize={0.2}
						font={withPrefix('/fonts/UniNeue-HeavyItalic.woff')}
					>
						<meshNormalMaterial depthWrite={false} depthTest={false} side={2} />
						{aboutText}
					</Text>
					<AboutPage />
				</Canvas>
			</main>
			<HUD />
		</Page>
	)
}

export default About
