import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExperienceCard from '../components/ExperienceCard'; // Adjust path if needed

export default function Search() {
  const [experiences, setExperiences] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/experiences`)
      .then(res => setExperiences(res.data.experiences))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const matches = experiences.filter(exp =>
      exp.name.toLowerCase().includes(lowerQuery) ||
      exp.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    setFiltered(matches);
  }, [query, experiences]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search experiences or tags"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(exp => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </div>
      ) : (
        query && <p>No experiences found.</p>
      )}
    </div>
  );
}