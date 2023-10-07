import Realm from "realm";

export class LocalDocument extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  code!: string;
  country_code!: string;
  ticket_cost!: string;
  excess_capacity!: boolean;
  departure_date!: string;
  arrival_date!: string;
  createdAt!: Date;

  //   static schema: Trip;
}

export default LocalDocument;
