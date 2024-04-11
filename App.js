// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import MemberDetails from "./screens/MemberDetails";
import MemberList from "./screens/MemberList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MemberList"
          component={MemberList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemberDetails"
          component={MemberDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
