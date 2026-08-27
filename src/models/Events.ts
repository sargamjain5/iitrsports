import mongoose, { Schema, models } from "mongoose";

const EventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event =
  models.Event || mongoose.model("Event", EventSchema);

export default Event;