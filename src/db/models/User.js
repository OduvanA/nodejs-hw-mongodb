import { model, Schema } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks.js";
import { emailRegexp } from "../../constants/index.js";

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, match: emailRegexp},
  password: {type: String, required: true},
},
  { timestamps: true, versionKey: false });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateOptions);

userSchema.post('findOneAndUpdate', handleSaveError);

const UsersCollection = model('user', userSchema);

export default UsersCollection;