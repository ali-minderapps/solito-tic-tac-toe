import GameContext, { IGameContextProps } from 'app/context/gameContext'
import socketService from 'app/services/socketService'
import { useEffect, useState } from 'react'

export const GameProvider = ({ children }) => {
  const [isInRoom, setInRoom] = useState(false)
  const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x')
  const [isPlayerTurn, setPlayerTurn] = useState(false)
  const [isGameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState({
    x: 0,
    tie: 0,
    o: 0,
  })

  const connectSocket = async () => {
    const socket = await socketService
      .connect('http://localhost:9000')
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  useEffect(() => {
    connectSocket()
  }, [])

  const gameContextValue = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
    score,
    setScore,
  }
  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  )
}
