import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Screen from "./assets/app/screen/screen";
import TodoList from "./assets/app/screen/todoList";
import Done2dos from "./assets/app/screen/done2dos";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
    <Screen style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
       screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'All') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Done') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel : "false",
          header: () =>( null),

          tabBarBackground: () => (
            <View tint="light" intensity={100}  />
          ),    
        })}
       >
        <Tab.Screen name="All" component={TodoList} tabBarShowLabel={false}
 />
        <Tab.Screen name="Done" component={Done2dos} />
      </Tab.Navigator>
        
      </GestureHandlerRootView>
    </Screen>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
