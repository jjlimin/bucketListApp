import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ExperienceDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [experience, setExperience] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/experiences/${id}`)
            .then(res => setExperience(res.data.experience))
            .catch(err => console.log(err));
    }, [id]);

    const handleComplete = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/experiences/${id}`, {completed: true});
            setExperience({...experience, completed: true});
        } catch (error) {
            console.log(error);
        }
    }

    if (!experience) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-6">
            <img src={experience.image} alt={experience.name} className="w-full h-64 object-cover rounded" />
            <h1 className="text-2xl font-bold mt-4">{experience.name}</h1>
            <p className="text-gray-600 text-lg mt-2">
                {experience.completed ? '✅ Completed' : '❌ Not Completed'}
            </p>

            {!experience.completed && (
                <button
                    onClick={handleComplete}
                    className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Mark as Completed
                </button>
            )}
        </div>
    )
}

export default ExperienceDetail