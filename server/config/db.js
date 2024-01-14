import mongoose from "mongoose";
const MONGO_URI =
  "mongodb+srv://adminSecureWhisper:abhi008@for-assignement.ldofykq.mongodb.net/SecureWhisper";

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('connected to database')
  } catch (error) {
    console.log(error);
  }
}

export default connect
