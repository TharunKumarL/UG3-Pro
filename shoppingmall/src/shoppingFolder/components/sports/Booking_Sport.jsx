import React, { useEffect, useState } from "react";
import '../css/BookSlot.css'
const BookSlot = ({ sportId }) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        const fetchBookedSlots = async () => {
            try {
                const response = await fetch(`http://localhost:5000/sport/booking/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Booked slots data:", data);
                
                // Extract slot timings from the bookings data
                if (Array.isArray(data)) {
                    const slots = data.filter(booking => booking.sport.toString() === sportId.toString()).map(booking => booking.slot);
                    setBookedSlots(slots); // Set booked slots from the extracted data
                } else {
                    console.error("Expected an array for booked slots, got:", data);
                }
            } catch (error) {
                console.error("Error fetching booked slots:", error);
            }
        };

        const fetchAvailableSlots = async () => {
            try {
                const response = await fetch(`http://localhost:5000/sport/slots/${sportId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Available slots data:", data);
                
                // Ensure the response contains the expected structure
                if (data && data.slot_timings && Array.isArray(data.slot_timings)) {
                    setAvailableSlots(data.slot_timings);
                } else {
                    console.error("Expected an array for available slots, got:", data);
                }
            } catch (error) {
                console.error("Error fetching available slots:", error);
            }
        };

        fetchBookedSlots();
        fetchAvailableSlots();
    }, [sportId]);

    const handleBooking = () => {
        const user = prompt("Enter your username to book the slot:");
        if (!user) return;

        fetch("http://localhost:5000/sport/booking/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sportId, slot: selectedSlot, user })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("Booking response:", data);
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("Slot booked successfully!");
                    setBookedSlots(prev => [...prev, selectedSlot]);
                    setSelectedSlot(null);
                }
            })
            .catch(err => console.error("Error booking slot:", err));
    };

    return (
        <div class="bookslot">
            <h2>Available Slots</h2>
            <ul>
                {availableSlots.map((slot, index) => (
                    <li key={index}>
                        <button
                            style={{
                                backgroundColor: selectedSlot === slot ? "lightblue" : "white",
                                color: bookedSlots.includes(slot) ? "gray" : "black",
                                cursor: bookedSlots.includes(slot) ? "not-allowed" : "pointer"
                            }}
                            disabled={bookedSlots.includes(slot)}
                            onClick={() => !bookedSlots.includes(slot) && setSelectedSlot(slot)}
                        >
                            {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleBooking} disabled={!selectedSlot}>
                Book Slot
            </button>
        </div>
    );
};

export default BookSlot;
