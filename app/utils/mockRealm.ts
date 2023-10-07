import { Realm } from "@realm/react";

async function createMockRealm(schema, data) {
  console.log("Creating mock Realm with schema:", schema);
  console.log("Populating mock Realm with data:", data);
  const config = {
    schema,
    deleteRealmIfMigrationNeeded: true,
    inMemory: true,
    path: "mock.realm",
  };
  try {
    const realm = await Realm.open(config);
    console.log("Successfully created mock Realm:", realm);
    data.forEach((item) => {
      realm.write(() => {
        realm.create(item.name, item, true);
      });
    });
    console.log(realm.objects("Team"), "objects");
    console.log("Finished populating mock Realm with data");
    return realm;
  } catch (error) {
    console.log(error);
  }
}

export default createMockRealm;
