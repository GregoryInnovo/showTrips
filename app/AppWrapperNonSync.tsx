import React from "react";
import { Trip } from "./core/data/Trip";
import { SafeAreaView, StyleSheet } from "react-native";
import { RealmProvider } from "@realm/react";
import colors from "./styles/colors";
import { AppNonSync } from "./AppNonSync";

// Create Local Document context object.
// const LocalRealmContext = createRealmContext({
//   schema: [Trip],
// });

// Namespace the Local Document context's providers and hooks.
// const {
//   RealmProvider,
//   useRealm: useLocalDocumentRealm,
//   useQuery: di,
// } = LocalRealmContext;

const schemas = [Trip];

export const AppWrapperNonSync = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider schema={schemas}>
        <AppNonSync />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // height: "100%",
    backgroundColor: colors.darkBlue,
    paddingTop: 15,
  },
});
