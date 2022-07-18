import GameContext, { IGameContextProps } from 'app/context/game-context'
import socketService from 'app/services/socketService'
import { useEffect, useState } from 'react'

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInRoom, setInRoom] = useState(false)
  const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x')
  const [isPlayerTurn, setPlayerTurn] = useState(false)
  const [isGameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState<{
    x: number
    tie: number
    o: number
  }>({
    x: 0,
    tie: 0,
    o: 0,
  })
  const [gameResult, setGameResult] = useState<string>('')

  const connectSocket = async () => {
    const socket = await socketService
      .connect('http://localhost:9000')
      // .connect('https://solito-tic-tac-toe-server.herokuapp.com')
      .catch((err) => {
        console.log('Error: ', err)
      })
  }

  useEffect(() => {
    connectSocket()
  }, [])

  const gameContextValue: IGameContextProps = {
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
    gameResult,
    setGameResult,
  }
  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  )
}
