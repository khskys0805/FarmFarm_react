import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { kakao } = window;

const Location = ({ farms, type }) => {
    const navigate = useNavigate();
    console.log(farms);

    useEffect(() => {
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        let map; // map 변수를 let으로 선언
        const geocoder = new kakao.maps.services.Geocoder();

        if (type === 1) {
            // type 1일 때
            const mapOption = {
                center: new kakao.maps.LatLng(37.5642135, 127.0016985), // 지도의 중심좌표
                level: 10 // 지도의 확대 레벨
            };
            map = new kakao.maps.Map(mapContainer, mapOption);

            farms.forEach(farm => {
                console.log(farm.locationFull); // 값 확인
                geocoder.addressSearch(farm.locationFull, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        const marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        const infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="width:150px;text-align:center;padding:6px 0;">${farm.name}</div>`
                        });
                        infowindow.open(map, marker);
                        kakao.maps.event.addListener(marker, 'click', function () {
                            console.log("클릭함! " + farm.fId);
                            navigate(`/farmDetail/${farm.fid}`);
                        });

                        map.setCenter(coords);
                    } else {
                        console.error('Geocoder failed: ' + status);
                    }
                });
            });
        } else if (type === 2) {
            // type 2일 때
            const mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            map = new kakao.maps.Map(mapContainer, mapOption);

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(farms.locationFull, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${farms.name}</div>`
                    });
                    infowindow.open(map, marker);
                    map.setCenter(coords);
                }
            });
        }
    }, [farms, type]);

    const mapStyle = {
        width: "100%",
        maxWidth: type === 1 ? "500px" : "440px",
        height: "250px"
    };

    return (
        <div>
            <div id="map" style={mapStyle}></div>
        </div>
    );
};

export default Location;