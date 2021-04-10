export function stripHTML(html) {
	// Bail out early in SSR environment
	if (typeof window === 'undefined' || !window.document) {
		return
	}
	let tmp = document.createElement('div')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}
