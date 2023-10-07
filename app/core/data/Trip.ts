import Realm, { BSON } from "realm";

// Define your object model
export class Trip extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  code!: string;
  country_code!: string;
  ticket_cost!: string;
  excess_capacity: boolean = false;
  departure_date!: string;
  arrival_date!: string;
  createdAt: Date = new Date();

  static primaryKey = "_id";
}
