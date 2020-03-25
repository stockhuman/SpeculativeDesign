import React, { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../data/useLocalStorage'

export const nonsenseContext = createContext()

export const NonsenseProvider = props => {
	const [nonsense, setNonsense] = useLocalStorage('nonsense', true)
	return (
		<nonsenseContext.Provider value={[nonsense, setNonsense]}>
			{props.children}
		</nonsenseContext.Provider>
	)
}

export function useNonsense () {
	const context = useContext(nonsenseContext)
	const [ nonsenseValue, setNonsense ] = context
	const toggleNonsense = useCallback(() => {
		if (nonsenseValue) setNonsense(false)
		else setNonsense(true)
	}, [nonsenseValue])
	return {
		nonsense: nonsenseValue,
		toggleNonsense
	}
}
