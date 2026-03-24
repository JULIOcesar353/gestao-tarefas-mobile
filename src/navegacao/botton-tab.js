import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../telas/home';
import Perfil from '../telas/perfil';
import Tarefas from '../telas/tarefas';
import historico from '../telas/historico';

const Tab = createBottomTabNavigator();

function GestaoTarefas() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Historico" component={historico} />
    </Tab.Navigator>
  );
}

export default GestaoTarefas;