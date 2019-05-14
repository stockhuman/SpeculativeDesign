// adapted from `front-matter` module
import { load } from 'js-yaml';

// extract /* @meta [YAML] */ comments
export default function parse(string) {
	const match = /\/\*\s*@meta([\s\S]*?)\*\//.exec(string)

	if (!match) {
		return {
			attributes: {},
			body: string,
		}
	}

	const yaml = match[1].trim()
	const attributes = load(yaml) || {}
	const body = string.substr(match[0].length)
	return {attributes, body, frontmatter: yaml}
}
