import { Dripsy } from './dripsy'
import { GameProvider } from './game'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <Dripsy>
        <GameProvider>{children}</GameProvider>
      </Dripsy>
    </NavigationProvider>
  )
}
