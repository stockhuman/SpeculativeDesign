// a series of captions displayed as a greeting in the on-screen console
export function randomCaption () {
	const captions = [
		"The play's the thing, wherein we'll catch ourselves speculating."
	]

	// returns a random caption from the array
	return captions[Math.floor(Math.random() * (captions.length))]
}

export function loaders () {
	const captions = [
		"Loading...",
		'harnessing the bits',
		'do you have faith?',
		'experiencing real time',
		'building upon the present',
		'moving backwards',
		'loading the preloaders',
		'unloading onto you',
		'involving you in the experience'
	]

	// returns a random caption from the array
	return captions[Math.floor(Math.random() * (captions.length))]
}

// commands from the console
export function commands (command) {
	const c = command.toLowerCase()
	switch (c) {
		case 'hello':
		case 'hola':
		case 'hey':
		case 'hi':
		case 'howdy':
		case 'ciao':
			return 'Hello there!';
		case 'sup': return 'yo';
		case 'yo': return 'sup';
		case 'test': return 'passed.';
		case 'salam': return 'salam!';
		case 'what is this': return 'The Speculative Play project brings together the critical practices and forecasting of speculative design with the hands-on experience of play, and especially the play of interactive digital game-like things. As per what is immediately in front of you, try tapping [info].'
		case 'help':
			return "Lost? There's always the site name to click on - that'll send you home. Else, each room has interactive areas you can click on to navigate this space. you can click or tap and drag to look about.";
		default: return `If I could parse "${command}", one might imagine that I'd have more to say.`;
	}
}

export const about = `The Speculative Play project brings together the critical practices and forecasting of speculative design with the hands-on experience of play, and especially the play of interactive digital game-like things. The project operates out of the Technoculture, Art, and Games (TAG) Lab in the Milieux Institute for Arts, Culture, and Technology and the Department of Design and Computation Arts at Concordia University in Montréal and is funded by an FRQSC Team Research-Creation grant.

Speculative design, related to design stances such as critical design and design fiction, takes the position that design can prompt speculation on alternative presents and futures. Speculative design re-imagines invisible and embedded cultural assumptions of how the world is and proposes instead, “How the world could be”, and “Why isn’t the world like this?” Many examples of speculative design concern physical objects, sometimes accompanied by adept social engineering to make them appear real. If speculative design is about inviting people to entertain alternative realities, however, we should consider how speculation is enacted and think through concerns around accessibility of speculative projects.

Play has traditionally been one way in which people have felt comfortable in performing speculation and transgressing their day-to-day roles. Interactivity can support the exploratory role of play, but is also dialogic and procedural, inviting us to reflect on the human assumptions that shape technologies.

In our work, we draw these classes of designed experience together: We explore the terrain of critical and speculative design in a playful, interactive and participatory manner, demanding interactors to engage, to question, and to be present.

Some of the more public activities that we engage in as part of this work that you should look out for are design jams and rapid prototyping sessions, casting calls, playtests, and exhibitions.`
