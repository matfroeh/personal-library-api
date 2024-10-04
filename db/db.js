import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  console.log("MongoDB connected to:", db.databaseName);
} catch (error) {
  console.error("MongoDB connection error:", error);
  process.exit(1);
} 
// finally {
//   await mongoose.disconnect();
//   console.log("MongoDB disconnected");
// }
