import React from 'react'
import { Helmet } from 'react-helmet'

import Fonts from '../../scss/style'
import '../../scss/main.scss'
import ico from '../../assets/logos/favicon.ico'

import Menu from '../layouts/Menu'

export default ({ title, description = '', children }) => {

  let pageTitle = title ? `${title} • Speculative Play` : 'Speculative Play'

  return (
    <>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content={description} />
      <link rel="icon" href={ico} type="image/x-icon"/>
      <title>{pageTitle}</title>
      <style>{Fonts}</style>
    </Helmet>
      <div id="viewport-container">{children}</div>
      <Menu />
    </>
  )
}
