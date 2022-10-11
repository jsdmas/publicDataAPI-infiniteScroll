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

        // div 클릭 이벤트_메뉴 추가 (toggle를 통한 css 움직임 제어)
    });

        /** 드롭다운 **/

        let arr1 = [], arr2 = [], arr3 = [], arr4 = [] ;
        let MINCLASSNM = [], SVCSTATNM = [], PAYATNM = [], AREANM = [];

        festival.forEach((v) => {
            arr1.push(v.MINCLASSNM);
            MINCLASSNM = arr1.filter((v, i) => arr1.indexOf(v) === i);

            arr2.push(v.SVCSTATNM);
            SVCSTATNM = arr2.filter((v, i) => arr2.indexOf(v) === i);

            arr3.push(v.PAYATNM);
            PAYATNM = arr3.filter((v, i) => arr3.indexOf(v) === i);

            arr4.push(v.AREANM);
            AREANM = arr4.filter((v, i) => arr4.indexOf(v) === i);
        })

        const id1 = document.querySelector('#MINCLASSNM');
        const id2 = document.querySelector('#SVCSTATNM');
        const id3 = document.querySelector('#PAYATNM');
        const id4 = document.querySelector('#AREANM');

        function name(params, x) {
            // 반복문으로 dropdown태그 추가
            params.forEach((v, i) => {
            const option = document.createElement('option');
            option.setAttribute('value', params[i]);

            option.innerHTML = params[i];

            x.appendChild(option);
            });
        }
        name(MINCLASSNM, id1);
        name(SVCSTATNM, id2);
        name(PAYATNM, id3);
        name(AREANM, id4);
}

    // 검색폼의 submit 데이터 가져오기
    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault();

        // 입력된 대상을 가져온다.
        const MINCLASSNM_data = document.querySelector('#MINCLASSNM').value;
        const SVCSTATNM_data = document.querySelector('#SVCSTATNM').value;
        const PAYATNM_data = document.querySelector('#PAYATNM').value;
        const AREANM_data = document.querySelector('#AREANM').value;

        console.log(MINCLASSNM_data);
    });
