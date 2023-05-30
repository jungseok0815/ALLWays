import React, { useState } from 'react';
import axios from 'axios';

function FavoriteForm() {
  const [id, setid] = useState('');
  const [favorites, setfavorites] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/favorite', { id, favorites });
      console.log(response.data);
    } catch (error) {
      console.error('Error posting favorite:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input
          type="text"
          value={id}
          onChange={(e) => setid(e.target.value)}
        />
      </label>
      <label>
        Favorite:
        <input
          type="text"
          value={favorites}
          onChange={(e) => setfavorites(e.target.value)}
        />
      </label>
      <button type="submit">저장하기</button>
    </form>
  );
}

export default FavoriteForm;