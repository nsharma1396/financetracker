import React, { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useTheme } from "@/hooks";
import { Brand } from "@/components";
import { setDefaultTheme } from "@/store/theme";
import { navigateAndSimpleReset } from "@/navigators/utils";

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  useEffect(() => {
    const init = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 2000)
      );
      setDefaultTheme({ theme: "default", darkMode: null });
      navigateAndSimpleReset("Main");
    };
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={"large"} style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>
        Welcome to React Native financetracker by TheCodingMachine
      </Text>
    </View>
  );
};

export default StartupContainer;
