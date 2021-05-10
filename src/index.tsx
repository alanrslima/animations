import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Modules from './modules';
import Menu from './menu';
const Stack = createStackNavigator();

export default function App() {
  const getModulesArray = () => {
    const arrModules = [];
    for (let i in Modules) {
      arrModules.push({name: i, component: Modules[i]});
    }
    return arrModules;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        {getModulesArray().map((i) => (
          <Stack.Screen key={i.name} name={i.name} component={i.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
