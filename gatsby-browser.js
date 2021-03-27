import React, { Suspense } from 'react'

import { NonsenseProvider } from './src/components/hooks/Nonsense'

// necessary as nonSense hook suspends sometimes while querying for the value.
export const wrapRootElement = ({ element }) => (
	<NonsenseProvider>
		<Suspense fallback={null}>{element}</Suspense>
	</NonsenseProvider>
)
