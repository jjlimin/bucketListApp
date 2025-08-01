import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddExperience = () => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/experiences`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Experience</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input className="w-full border p-2 rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div>
          <label className="block font-medium">Tags</label>
          <input className="w-full border p-2 rounded" type="text" value={tags} onChange={(e) => setTags(e.target.value)}/>
        </div>
        <div>
          <label className="block font-medium">Image</label>
          <input className="w-full p-2 rounded bg-gray-300 border-dashed border-2" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type='submit'>Add Experience</button>
      </form>
    </div>
  )
}

export default AddExperience