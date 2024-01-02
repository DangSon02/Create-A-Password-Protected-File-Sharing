"use strict";

import mongoose from "mongoose";

import db from "../config/config.mongodb.js";
const {
  db: { host, name, port },
} = db;

const stringConnect = `mongodb://${host}:${port}/${name}`;

console.log("abc::", stringConnect);

class DataBase {
  constructor() {
    this.connect();
  }

  // connect

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(stringConnect, {
        maxConnecting: 50,
      })
      .then((_) => console.log("Connect MongoDB Is Sucess!!"))
      .catch((err) => console.log("Connect Error!!", err));
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }
}

const instanceDatabase = DataBase.getInstance();

export default instanceDatabase;
