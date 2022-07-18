import gameContext from 'app/context/game-context'
import gameService from 'app/services/gameService'
import socketService from 'app/services/socketService'
import { Text, View, Pressable, TextInput, H2, styled } from 'dripsy'
import { useContext, useState } from 'react'

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const Title = styled(H2)({
  fontWeight: '800',
  color: '$text',
  width: 400,
  textAlign: 'center',
  marginBottom: '50px',
})

const InputView = styled(TextInput)({
  fontSize: 20,
  width: 300,
  borderWidth: '2px',
  borderColor: '$primary',
  borderRadius: 5,
  height: 40,
  color: '$text',
  padding: '5px',
  marginBottom: '20px',
  outline: 'none',
})

const Button = styled(Pressable)({
  height: 40,
  width: 140,
  borderWidth: '2px',
  borderColor: '$primary',
  borderRadius: 10,
  margin: '10px',
  justifyContent: 'center',
  alignItems: 'center',
})

const ButtonTitle = styled(Text)({
  fontSize: '$3',
  color: '$text',
  fontWeight: 'bold',
})

export function JoinRoom() {
  const [roomId, setRoomId] = useState<string>('')
  const [isJoining, setJoining] = useState(false)

  const { setInRoom } = useContext(gameContext)

  const onJoinroom = async () => {
    const socket = socketService.socket
    if (!roomId || roomId.trim() === '' || !socket) return

    setJoining(true)

    const joined = await gameService
      .joinGameRoom(socket, roomId)
      .catch((err) => {
        alert(err)
      })

    if (joined) setInRoom(true)

    setJoining(false)
  }

  return (
    <Container>
      <Title>Enter ID to create or join room:</Title>
      <InputView value={roomId} onChangeText={setRoomId} />
      <Button onPress={() => onJoinroom()}>
        <ButtonTitle>{isJoining ? 'Joining...' : 'Join'}</ButtonTitle>
      </Button>
    </Container>
  )
}
