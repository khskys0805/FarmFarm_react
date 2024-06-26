import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
const { kakao } = window;

const Location = ({ farms, type }) => {
    const navigate = useNavigate();
    useEffect(() => {
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div
        var mapOption = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985), // 지도의 중심좌표
            level: 10 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var geocoder = new kakao.maps.services.Geocoder();
        console.log(farms);


        // farmList를 이용해 필요한 작업 수행
        if (type === 1) {
            farms.forEach(farm => {
                geocoder.addressSearch(farm.locationFull, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        console.log('Address search successful:', result);
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        var infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="width:150px;text-align:center;padding:6px 0;">${farm.name}</div>`
                        });
                        infowindow.open(map, marker);
                        kakao.maps.event.addListener(marker, 'click', function () {
                            console.log("클릭함! " + farm.fId);
                            navigate(`/farmDetail/${farm.fid}`)
                        })
                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    } else {
                        console.error('Geocoder failed: ' + status);
                    }
                });
            });
        }
        else if (type === 2) {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };
            console.log("111111111111111111111111");
            // 지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);
            console.log("22222222222222222222222222");
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();
            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(farms.locationFull, function(result, status) {

                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {

                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${farms.name}</div>`
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
    }, [farms, type]);

    const mapStyle = {
        width: type === 1 ? "500px" : "440px",
        height: "250px"
    };

    return (
        <div>
            <div id="map" style={mapStyle}></div>
        </div>
    );
};

export default Location;
