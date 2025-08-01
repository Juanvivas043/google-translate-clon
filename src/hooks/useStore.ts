import { AUTO_LANGUAGE } from '../constants'
import { 
    type State, 
    type Action, 
    type Language,
    //type AutoLanguage, 
    type FromLanguage  } from '../type.ts'

import { useReducer } from 'react'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

export function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGE') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage:  action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage:  action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText:  action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: true,
      result:  action.payload
    }
  }

  return state
}


export function useStore () {
    const [{ 
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguage = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGE' })
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload})
    }

    const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload})
    }

    const setFromTextLanguage = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload})
    }

    const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload})
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading, 
        interchangeLanguage,
        setFromLanguage,
        setToLanguage,
        setFromTextLanguage,
        setResult
    }
}