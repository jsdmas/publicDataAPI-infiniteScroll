// index의 container div
const container = document.querySelector(`#container`);

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

        // div 클릭 이벤트_메뉴 추가 (toggle를 통한 css 움직임 제어)
    });

}
