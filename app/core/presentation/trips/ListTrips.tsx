import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TaskItem } from "../../../components/TaskItem";
import { mockData } from "../../../utils/mockData";

type Props = {};

import { ITripRepository } from "../../data/ITripRepository";
import { TripUseCase } from "../../domain/TripUseCase";

function getSampleBookData() {}

const ListTrips = (props: Props) => {
  const iTripRepository = new ITripRepository();

  console.log(iTripRepository);

  const [state, set] = useState([]);

  useEffect(() => {
    getData();
    // set(res);
  }, []);

  const getData = async () => {
    let tripService = new TripUseCase(iTripRepository);
    const res = await tripService.getAllMockTrips();
    set(res);
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={state}
        keyExtractor={(trip) => trip._id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            //   onToggleStatus={() => onToggleTaskStatus(item)}
            //   onDelete={() => onDeleteTask(item)}
            // Don't spread the Realm item as such: {...item}
          />
        )}
      />
    </View>
  );
};

export default ListTrips;

const styles = StyleSheet.create({
  listContainer: {
    // flex: 1,
    // justifyContent: "center",
  },
});
