import { BSON } from "realm";

export const mockData = [
  {
    _id: new BSON.ObjectId(),
    name: "Cuito Cuanavale Airport",
    code: "CTI",
    country_code: "AO",
    ticket_cost: "$541.03",
    excess_capacity: true,
    departure_date: "10/3/2023",
    arrival_date: "10/24/2023",
    createdAt: new Date("10/4/2023"),
  },
];
