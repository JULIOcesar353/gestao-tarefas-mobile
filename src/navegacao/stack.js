import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../telas/login';
import GestaoTarefas from './botton-tab';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="GestaoTarefas" component={GestaoTarefas} />
    </Stack.Navigator>
  );
}

export default RootStack;