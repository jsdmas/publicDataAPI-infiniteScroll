var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

function panTo(x, y) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(x, y);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 좌표를 입력하면 주소를 출력하는 함수
function address() {
    searchDetailAddrFromCoords(map.getCenter(), function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var centerAddr = document.getElementById('centerAddr');

            var detailAddr = !!result[0].road_address ? '도로명주소 : ' + result[0].road_address.address_name + '<br />' : '';
            detailAddr += '지번 주소 : ' + result[0].address.address_name;
            console.log(detailAddr);
            centerAddr.innerHTML = detailAddr;
        }
    });
}