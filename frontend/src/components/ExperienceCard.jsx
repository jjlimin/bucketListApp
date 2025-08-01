import React from 'react'
import { Link } from 'react-router-dom'

const ExperienceCard = ({experience}) => {
  return (
    <Link to={`/experiences/${experience._id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={experience.image || 'https://source.unsplash.com/featured/?ice-cream'}
          alt={experience.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevent infinite loop
            e.currentTarget.src = 'https://source.unsplash.com/featured/?ice-cream';
          }}
        />
        <div className="p-4">
            <h2 className="text-xl font-semibold">{experience.name}</h2>
            <p className="text-sm text-gray-600"> {experience.completed ? "✅ Completed" : "❌ Not completed"}</p>
        </div>
      </div>
    </Link>
  )
}

export default ExperienceCard