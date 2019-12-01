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
		case 'help': return '';
		default: return null;
	}
}
