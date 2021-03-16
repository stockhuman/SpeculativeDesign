import React, { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const NonsenseContext = createContext()

export const NonsenseProvider = props => {
	const [nonsense, setNonsense] = useLocalStorage('nonsense', true)
	return (
		<NonsenseContext.Provider value={[nonsense, setNonsense]}>
			{props.children}
		</NonsenseContext.Provider>
	)
}

export function useNonsense () {
	const [ nonsenseValue, setNonsense ] = useContext(NonsenseContext)
	const toggleNonsense = useCallback(() => {
		if (nonsenseValue) setNonsense(false)
		else setNonsense(true)
	}, [setNonsense, nonsenseValue])
	return {
		nonsense: nonsenseValue,
		toggleNonsense
	}
}
