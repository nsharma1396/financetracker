import React from "react";
import { Button, SafeAreaView, StatusBar, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StartupContainer } from "@/Containers";
import { useTheme } from "@/Hooks";
import MainNavigator from "./Main";
import { navigationRef } from "./utils";
import useSmsListener from "@/Hooks/useSmsListener";

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const { hasSmsPermissions, requestSmsPermissions, fetchAllMessages } =
    useSmsListener();
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {hasSmsPermissions ? (
        <Button title="Fetch All Messages" onPress={fetchAllMessages} />
      ) : (
        <Button title="Grant Permissions" onPress={requestSmsPermissions} />
      )}
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
