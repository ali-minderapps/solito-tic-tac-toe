import React from 'react'

type Score = {
  x: number
  tie: number
  o: number
}

export interface IGameContextProps {
  isInRoom: boolean
  setInRoom: (inRoom: boolean) => void
  playerSymbol: 'x' | 'o'
  setPlayerSymbol: (symbol: 'x' | 'o') => void
  isPlayerTurn: boolean
  setPlayerTurn: (turn: boolean) => void
  isGameStarted: boolean
  setGameStarted: (started: boolean) => void
  score: Score
  setScore: (score: Score) => void
  gameResult: string
  setGameResult: (result: string) => void
}

const defaultState: IGameContextProps = {
  isInRoom: false,
  setInRoom: () => {},
  playerSymbol: 'x',
  setPlayerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  score: {
    x: 0,
    tie: 0,
    o: 0,
  },
  setScore: () => {},
  gameResult: '',
  setGameResult: () => {},
}

export default React.createContext(defaultState)
