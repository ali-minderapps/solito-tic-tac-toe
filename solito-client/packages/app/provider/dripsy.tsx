import { DripsyProvider, makeTheme } from 'dripsy'
import { useColorScheme } from 'react-native'

const darkColors = {
  $text: '#ffffff',
  $textLight: '#999999',
  $background: '#2E2E2E',
  $green: 'green',
  $red: 'red',
  $primary: '#ffffff',
}

const theme = makeTheme({
  colors: darkColors,
  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  text: {
    h1: {
      fontSize: '$2',
    },
    p: {
      fontSize: '$0',
      mb: '$3',
    },
  },
})

const lightColors = {
  $text: '#1c1c1c',
  $textLight: '#5b5b5b',
  $background: '#f2f2f2',
  $primary: '#2b2b2b',
}

const themeLight = {
  ...theme,
  colors: lightColors,
}

export function Dripsy({ children }: { children: React.ReactNode }) {
  const colorMode = useColorScheme()

  return (
    <DripsyProvider theme={colorMode === 'dark' ? theme : themeLight} ssr>
      {children}
    </DripsyProvider>
  )
}
