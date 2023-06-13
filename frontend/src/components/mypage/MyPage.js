import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userIdState } from "../../state/atom";
import "./mypage.css";
import "../login/LoginForm";
import logoImage from "../mapproject.png";

const MyPage = () => {
  //const [bookMark,setBookmark]= useRecoilState(bookmarkState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [bookMark, setbookMark] = useState(null);
  const [marker2, setmaker2] = useState([]);
  const mapRef = useRef(null);

  const [review, setReview] = useState(null);
  const [selectedReviewIndices, setSelectedReviewIndices] = useState([]);
  const [reviewplacename, setReviewPlacename] = useState(null);

  const handleGoToHomePage = () => {
    if (currentPage !== "landing") {
      const session = localStorage.getItem("session");
      if (session) {
        setCurrentPage("landing");
      } else {
        navigate("/loginform");
      }
    }
  };

  const handleGoToMyPage = (event) => {
    event.preventDefault();
    navigate("/mypage", { replace: true });
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/api/logout")
      .then(() => {
        setUserId(null);
        localStorage.setItem("session", "");
        navigate("/", { replace: true }); // 리다이렉션 수행
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        alert("로그아웃에 실패했습니다.");
      });
  };

  // bookMark가 null이 아닌 경우에만 length 출력
  //console.log(bookMarkLenght);
  const deleteBookmark = async (bookMark) => {
    const confirmation = window.confirm(
      bookMark.place_name + " 항목을 즐겨찾기에 삭제하시겠습니까?"
    );
    try {
      if (confirmation === true) {
        const deleteBookmark = await axios.get(
          `http://localhost:8080/api/deletebookmark?place_name=${bookMark.place_name}&userId=${userId}`
        );
        console.log(deleteBookmark);
        if (deleteBookmark.data === true) {
          window.location.reload();
          alert(bookMark.place_name + "항목 삭제가 완료되었습니다.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBookMark = async () => {
      try {
        const userInfoResponse = await axios.get(
          `http://localhost:8080/api/userInfo?value=${userId}`
        );
        setbookMark(userInfoResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookMark();
  }, [userId]);

  useEffect(() => {
    const positionsArray = [];
    const bookMarkLenght = bookMark && bookMark.length;

    const mapOptions = {
      center: new window.kakao.maps.LatLng(37.715133, 126.734086),
      level: 12,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
    mapRef.current.map = map;
    for (let i = 0; i < bookMarkLenght; i++) {
      const positions = {
        title: bookMark[i].address_name,
        latlng: new window.kakao.maps.LatLng(bookMark[i].y, bookMark[i].x),
      };
      //console.log(bookMark[i].x);
      positionsArray.push(positions);
    }
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
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

  //해당 지역으로 이동하는 코드
  const handleMoveToLocation = (bookmark) => {
    const { x, y } = bookmark;
    const moveLatLng = new window.kakao.maps.LatLng(y, x);
    if (mapRef.current) {
      const map = mapRef.current.map;
      map.panTo(moveLatLng);
      map.setLevel(2);
    }
  };

  const handleReviewClick = (index) => {
    setSelectedReviewIndices((prevIndices) => {
      // 이미 선택된 인덱스라면 제거합니다.
      if (prevIndices.includes(index)) {
        return prevIndices.filter((idx) => idx !== index);
      } else {
        // 새로운 인덱스를 추가합니다.
        return [...prevIndices, index];
      }
    });
  };
  const handleReviewSave = (index) => {
    const reviewData = bookMark[index].place_name;
    console.log(review, userId, reviewData);
    axios
      .post("http://localhost:8080/api/review", {
        review,
        userId,
        reviewData,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <nav className="navbar">
          <div className="navbar-left">
            <a
              href="/welcome"
              className="logo-link"
              onClick={handleGoToHomePage}
            >
              <img src={logoImage} alt="Allways Logo" className="logo" />
              <span className="site-name" onClick={handleGoToHomePage}>
                Allways
              </span>
            </a>
          </div>
          <div className="navbar-right">
            <a
              href="/mypage"
              className="mypage-link"
              onClick={handleGoToMyPage}
            >
              마이페이지
            </a>
          </div>
          <div className="navbar-right">
            <a href="/" className="logout" onClick={handleLogout}>
              로그아웃
            </a>
          </div>
        </nav>
      </div>
      <div>
        <h3 className="fv-list">즐겨찾기 항목</h3>
        <div className="mrcontainer">
          <div className="map-container">
            <div ref={mapRef} className="map" />
            {bookMark && bookMark.length > 0 ? (
              <div className="result-container">
                {bookMark.map((bookMark, index) =>
                  selectedReviewIndices.includes(index) ? (
                    <div className="textarea-item">
                      <textarea
                        type="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                      <button onClick={() => handleReviewSave(index)}>
                        저장
                      </button>
                      <button onClick={() => handleReviewClick(index)}>
                        리뷰 닫기
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div key={index} className={`search-result-item`}>
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
                        <div className="resultbtn">
                          <button
                            onClick={() => handleMoveToLocation(bookMark)}
                          >
                            이동
                          </button>
                          <button onClick={() => handleReviewClick(index)}>
                            리뷰 작성
                          </button>
                          <button onClick={() => deleteBookmark(bookMark)}>
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>즐겨찾기한 지역이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
