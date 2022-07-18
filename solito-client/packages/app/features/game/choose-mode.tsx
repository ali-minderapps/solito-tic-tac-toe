import React from 'react'
import { Text, View, Pressable, styled, H2 } from 'dripsy'
import { useRouter } from 'solito/router'
import { Header } from '../../components/header'

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$background',
})

const Title = styled(H2)({
  color: '$text',
  fontWeight: '800',
})

const Button = styled(Pressable)({
  height: 40,
  width: 200,
  borderWidth: '2px',
  borderColor: '$primary',
  borderRadius: 10,
  margin: '10px',
  justifyContent: 'center',
  alignItems: 'center',
})

const ButtonTitle = styled(Text)({
  fontSize: '$2',
  color: '$text',
  fontWeight: 'bold',
})

export function ChooseModeScreen() {
  const { push } = useRouter()
  return (
    <Container>
      <Header />
      <Title>Choose mode</Title>
      <Button onPress={() => push('/game/multiplayer')}>
        <ButtonTitle>Multiplayer</ButtonTitle>
      </Button>
      <Button onPress={() => push('/tic-tac-toe/room-id')}>
        <ButtonTitle>Single Player</ButtonTitle>
      </Button>
      <Button onPress={() => {}}>
        <ButtonTitle>Offline</ButtonTitle>
      </Button>
    </Container>
  )
}
