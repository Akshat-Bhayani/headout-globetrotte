import React, { useState } from 'react';
import destinationApi from '../services/api';

const CreateDestination = () => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        description: '',
        imageUrl: '',
        rating: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await destinationApi.createDestination(formData);
            // Reset form or redirect
            setFormData({
                name: '',
                country: '',
                description: '',
                imageUrl: '',
                rating: 0
            });
            alert('Destination created successfully!');
        } catch (error) {
            alert('Failed to create destination');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Destination Name"
                required
            />
            <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                required
            />
            <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
            />
            <button type="submit">Create Destination</button>
        </form>
    );
};

export default CreateDestination; 