// index의 container div
const container = document.querySelector(`#container`);

// description 안의 내용담을 것들
const poster = document.querySelector(`.description__poster`);
const infoTitle = document.querySelector(`.description__info__data>h3`);
const span1 = document.querySelector(`.description__info__data :nth-child(2)`);
const span2 = document.querySelector(`.description__info__data :nth-child(3)`);
const span3 = document.querySelector(`.description__info__data :nth-child(4)`);
const span4 = document.querySelector(`.description__info__data :nth-child(5)`);
// const span5 = document.querySelector(`.description__info__data :nth-child(5)`);
const linkBtn = document.querySelector(`#linkBtn`);
const moreInfo = document.querySelector(`.description__moreinfo>p`);


const description = document.querySelector('#description');

// 초기 불러올 데이터의 양 
let firstPage = 1;
let endPage = 5;

// dropdown에 포함할 장소 선언
const svcstatnm = document.querySelector('#SVCSTATNM');
const areanm = document.querySelector('#AREANM');
// dropdown 버튼
const btn = document.querySelector(`#submit`);

function elementcreate(v) {
    // 목록 div 생성
    const div = document.createElement("div");
    // div에 box 클래스 추가.
    div.classList.add("box");

    const img = document.createElement("img");
    img.classList.add("box__img");
    // 행사정보 이미지 추가
    img.setAttribute("src", v.IMGURL);
    div.appendChild(img);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("box__title");
    const h3 = document.createElement("h3");
    // 서비스명
    h3.innerHTML = v.SVCNM;
    const span = document.createElement("span");
    // 소분류명
    span.innerHTML = v.MINCLASSNM;

    titleDiv.appendChild(h3);
    titleDiv.appendChild(span);
    div.appendChild(titleDiv);

    // 결제 방법
    const Payment = document.createElement('span');
    Payment.innerHTML = v.PAYATNM;
    titleDiv.appendChild(Payment);

    // 서비스 상태
    const service = document.createElement('span');
    service.innerHTML = v.SVCSTATNM;
    titleDiv.appendChild(service);

    // 지역명
    const area = document.createElement('span');
    area.innerHTML = v.AREANM;
    titleDiv.appendChild(area);

    // container에 div추가
    container.appendChild(div);

    // div클릭시 html에 있던 숨겨진 상자 안에 나오게하기
    div.addEventListener("click", e => {

        // let growless = container.classList.contains("container");
        let Existence = description.classList.contains("hidden");
        // console.log(Existence);
        if (Existence === true) {
            description.classList.remove("hidden");
            container.classList.add("move");
            container.classList.remove("container");
        };
        // 이미지 변화
        poster.setAttribute("src", v.IMGURL);
        // title
        infoTitle.innerHTML = v.SVCNM;

        // SVCOPNBGNDT : 서비스 시작일시
        // SVCOPNENDDT : 서비스 종료일시
        // span1 : 날짜 -> string 변환후 substring으로 날짜만 표시.
        span1.innerHTML = `${String(v.SVCOPNBGNDT).substring(0, 10)} ~ ${String(v.SVCOPNENDDT).substring(0, 10)}`;

        // span2 : 결재방법
        span2.innerHTML = v.PAYATNM;

        // span3 : 서비스 상태
        span3.innerHTML = v.SVCSTATNM;

        // span4 : 지역명
        span4.innerHTML = v.AREANM;

        // span5 : 예약링크
        linkBtn.setAttribute("href", v.SVCURL);

        // moreInfo : 상세내용
        const DTLCONTNum = v.DTLCONT.indexOf("3.");
        const deleteDT = v.DTLCONT.slice(0, DTLCONTNum);
        const text = v.DTLCONT.replace(deleteDT, "").replace("3.", ">");

        // img 태그 제거하는 정규표현식
        var myRegExp1 = /<IMG(.*?)>/gi;
        const img_remove = text.replace(myRegExp1, "");
        // moreInfo.innerHTML = newtext;
        moreInfo.innerHTML = img_remove;

        // 지도 레이아웃 초기화
        map.relayout();

        // 지도 이동
        panTo(v.Y, v.X);

        // 마커가 표시될 위치입니다 
        var markerPosition = new kakao.maps.LatLng(v.Y, v.X);

        //이전 마커를 지웁니다
        markers.forEach((v, i) => {
            v.setMap(null);
        });

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 생성된 마커를 배열에 추가합니다
        markers.push(marker);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    });

    document.querySelector('#delete').addEventListener('click', (e) => {
        description.classList.add('hidden');
        container.classList.remove("move");
        container.classList.add("container");
    })
};