const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://soulhacker1254:hemant@cluster0.thwvy4u.mongodb.net/eatmania?retryWrites=true&w=majority';
const mongoDB = async () => {
  try {
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('eatmania');

    const foodItemsCollection = db.collection('food_items');
    const foodItems = await foodItemsCollection.find({}).toArray();

    const foodCategoriesCollection = db.collection('food_categories');
    const foodCategories = await foodCategoriesCollection.find({}).toArray();

    global.food_items = foodItems;
    global.foodCategories = foodCategories;

    console.log('Data retrieved successfully');

    await client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
