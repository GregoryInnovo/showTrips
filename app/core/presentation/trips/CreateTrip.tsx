import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Platform,
  Pressable,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../../styles/colors";
import { useRealm } from "@realm/react";
import { BSON } from "realm";
interface TripData {
  name: string;
  code: string;
  country_code: string;
  ticket_cost: string;
  excess_capacity: boolean;
  departure_date: Date;
  arrival_date: Date;
}

const CreateTrip = ({ onClose }) => {
  const realm = useRealm();
  const [tripData, setTripData] = useState<TripData>({
    name: "",
    code: "",
    country_code: "",
    ticket_cost: "",
    excess_capacity: false,
    departure_date: new Date(),
    arrival_date: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDP, setShowDP] = useState(false);

  const handleInputChange = (
    fieldName: keyof TripData,
    value: string | boolean | Date,
  ) => {
    setTripData({
      ...tripData,
      [fieldName]: value,
    });
  };

  // save a new Trip
  const handleSubmit = () => {
    if (
      tripData.name.trim() === "" ||
      tripData.code.trim() === "" ||
      tripData.country_code.trim() === "" ||
      tripData.ticket_cost.trim() === ""
    ) {
      Alert.alert("Please, fill all the fields.");
      return;
    }

    realm.write(() => {
      realm.create("Trip", {
        _id: new BSON.ObjectId(),
        name: tripData.name,
        code: tripData.code,
        country_code: tripData.country_code,
        ticket_cost: tripData.ticket_cost,
        excess_capacity: tripData.excess_capacity,
        departure_date: tripData.departure_date.toString(),
        arrival_date: tripData.arrival_date.toString(),
      });
    });
    onClose(false);
  };

  return (
    // <View style={{ height: "100%", flexDirection: "column", flex: }}>
    <View>
      <Text style={styles.textForm}>Name:</Text>
      <TextInput
        style={[styles.input, { color: colors.light }]}
        onChangeText={(text) => handleInputChange("name", text)}
        value={tripData.name}
      />

      <Text style={styles.textForm}>Code:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("code", text)}
        value={tripData.code}
      />

      <Text style={styles.textForm}>Country code:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("country_code", text)}
        value={tripData.country_code}
      />

      <Text style={styles.textForm}>Ticket cost:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleInputChange("ticket_cost", text)}
        value={tripData.ticket_cost}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <Text style={styles.textForm}>Exceso de capacidad:</Text>
        <Switch
          value={tripData.excess_capacity}
          onValueChange={() =>
            handleInputChange("excess_capacity", !tripData.excess_capacity)
          }
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.textForm}>Departure date:</Text>
        <Pressable
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: colors.light }}>
            {tripData.departure_date.toDateString()}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            testID="departure_date"
            value={tripData.departure_date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(ev, selectedDate) => {
              const currentDate = selectedDate || tripData.departure_date;
              setShowDatePicker(Platform.OS === "ios");
              setTripData({
                ...tripData,
                departure_date: currentDate,
              });
            }}
          />
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.textForm}>Arrival date:</Text>
        <Pressable style={styles.dateInput} onPress={() => setShowDP(true)}>
          <Text style={{ color: colors.light }}>
            {tripData.arrival_date.toDateString()}
          </Text>
        </Pressable>
        {showDP && (
          <DateTimePicker
            testID="arrival_date"
            value={tripData.arrival_date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(ev, selectedDate) => {
              const currentDate = selectedDate || tripData.arrival_date;
              setShowDP(Platform.OS === "ios");
              setTripData({
                ...tripData,
                arrival_date: currentDate,
              });
            }}
          />
        )}
      </View>

      <Button title="Save" onPress={handleSubmit} />
      <Button title="Close" onPress={() => onClose(false)} />
    </View>
  );
};

export default CreateTrip;

const styles = StyleSheet.create({
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
  dateInput: {
    justifyContent: "center",
    borderColor: colors.light,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: 150,
  },
  datePicker: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textForm: { color: colors.light, fontWeight: "bold" },
  switchPanel: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    // ...shadows,
  },
  switchPanelText: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
});
