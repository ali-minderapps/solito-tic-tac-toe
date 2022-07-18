import React from 'react'

export interface IGameContextProps {
  isInRoom: boolean
  setInRoom: (inRoom: boolean) => void
  playerSymbol: 'x' | 'o'
  setPlayerSymbol: (symbol: 'x' | 'o') => void
  isPlayerTurn: boolean
  setPlayerTurn: (turn: boolean) => void
  isGameStarted: boolean
  setGameStarted: (started: boolean) => void
  score: {
    x: number
    tie: number
    o: number
  }
  setScore: () => void
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
}

export default React.createContext(defaultState)
