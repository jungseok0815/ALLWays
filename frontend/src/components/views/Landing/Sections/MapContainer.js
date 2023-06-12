/* eslint-disable  */ 
import React, { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './MapContainer.css';
import axios from "axios";
import  "../../../login/LoginForm";
import { useRecoilState } from 'recoil';
import { userIdState } from '../../../../state/atom';


const MapContainer = ({ searchPlace, userBookmarks, setUserBookmarks }) => {
  const kakao = window.kakao;
  const [Places, setPlaces] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const mapRef = useRef(null);
  const responseDataRef = useRef(null);
  const [userId, setUserId] = useRecoilState(userIdState);
 
 

  const navigate = useNavigate();
  
  const handleBookmark = (item,responseData) => {
    const confirmation = window.confirm('즐겨찾기에 추가하시겠습니까?');
    console.log(userId);
    const userid = {userid:userId};
    console.log(userid);

    responseDataRef.current = responseData;
    if (confirmation) {
      
      const updatedBookmarks = [...bookmarks, item];
      setBookmarks(updatedBookmarks);
      const mapData = {...item, ...userid};
      console.log(mapData);

        // POST 요청을 보내고 엔드포인트에 updatedBookmarks를 전달
      axios.post('http://localhost:8080/api/bookMarks',mapData )
      .then(response => {
       console.log('Bookmarks saved successfully');
       alert("즐겨찾기가 추가 되었습니다.");
      })
      .catch(error => {
        console.error('Error saving bookmarks:', error);
      });

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
        setPlaces(data);
      }
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
    <div className="mrcontainer">
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      <div className="result-container">
        {Places.map((item, i) => (
          <div key={i} className="search-result-item">
            <div className="search-result-content">
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div className="resultname">
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <div className="resultname">
                <span>{item.phone}</span>
              </div>
              <div className="resultbtn">
                <button onClick={() => handleBookmark(item)}>즐겨찾기</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
 export default MapContainer;
