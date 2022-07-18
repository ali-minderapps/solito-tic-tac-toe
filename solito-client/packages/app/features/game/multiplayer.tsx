import { GameBoard } from 'app/components/game-board'
import { JoinRoom } from 'app/components/join-room'
import gameContext from 'app/context/gameContext'
import { View } from 'dripsy'
import { useContext } from 'react'

export function MultiPlayerScreen() {
  const { isInRoom } = useContext(gameContext)

  return (
    <View
      sx={{
        flex: 1,
        backgroundColor: '#2E2E2E',
      }}
    >
      {!isInRoom && <JoinRoom />}
      {isInRoom && <GameBoard />}
    </View>
  )
}
