import { Trip } from "../data/Trip";

// Define the repository
export interface TripRepository {
  //   getTrips(): Promise<Trip[]>; // Get all trips list
  //   getTrips(): Trip; // Get all trips list
  getAllMockTrips(): Promise<Trip[]>;
}
