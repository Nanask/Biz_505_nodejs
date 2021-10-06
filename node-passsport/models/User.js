import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userid: String,
  password: String,
});

const joinSchema = new mongoose.Schema({
  juserid: String,
  jpassword: String,
  je_mail : String,
});

export default mongoose.model("users", userSchema);
export default mongoose.model("join", userSchema);
