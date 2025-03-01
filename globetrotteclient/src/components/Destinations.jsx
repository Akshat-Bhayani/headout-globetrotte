import React, { useState, useEffect } from 'react';
import destinationApi from '../services/api';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDestinations();
    }, []);

    const loadDestinations = async () => {
        try {
            const response = await destinationApi.getAllDestinations();
            setDestinations(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load destinations');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="destinations-container">
            {destinations.map(destination => (
                <div key={destination._id} className="destination-card">
                    <img src={destination.imageUrl} alt={destination.name} />
                    <h3>{destination.name}</h3>
                    <p>{destination.country}</p>
                    <p>{destination.description}</p>
                    <div className="rating">Rating: {destination.rating}/5</div>
                </div>
            ))}
        </div>
    );
};

export default Destinations; 