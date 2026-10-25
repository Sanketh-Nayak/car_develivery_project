import mongoose from "mongoose";
import { config } from "../src/config";
import { Vehicle } from "../src/models/Vehicle";

async function seed() {
  await mongoose.connect(config.mongoUri);
  const count = await Vehicle.countDocuments();
  if (count > 0) {
    console.log(`Seed skipped: inventory already contains ${count} vehicle(s).`);
  } else {
    await Vehicle.insertMany([
      { make: "Toyota", model: "Corolla", year: 2023, price: 1800000, quantity: 4, description: "Reliable and efficient sedan." },
      { make: "Honda", model: "City", year: 2022, price: 1450000, quantity: 3, description: "Comfortable family sedan." },
      { make: "Hyundai", model: "Creta", year: 2024, price: 1950000, quantity: 2, description: "Modern compact SUV." },
      { make: "Tata", model: "Nexon", year: 2023, price: 1250000, quantity: 0, description: "Currently out of stock." }
    ]);
    console.log("Sample vehicles added.");
  }
  await mongoose.disconnect();
}
seed().catch(async error => { console.error(error); await mongoose.disconnect(); process.exit(1); });