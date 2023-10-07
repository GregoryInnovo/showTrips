import React, { useState } from "react";
import Realm from "realm";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { shadows } from "../styles/shadows";
import colors from "../styles/colors";
import { Trip } from "../core/data/Trip";
import UpdateTrip from "../core/presentation/trips/UpdateTrip";

type TripItemProps = {
  task: Trip & Realm.Object;
  onDelete: (el: Trip) => void;
};

interface TripData {
  _id: any;
  name: string;
  code: string;
  country_code: string;
  ticket_cost: string;
  excess_capacity: boolean;
  departure_date: Date;
  arrival_date: Date;
}

export const TripItem = React.memo<TripItemProps>(({ task, onDelete }) => {
  const [canShow, setCanShow] = useState(false);

  const [tripData, setTripData] = useState<TripData>({
    ...task,
    departure_date: new Date(task.departure_date),
    arrival_date: new Date(task.arrival_date),
  });

  return (
    <View>
      <View style={styles.task}>
        <Pressable
          style={[styles.status, tripData.excess_capacity && styles.completed]}
        >
          <Text style={styles.icon}>
            {tripData.excess_capacity ? "✓" : "○"}{" "}
          </Text>
        </Pressable>
        <View style={styles.descriptionContainer}>
          <Text numberOfLines={1} style={styles.description}>
            {tripData.name} |${tripData.ticket_cost}
          </Text>
          <Text numberOfLines={1} style={styles.textDate}>
            {new Date(tripData.departure_date).toDateString()} -{" "}
            {new Date(tripData.arrival_date).toDateString()}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            Code: {tripData.code}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            Country code: {tripData.country_code}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            Excess capacity: {tripData.excess_capacity ? "yes" : "no"}
          </Text>
        </View>
        <View style={styles.deleteButton}>
          <Pressable onPress={() => onDelete(task)}>
            <Text style={styles.deleteText}>✖</Text>
          </Pressable>
          <Pressable onPress={() => setCanShow(!canShow)}>
            <Text style={styles.deleteText}>🖊</Text>
          </Pressable>
        </View>
      </View>
      {canShow && <UpdateTrip tripData={tripData} setTripData={setTripData} />}
    </View>
  );
});

const styles = StyleSheet.create({
  task: {
    height: 150,
    alignSelf: "stretch",
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  description: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 16,
  },
  status: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: "flex-start",
    marginTop: 6,
  },
  textDate: {
    paddingHorizontal: 10,
    color: colors.gray,
    fontSize: 12,
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
