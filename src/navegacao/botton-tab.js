import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../telas/home';
import Perfil from '../telas/perfil';
import Tarefas from '../telas/tarefas';
// import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function GestaoTarefas() {
  return (

    // <Tab.Navigator screenOptions={{
    //   tabBarShowLabel: false,
    // }}>

    //   <Tab.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="home" size={size} color={color} />

    //       ),
    //     }}
    //   />

    //   <Tab.Screen
    //     name="Tarefas"
    //     component={Tarefas}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="list" size={size} color={color} />
    //       ),
    //     }}
    //   />

    //   <Tab.Screen
    //     name="Perfil"
    //     component={Perfil}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="person" size={size} color={color} />

    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="Perfil" component={Perfil} />

    </Tab.Navigator>
  );
}

export default GestaoTarefas;