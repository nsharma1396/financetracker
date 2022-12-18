import React, { FC } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { DataTable } from "react-native-paper";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

import { useTheme } from "@/hooks";
import { changeTheme, ThemeState } from "@/store/theme";
import { useTransactions } from "@/context/transactions/useTransactions";

interface ITrackerHomePageProps {}

const ThemeChange = () => {
  const { Common, Fonts, Gutters } = useTheme();
  const dispatch = useDispatch();

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  return (
    <>
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
    </>
  );
};

const ExampleChart = () => {
  return (
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
  );
};

const TrackerHomePage: FC = (props) => {
  const { Fonts, Gutters, Layout } = useTheme();

  const { customTransactions, fetchedTransactions } = useTransactions();

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.colCenter,
        Gutters.smallHPadding,
        Gutters.smallVPadding,
      ]}
    >
      <Text style={Fonts.textLarge}>Fetched Transactions</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Account Type</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title numeric>Balance</DataTable.Title>
          <DataTable.Title numeric>Transaction Type</DataTable.Title>
        </DataTable.Header>

        {fetchedTransactions.map((transaction, index) => {
          const {
            accountType,
            transactionAmount,
            transactionType,
            balance,
            sender,
          } = transaction;
          return (
            <DataTable.Row key={`${sender}_${index}`}>
              <DataTable.Cell>{accountType}</DataTable.Cell>
              <DataTable.Cell numeric>{transactionAmount}</DataTable.Cell>
              <DataTable.Cell numeric>{balance}</DataTable.Cell>
              <DataTable.Cell>{transactionType}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
};

export default TrackerHomePage;
