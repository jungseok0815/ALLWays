/* eslint-disable  */ 
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapContainer.css';

const MapContainer = ({ searchPlace, userBookmarks, setUserBookmarks }) => {
  const kakao = window.kakao;
  const [Places, setPlaces] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const mapRef = useRef(null);

  const navigate = useNavigate();
  
  const handleBookmark = (item) => {
    const confirmation = window.confirm('즐겨찾기에 추가하시겠습니까?');
    if (confirmation) {
      const updatedBookmarks = [...bookmarks, item];
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (storedBookmarks) {
      setUserBookmarks(storedBookmarks);
    }
  }, []);
  

  useEffect(() => {
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const markers = [];
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(mapRef.current, options);
    const ps = new kakao.maps.services.Places();

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        displayPagination(pagination);
        setPlaces(data);
      }
    }
    

    function displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      const fragment = document.createDocumentFragment();

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
        );
        infowindow.open(map, marker);
      });
    }

    ps.keywordSearch(searchPlace, placesSearchCB);
  }, [searchPlace]);


  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: '60%', height: '500px' }}></div>
      <div className="result-container">
        {Places.map((item, i) => (
          <div key={i} className="search-result-item">
            <h5>{item.place_name}</h5>
            {item.road_address_name ? (
              <div>
                <span>{item.road_address_name}</span>
                <span>{item.address_name}</span>
              </div>
            ) : (
              <span>{item.address_name}</span>
            )}
            <span>{item.phone}</span>
            <button onClick={() => handleBookmark(item)}>즐겨찾기</button>
          </div>
        ))}
      </div>
  
      <div className="pagination-container">
        <div className="pagination" id="pagination"></div>
      </div>
    </div>
  );
  
          };
 export default MapContainer;
