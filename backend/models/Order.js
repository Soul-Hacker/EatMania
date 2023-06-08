const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});
async function run(){
    await mongoose.connect('mongodb+srv://soulhacker1254:hemant@cluster0.thwvy4u.mongodb.net/eatmania?retryWrites=true&w=majority');

}
run();

module.exports = mongoose.model('order', OrderSchema)