import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExampleContainer } from "@/containers";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ExampleContainer}
        options={{
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
