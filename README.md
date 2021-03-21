# Speculative Play
See the `documentation` branch for progress, journal entries and design notes.

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/).

## Install

Make sure that you have the Gatsby CLI program installed:
```sh
npm install --global gatsby-cli
```

And run from your CLI in the downloaded project folder
```sh
npm i
npm start
```
I've elected to use yarn, but the commands are identical. The site is viewable at http://localhost:8000/ by default.

## Adding content
Within `src/pages` are the directories `people` & `projects`, containing easily editable markdown files.

The [frontmatter](https://github.com/cuttlebelle/website/blob/master/content/documentation/what-is-frontmatter.md) at the top of the file describes some metadata essential for building every page:

```md
path: '/projects/the-url'
title: 'the page title'
linkto: '/projects/drift-workshop'
linkfrom: '/about'
linkalt: ''
images: [
	'work/About.png',
	'work/Break.png',
	'work/Login.png',
	'work/Music.png',
	'work/Promotion.png',
	'work/Working_1.png',
	'work/Working_2.png',
]
```

`images` is relative to `static/img/`, for ease of migration & asset management. Note the site's dynamic logos are similarly in `static/logos/`.


`linkto`, `linkfrom` and `linkalt` are paths that populate in page links, forming a circular ring around the website. Specifying these allows for editorial control over the order of what one sees, presuming they're navigating from the home page.

## Deploy

Running the following will create a static build of the site in `/public`, ready for hosting. :)

```sh
npm run build
```

Note that `gatsby-config.js` contains the `pathPrefix` field, which should be set if the site is to be hosted in a sub directory.
