import React,{ useEffect, useState,useRef } from 'react';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userIdState } from '../state/atom';
import  "./login/LoginForm";


const MyPage = () => {
  //const [bookMark,setBookmark]= useRecoilState(bookmarkState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [bookMark, setbookMark] = useState(null);
 
  console.log(bookMark);


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
   
 



  return (
    <div>
      <h3>즐겨찾기 목록:</h3>
     
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
