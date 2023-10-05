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
  reference_image: string = "http://dummyimage.com/214x100.png/ff4444/ffffff";
  createdAt: Date = new Date();

  static primaryKey = "_id";
}
