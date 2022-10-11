// index의 container div
const container = document.querySelector(`#container`);

// description 안의 내용담을 것들
const poster = document.querySelector(`.description__poster`);
const infoTitle = document.querySelector(`.description__info>h3`);
const span1 = document.querySelector(`.description__info__data :nth-child(1)`);
const span2 = document.querySelector(`.description__info__data :nth-child(2)`);
const span3 = document.querySelector(`.description__info__data :nth-child(3)`);
const moreInfo = document.querySelector(`.description__moreinfo>p`);

async function search() {
    let json = null;
    try {
        json = await axios.get(`http://openapi.seoul.go.kr:8088/${KEY}/${dataType}/ListPublicReservationCulture/${firestPage}/${endPage}`);
    } catch (error) {
        console.error(`[Error Code] ${error.code}`);
        console.error(`[Error Message] ${error.message}`);
        let alertMsg = error.message;
        if (error.response !== undefined) {
            const errorMsg = `${error.response.status} error - ${error.response.statusText}`;
            console.error(`[Http status] ${errorMsg}`);
            alertMsg += `${errorMsg}`;
        }
        alert(alertMsg);
        return;
    }
    const { data } = json;

    // 행사 목록 배열
    let festival = data.ListPublicReservationCulture.row;
    // console.log(festival);

    // festival 로 받은 행사 정보를 통해 HTML데이터 생성.
    festival.forEach(v => {
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
        // 대분류명
        span.innerHTML = v.MINCLASSNM;

        titleDiv.appendChild(h3);
        titleDiv.appendChild(span);
        div.appendChild(titleDiv);

        // container에 div추가
        container.appendChild(div);

        // div클릭시 html에 있던 숨겨진 상자 안에 나오게하기
        div.addEventListener("click", e => {
            description.classList.toggle("hidden");

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

            // moreInfo : 상세내용
            const DTLCONTNum = v.DTLCONT.indexOf("3.");
            const deleteDT = v.DTLCONT.slice(0, DTLCONTNum);
            moreInfo.innerHTML = v.DTLCONT.replace(deleteDT, "").replace("3.", ">");


        });
    });


}
