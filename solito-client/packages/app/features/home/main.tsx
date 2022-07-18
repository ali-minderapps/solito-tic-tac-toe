import { View, P, Pressable, Image, H2, styled } from 'dripsy'
import { useRouter } from 'solito/router'

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$background',
})

const ImageView = styled(Image)({
  width: 200,
  height: 200,
  borderRadius: 20,
  overflow: 'hidden',
})

const Title = styled(H2)({
  color: '$text',
  marginBottom: '$0',
})

const Subtitle = styled(P)({
  width: 200,
  textAlign: 'center',
  color: '$textLight',
})

export function HomeScreen() {
  const { push } = useRouter()

  return (
    <Container>
      <Pressable
        sx={{ alignItems: 'center' }}
        onPress={() => push('/game/choose-mode')}
      >
        <ImageView
          source={{
            uri: 'https://neave.com/assets/images/home/tic-tac-toe.png',
          }}
        />
        <Title>Tic-Tac-Toe</Title>
        <Subtitle>
          Play a retro version of the simple game of X's and O's
        </Subtitle>
      </Pressable>
    </Container>
  )
}
