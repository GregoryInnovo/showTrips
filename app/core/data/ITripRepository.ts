import { api } from "../../utils/api";
import { TripRepository } from "../domain/TripRepository";
import { Trip } from "./Trip";
import { BSON } from "realm";

// Implementation of the repository of Trip
export class ITripRepository implements TripRepository {
  /**
   * GET all the trips for a mock data
   * @returns Array of object Trips
   */
  async getAllMockTrips(): Promise<Trip[]> {
    const res = await fetch(api);
    const jsonData = await res.json();

    return jsonData.map((trip: Trip) => {
      const _id = new BSON.ObjectId();
      return { _id, createdAt: new Date(trip.createdAt), ...trip };
    });
  }

  //   getTrips(): Trip {
  //     return mockData;
  //   }
}
