/* eslint-disable */
import React, { useEffect, useState } from 'react';

const MyPage = ({ bookmarks, handleMoveToBookmark }) => {
  return (
    <div>
      <h3>즐겨찾기 목록:</h3>
      {bookmarks && bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>
              <h4>{bookmark.place_name}</h4>
              {bookmark.road_address_name ? (
                <div>
                  <span>{bookmark.road_address_name}</span>
                  <span>{bookmark.address_name}</span>
                </div>
              ) : (
                <span>{bookmark.address_name}</span>
              )}
              <span>{bookmark.phone}</span>
              <button onClick={() => handleMoveToBookmark(bookmark)}>해당 지역으로 이동</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>즐겨찾기한 지역이 없습니다.</p>
      )}
    </div>
  );
};

export default MyPage;