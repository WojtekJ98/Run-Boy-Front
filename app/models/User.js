import mongoose, { model, models, Schema } from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowecase: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cartitem: {
    type: Schema.Types.ObjectId,
    ref: "CartItem",
    default: null,
  },
  favoriteitem: {
    type: Schema.Types.ObjectId,
    ref: "FavoriteItem",
    default: null,
  },
});

export const User = models?.User || model("User", UserSchema);
