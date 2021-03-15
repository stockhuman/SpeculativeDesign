import React from 'react'

import { NonsenseProvider } from './src/components/hooks/Nonsense'

export const wrapRootElement = ({ element }) => (
	<NonsenseProvider>{element}</NonsenseProvider>
)
