import React from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

import { useTheme } from "@/hooks";
import { changeTheme, ThemeState } from "@/store/theme";

const ExampleContainer = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme();
  const dispatch = useDispatch();

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.colCenter,
        Gutters.smallHPadding,
        Gutters.smallVPadding,
      ]}
    >
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>

      <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 6 },
          ]}
        />
      </VictoryChart>
    </ScrollView>
  );
};

export default ExampleContainer;
