import { Pressable, styled, Text, View } from 'dripsy'
import { useRouter } from 'solito/router'

const Container = styled(View)({
  width: '100%',
  position: 'absolute',
  top: 0,
  padding: '20px',
  flexDirection: 'row',
  zIndex: 99,
  justifyContent: 'space-between',
})

const Button = styled(Pressable)({
  borderColor: '$primary',
  borderWidth: '2px',
  borderRadius: '10px',
  padding: '$2',
})

const ButtonTitle = styled(Text)({
  color: '$text',
  fontWeight: '500',
  fontSize: '$3',
})

export function Header({ onRematch }: { onRematch?: () => void }) {
  const { replace } = useRouter()
  return (
    <Container>
      <Button onPress={() => replace('/')}>
        <ButtonTitle>Home</ButtonTitle>
      </Button>
      {!!onRematch && (
        <Button onPress={onRematch}>
          <ButtonTitle>Rematch!</ButtonTitle>
        </Button>
      )}
    </Container>
  )
}
