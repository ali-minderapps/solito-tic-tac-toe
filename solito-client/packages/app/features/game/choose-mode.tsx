import React from 'react'
import { Text, View, H1, Pressable } from 'dripsy'
import { useRouter } from 'solito/router'

export function ChooseModeScreen() {
  const { push } = useRouter()
  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E2E2E',
      }}
    >
      <H1 sx={{ fontWeight: '800', color: '#fff' }}>Choose mode</H1>
      <Pressable
        sx={{
          height: 40,
          width: 200,
          border: '2px solid #fff',
          borderRadius: 10,
          margin: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => push('/game/multiplayer')}
      >
        <Text sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          Multiplayer
        </Text>
      </Pressable>
      <Pressable
        sx={{
          height: 40,
          width: 200,
          border: '2px solid #fff',
          borderRadius: 10,
          margin: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => push('/tic-tac-toe/room-id')}
      >
        <Text sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          Single Player
        </Text>
      </Pressable>
      <Pressable
        sx={{
          height: 40,
          width: 200,
          border: '2px solid #fff',
          borderRadius: 10,
          margin: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {}}
      >
        <Text sx={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          Offline
        </Text>
      </Pressable>
    </View>
  )
}
