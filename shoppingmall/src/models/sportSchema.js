const mongoose=require("mongoose"); 

const sportDescription = new mongoose.Schema(
    {
        label: {
            type: String, 
            required: true,
        }, 
        body: {
            type: String, 
            required: true,
        },
        cost: {
            type: Number, 
            required: true,
        }, 
        slot_timings: {
            type: [String], 
            required: true,
            validate: {
                validator: function(v) {
                    return v.length > 0; // Ensure there is at least one slot
                },
                message: props => `${props.value} must contain at least one slot!`
            }
        }, 
    }
);

module.exports = mongoose.model('sports', sportDescription);