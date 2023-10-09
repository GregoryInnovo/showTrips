import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { ITripRepository } from "../../data/ITripRepository";
import { TripUseCase } from "../../domain/TripUseCase";
import { Trip } from "../../data/Trip";
import { useQuery, useRealm } from "@realm/react";
import CreateTrip from "./CreateTrip";
import colors from "../../../styles/colors";
import { TripItem } from "../../../components/TripItem";

const ListTrips = () => {
  const realm = useRealm();
  const trips = useQuery(Trip);
  const [tripsMock, setTripsMock] = useState([]);
  const iTripRepository = new ITripRepository();

  const [showNewTrip, setShowNewTrip] = useState(false);
  const [filteredData, setFilteredData] = useState<Trip[] | null>(null);
  const [search, setSearch] = useState<string>("");
  const deferredSearch = useDeferredValue(search);
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tripService = new TripUseCase(iTripRepository);
    const res = await tripService.getAllMockTrips();
    setTripsMock(res);
  };

  return (
    <View style={styles.listContainer}>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.textForm}>Search:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(el) => {
            if (el.length > 0) {
              const filtertrips: Trip[] = Array.from(
                realm
                  .objects<Trip>("Trip")
                  .filtered(`name CONTAINS[c] "${el}"`),
              );
              setFilteredData(filtertrips);
              setSearch(el);
            } else {
              setSearch("");
            }
          }}
        />

        <Button onPress={() => setShowNewTrip(true)} title="Add Trip" />
        {showNewTrip && <CreateTrip onClose={setShowNewTrip} />}

        {showOnline ? (
          <ListData data={tripsMock} />
        ) : deferredSearch.length > 0 ? (
          <ListData data={filteredData} />
        ) : (
          <ListData data={trips} />
        )}

        <Button
          onPress={() => setShowOnline(!showOnline)}
          title="Show online data"
        />
      </View>
    </View>
  );
};

export default ListTrips;

const ListData = React.memo<any>(({ data }) => {
  const realm = useRealm();

  const deleteTrip = useCallback(
    (el: Trip) => {
      realm.write(() => {
        realm.delete(el);
      });
    },
    [realm],
  );

  return (
    <View style={{ height: 500 }}>
      <FlatList
        data={data}
        keyExtractor={(trip) => trip._id.toString()}
        renderItem={({ item }) => (
          <TripItem trip={item} onDelete={() => deleteTrip(item)} />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
  },
  textForm: { color: colors.light, fontWeight: "bold" },
  input: {
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: colors.light,
    paddingHorizontal: 10,
    borderColor: colors.light,
  },
});
