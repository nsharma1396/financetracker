import { StyleSheet } from "react-native";
import { CommonParams } from "@/theme/theme";

export default function <C>({ Colors, Gutters, Layout }: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  };
  const rounded = {
    ...base,
    borderRadius: 20,
  };

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
}
