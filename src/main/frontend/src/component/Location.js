import { useEffect } from "react";
const { kakao } = window;

const Location = ({ farms }) => {
    useEffect(() => {
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div
        var mapOption = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985), // 지도의 중심좌표
            level: 10 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        var geocoder = new kakao.maps.services.Geocoder();
        console.log(farms);

        // farms가 이미 JSON 객체라고 가정
        var farmList = farms;

        // farmList를 이용해 필요한 작업 수행
        farmList.forEach(farm => {
            geocoder.addressSearch(farm.locationFull, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    console.log('Address search successful:', result);
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${farm.name}</div>`
                    });
                    infowindow.open(map, marker);
                } else {
                    console.error('Geocoder failed: ' + status);
                }
            });
        });
    }, [farms]);

    return (
        <div>
            <div id="map" style={{width:"500px", height:"250px"}}></div>
        </div>
    );
};

export default Location;
