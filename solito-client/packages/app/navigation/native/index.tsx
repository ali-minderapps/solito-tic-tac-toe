import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChooseModeScreen } from 'app/features/game/choose-mode'
import { MultiPlayerScreen } from 'app/features/game/multiplayer'

import { HomeScreen } from '../../features/home/main'
import { UserDetailScreen } from '../../features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  'choose-mode': undefined
  multiplayer: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen
        name="choose-mode"
        component={ChooseModeScreen}
        options={{
          title: 'Choose Mode',
        }}
      />
      <Stack.Screen
        name="multiplayer"
        component={MultiPlayerScreen}
        options={{
          title: 'MultiPlayer',
        }}
      />
    </Stack.Navigator>
  )
}
