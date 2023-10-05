import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ListTrips from "../trips/ListTrips";

type Props = {};

const Menu = (props: Props) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Review a trip</Text>
      <ListTrips />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "sans",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
