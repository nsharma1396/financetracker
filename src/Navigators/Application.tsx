import React, { useState } from "react";
import { Button, SafeAreaView, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StartupContainer } from "@/containers";
import { useTheme } from "@/hooks";
import MainNavigator from "./Main";
import { navigationRef } from "./utils";
import useSmsListener, { ITransactionData } from "@/hooks/useSmsListener";
import TransactionProvider from "@/context/transactions";

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();
  const { colors } = NavigationTheme;
  const [fetchedTransactions, updateTransactions] = useState<
    ITransactionData[]
  >([]);
  const [customTransactions, updateCustomTransactions] = useState<
    ITransactionData[]
  >([]);
  const { hasSmsPermissions, requestSmsPermissions, fetchAllMessages } =
    useSmsListener(updateTransactions);

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <TransactionProvider
          fetchedTransactions={fetchedTransactions}
          customTransactions={customTransactions}
        >
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
        </TransactionProvider>
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
