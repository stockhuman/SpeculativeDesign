// a series of captions returned as a soft overlay to the intro
export default function randomCaption () {
	const captions = [
		"The play's the thing, wherein we'll catch ourselves speculating."
	]

	// returns a random caption from the array
	return captions[Math.floor(Math.random() * (captions.length))]
}
