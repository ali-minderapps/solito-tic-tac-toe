import { GameBoard } from 'app/components/game-board'
import { JoinRoom } from 'app/components/join-room'
import gameContext from 'app/context/game-context'
import { View } from 'dripsy'
import { useContext } from 'react'
import { Header } from '../../components/header'

export function SinglePlayerScreen() {
  const { isInRoom } = useContext(gameContext)

  const getCPUTurn = () => {
    // const emptyIndexes = []
    // board.forEach((row, arrayIndex) => {
    //   row.forEach((cell, index) => {
    //     if (cell === '') {
    //       emptyIndexes.push({ arrayIndex, index })
    //     }
    //   })
    // })
    // const randomIndex = Math.floor(Math.random() * emptyIndexes.length)
    // return emptyIndexes[randomIndex]
  }

  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: '#2E2E2E',
      }}
    >
      <Header />
      {!isInRoom && <JoinRoom />}
      {isInRoom && <GameBoard />}
    </View>
  )
}
