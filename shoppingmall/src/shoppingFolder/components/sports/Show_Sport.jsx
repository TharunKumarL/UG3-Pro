import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../../App.css";
import "../css/Show_Sport.css"
import BookSlot from "./Booking_Sport"; // Import the BookSlot component



const Show_Sport = () => {
    const get_data_url = "http://localhost:5000/sport/owner/get";
    const delete_data_url = "http://localhost:5000/sport/owner/delete/";

    const [data, setData] = useState([]);
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [selectedSport, setSelectedSport] = useState(null);  // To track which sport is selected for booking


    useEffect(() => {
        fetch(get_data_url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setIsDataAvailable(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        const confirmation = prompt("Type 'delete' to confirm deletion:");
        if (confirmation === 'delete') {
            fetch(`${delete_data_url}${id}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if (res.ok) {
                        setData(data.filter(item => item._id !== id)); // Update local state
                        alert("Item deleted successfully.");
                    } else {
                        alert("Failed to delete the item.");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleBookingClick = (sportId) => {
        setSelectedSport(sportId);  // Set the selected sport to open booking form
    };

    return (
        <div className="show-sport">
            <div className="sport-items-container">
                {isDataAvailable && data.map((item, index) => (
                    <div key={index} className="sport-item-box">
                        <p>{item["label"]}</p>
                        <hr className="centered-hr" />
                        <p>Price: {item.cost}</p>
                        <button onClick={() => handleDelete(item._id)}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                        <button onClick={() => handleBookingClick(item._id)}>
                            Book Slot
                        </button>
                        {/* Render the BookSlot component if this sport is selected */}
                        {console.log(item._id)}
                        {console.log(selectedSport)}
                        {selectedSport === item._id && (
                            <BookSlot sportId={item._id} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Show_Sport;