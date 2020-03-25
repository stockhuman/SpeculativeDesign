import React, { useState, createContext } from 'react'

export const nonsenseContext = createContext()

export const nonsenseProvider = props => {
	const [nonsense, setNonsense] = useState(true)
	return (
		<nonsenseContext.Provider value={[nonsense, setNonsense]}>
			{props.children}
		</nonsenseContext.Provider>
	)
}
