const Router=require('express')
const sportSchema=require("../models/sportSchema.js");
const bookingSchema=require("../models/bookingSchema.js");

const router = Router();  

// owner routes

// ->For creation
router.post("/owner/create", async (req,res) =>{
    const {label, body, cost, slot_timings} = req.body; 

    try {
        const newSport = new sportSchema({label, body, cost, slot_timings}); 
        await newSport.save(); 
        res.status(201).json({ message: "Sport created successfully!" });

    }
    catch(error) {
        res.status(500).json({ message: "Failed to create sport", error });
    }
}) 


// ->For getting all the data
router.get("/owner/get", async (req, res) => { 
    try {
        const data = await sportSchema.find();
        return res.send(data);
        
        
    } catch (error) {
        console.log(message = "Cannot get the data", error);
    }
});  


// -> For deleting a specific sport item
router.delete("/owner/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await sportSchema.findByIdAndDelete(id); 

        if (!deletedItem) {
            return res.send({ message: "Item not found" }); 
        }

        return res.send({ message: "Item deleted successfully" }); 
    } catch (error) {
        console.log("Cannot delete the data", error);
        return res.send({ message: "Server error" }); 
    }
});


// -> For Booking the slot 
router.get('/booking',async(req,res)=>{
    const { id } = req.params;
    const bookings = await bookingSchema.find(id);
    res.status(201).send(bookings);
})

router.get('/slots/:id',async(req,res)=>{
    const { id } = req.params;
    const slots = await sportSchema.findById(id);
    res.status(201).send(slots);
})
// router.post("/booking/create", async (req, res) => {
//     const { sportId, slot, user } = req.body;
//     try {
//         // Fetch the sport to get its available slots
//         const booking = await bookingSchema.findById(sportId);
//         if (!booking) {
//             return res.status(404).json({ message: "booking not found" });
//         }

//         // Check if the requested slot exists in the sport's slot timings
//         if (!booking.slot.includes(slot)) {
//             return res.status(400).json({ message: "Invalid slot timing" });
//         }

//         // Check if the slot is already booked
//         const existingBooking = await bookingSchema.findOne({ sport: sportId, slot: slot });
//         if (existingBooking) {
//             return res.status(400).json({ message: `Slot ${slot} is already booked!` });
//         }

//         // Create a new booking
//         const newBooking = new bookingSchema({
//             sport: sportId,
//             slot: slot,
//             user: user,
//         });

//         await newBooking.save();
//         res.status(201).json({ message: "Slot booked successfully!" });

//     } catch (error) {
//         res.status(500).json({ message: "Failed to book slot", error });
//     }
// })



router.post("/booking/create", async (req, res) => {
    const { sportId, slot, user } = req.body;

    try {
        // Fetch the sport to check its available slots
        const sport = await sportSchema.findById(sportId).populate("slot_timings"); // Adjust the field based on your sports schema
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Check if the requested slot exists in the sport's slot timings
        if (!sport.slot_timings.includes(slot)) {
            return res.status(400).json({ message: "Invalid slot timing" });
        }

        // Check if the slot is already booked
        const existingBooking = await bookingSchema.findOne({ sport: sportId, slot: slot });
        if (existingBooking) {
            return res.status(400).json({ message: `Slot ${slot} is already booked!` });
        }

        // Create a new booking
        const newBooking = new bookingSchema({
            sport: sportId,
            slot: slot,
            user: user,
        });

        await newBooking.save();
        res.status(201).json({ message: "Slot booked successfully!" });

    } catch (error) {
        console.error("Booking error:", error); // Log error for debugging
        res.status(500).json({ message: "Failed to book slot", error });
    }
});


router.post("/user/booking/create", async (req, res) => {
    const { sportId, slot, user } = req.body;

    try {
        // Fetch the sport to get its available slots
        const sport = await sportSchema.findById(sportId);
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Check if the requested slot exists in the sport's slot timings
        if (!sport.slot_timings.includes(slot)) {
            return res.status(400).json({ message: "Invalid slot timing" });
        }

        // Check if the slot is already booked
        const existingBooking = await bookingSchema.findOne({ sport: sportId, slot: slot });
        if (existingBooking) {
            return res.status(400).json({ message: `Slot ${slot} is already booked!` });
        }

        // Create a new booking
        const newBooking = new bookingSchema({
            sport: sportId,
            slot: slot,
            user: user,
        });

        await newBooking.save();
        res.status(201).json({ message: "Slot booked successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Failed to book slot", error });
    }
});




// -> For getting the slot

router.get("/update-bookings", async (req, res) => {
    try {
        // Fetch sports data
        const response = await fetch("http://localhost:5000/sport/owner/get");
        const sportsData = await response.json();

        // Loop through each sport and update bookings
        for (const sport of sportsData) {
            const { _id: sportId, slot_timings } = sport;

            // Loop through each slot timing
            for (const slot of slot_timings) {
                // Check if the slot is already booked
                const existingBooking = await bookingSchema.findOne({ sport: sportId, slot: slot });

                // If not booked, create a new booking (assuming a placeholder user)
                if (!existingBooking) {
                    const newBooking = new bookingSchema({
                        sport: sportId,
                        slot: slot,
                        user: "Placeholder User" // Replace with actual user info if needed
                    });

                    await newBooking.save();
                }
            }
        }

        res.status(200).json({ message: "Bookings updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update bookings", error });
    }
});

module.exports=router
