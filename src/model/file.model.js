"use strict";

import mongoose, { Schema, model } from "mongoose";

const DOCUMENT_NAME = "File";
const COLLECTION_NAME = "Files";

const fileSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    password: String,
    downloadCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, fileSchema);
