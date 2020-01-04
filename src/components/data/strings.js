// a series of captions displayed as a greeting in the on-screen console
export function randomCaption () {
	const captions = [
		"The play's the thing, wherein we'll catch ourselves speculating."
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
			return 'Hello there!';
		case 'sup': return 'yo';
		case 'yo': return 'sup';
		case 'help':
			return "Lost? There's always the site name to click on - that'll send you home. Else, each room has interactive areas you can click on to navigate this space. you can click or tap and drag to look about.";
		default: return null;
	}
}
