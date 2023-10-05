import { Trip } from "../data/Trip";
import { TripRepository } from "./TripRepository";

// Use case to admin the Trips
export class TripUseCase {
  private readonly tripRepository: TripRepository;

  constructor(tripRepository: TripRepository) {
    this.tripRepository = tripRepository;
  }

  /**
   * GET all the trips
   * @returns Object Trip[]
   */
  async getAllMockTrips(): Promise<Trip[]> {
    try {
      const trips = await this.tripRepository.getAllMockTrips();

      return trips;
    } catch (error) {
      // Maneja errores aquí (puede lanzar excepciones personalizadas o manejar errores específicos)
      throw new Error("No se pueden obtener los viajes en este momento.");
    }
  }
}
