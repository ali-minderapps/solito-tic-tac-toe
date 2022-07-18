import gameContext from 'app/context/gameContext'
import gameService from 'app/services/gameService'
import socketService from 'app/services/socketService'
import { Text, View, Pressable, TextInput, H2 } from 'dripsy'
import { useContext, useState } from 'react'

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
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
      }}
    >
      <H2
        sx={{
          fontWeight: '800',
          color: '#fff',
          width: 400,
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        Enter ID to create or join room:
      </H2>
      <TextInput
        value={roomId}
        onChangeText={setRoomId}
        sx={{
          fontSize: 20,
          width: 300,
          border: '2px solid #fff',
          borderRadius: 5,
          height: 40,
          color: '#fff',
          padding: '5px',
          marginBottom: '20px',
          outline: 'none',
        }}
      />
      <Pressable
        sx={{
          height: 40,
          width: 140,
          border: '2px solid #fff',
          borderRadius: 10,
          margin: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => onJoinroom()}
      >
        <Text sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          {isJoining ? 'Joining...' : 'Join'}
        </Text>
      </Pressable>
    </View>
  )
}
