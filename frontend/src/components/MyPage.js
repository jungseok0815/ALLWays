import React,{ useEffect, useState,useRef } from 'react';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userIdState } from '../state/atom';

import  "./login/LoginForm";



const MyPage = () => {
  //const [bookMark,setBookmark]= useRecoilState(bookmarkState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [bookMark, setbookMark] = useState(null);
  const [marker2,setmaker2] = useState([]);
  const mapRef = useRef(null);

// bookMark가 null이 아닌 경우에만 length 출력

  //console.log(bookMarkLenght);
 


  useEffect(() => {
    const fetchBookMark = async () => {
      try {
        const userInfoResponse = await axios.get(`http://localhost:8080/api/userInfo?value=${userId}`);
        setbookMark(userInfoResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookMark();
  }, [userId]);
   
 
  useEffect(() => {
    const positionsArray = [];
    const bookMarkLenght=(bookMark && bookMark.length); 

    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.715133, 126.734086),
      level: 13,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

    for(let i=0; i<bookMarkLenght; i++){
      const positions = {
        title: bookMark[i].address_name,
        latlng: new window.kakao.maps.LatLng(bookMark[i].y, bookMark[i].x),
      }
      console.log(bookMark[i].x);
      positionsArray.push(positions);
      
    }
    
    
 
    
    const imageSrc =
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    
    positionsArray.forEach((position) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: position.latlng,
        title: position.title,
        image: markerImage,
      });
    });

    // 다른 지도 관련 작업 수행..
    return () => {
      // 컴포넌트 언마운트 시에 호출되는 클린업 함수
      // 필요에 따라 지도와 관련된 리소스를 정리할 수 있습니다.
    };
    
  }, [bookMark]);

   


  return (
    <div>
      <h3>즐겨찾기 목록:</h3>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
      {bookMark && bookMark.length > 0 ? (
        <ul>
          {bookMark.map((bookMark, index) => (
            <li key={index}>
               
              <h4>{bookMark.place_name}</h4>
              {bookMark.road_address_name ? (
                <div>
                  <span>{bookMark.road_address_name}</span>
                  <span>{bookMark.address_name}</span>
                </div>
              ) : (
                <span>{bookMark.address_name}</span>
              )}
              <span>{bookMark.phone}</span>
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
