import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ExperienceCard from '../components/ExperienceCard';

const Home = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/experiences`)
        .then(res => setExperiences(res.data.experiences))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            { experiences.map((exp) => (<ExperienceCard key={exp._id} experience={exp}/>)) }
        </div>
    )
}

export default Home