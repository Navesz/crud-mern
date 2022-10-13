import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({

  foodName: { 
    type: String, 
    required: true 
  },
  daysSinceIAte: {
    type: Number,
    required: true
  }
});

const FoodModel = mongoose.model('test', FoodSchema)
export default FoodModel