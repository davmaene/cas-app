import * as SQLite from "expo-sqlite";

const openDatabase = () => {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("__db_sos_afia.db");
    return db;
};

export const db = openDatabase();