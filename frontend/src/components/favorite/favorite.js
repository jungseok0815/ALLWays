import React, { useState } from 'react';
import axios from 'axios';

function FavoriteForm() {
  const [userId, setUserId] = useState('');
  const [favorite, setFavorite] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/favorite', { userId, favorite });
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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <label>
        Favorite:
        <input
          type="text"
          value={favorite}
          onChange={(e) => setFavorite(e.target.value)}
        />
      </label>
      <button type="submit">저장하기</button>
    </form>
  );
}

export default FavoriteForm;