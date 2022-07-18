import { View, P, Pressable, Image, H2 } from 'dripsy'
import { useRouter } from 'solito/router'

export function HomeScreen() {
  const { push } = useRouter()
  return (
    <View
      sx={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        p: 16,
        backgroundColor: '#2E2E2E',
      }}
    >
      <Pressable
        sx={{ alignItems: 'center' }}
        onPress={() => push('/game/choose-mode')}
      >
        <Image
          source={{
            uri: 'https://neave.com/assets/images/home/tic-tac-toe.png',
          }}
          alt={''}
          sx={{ width: 200, height: 200, borderRadius: 20, overflow: 'hidden' }}
        />
        <H2 sx={{ color: '#fff', marginBottom: 0 }}>Tic-Tac-Toe</H2>
        <P sx={{ color: '#999999', width: 200, textAlign: 'center' }}>
          Play a retro version of the simple game of X's and O's
        </P>
      </Pressable>
    </View>
  )
}
