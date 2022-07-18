import { GameBoard, initialMatrix } from 'app/components/game-board'
import { JoinRoom } from 'app/components/join-room'
import gameContext from 'app/context/game-context'
import { styled, View } from 'dripsy'
import { useContext } from 'react'
import { Header } from '../../components/header'
import gameService from '../../services/gameService'
import socketService from '../../services/socketService'

const Container = styled(View)({
  flex: 1,
  backgroundColor: '$background',
})

export function MultiPlayerScreen() {
  const { isInRoom, gameResult, setGameResult } = useContext(gameContext)

  const onRematch = () => {
    console.log('onRematch')
    if (socketService.socket) {
      gameService.updateGame(socketService.socket, initialMatrix)
      setGameResult('')
    }
  }

  return (
    <Container>
      <Header {...(gameResult && { onRematch })} />
      {!isInRoom && <JoinRoom />}
      {isInRoom && <GameBoard />}
    </Container>
  )
}
