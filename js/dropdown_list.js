/**
 * data에서 필터로 사용할 dropdown select 종류를 가져옴
 */
(async () => {
    let json = null;
    try {
        const response = await axios.get(`http://openapi.seoul.go.kr:8088/${KEY}/${dataType}/ListPublicReservationCulture/${firstPage}/${endPage}`);
        json = response.data;
        const listTotalCount = json.ListPublicReservationCulture.list_total_count;
        json = await axios.get(`http://openapi.seoul.go.kr:8088/${KEY}/${dataType}/ListPublicReservationCulture/${firstPage}/${listTotalCount}`);
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

    const { row } = json.data.ListPublicReservationCulture

    // 필터 데이터 가져오기 
    let arr1 = [], arr2 = [];
    let SVCSTATNM = [], AREANM = [];

    // 이름과 같은 내용들 배열에 추가
    row.forEach((v) => {
        arr1.push(v.SVCSTATNM);
        SVCSTATNM = arr1.filter((v, i) => arr1.indexOf(v) === i);

        arr2.push(v.AREANM);
        AREANM = arr2.filter((v, i) => arr2.indexOf(v) === i);
    })

    function name(params, x) {
        // 반복문으로 dropdown태그,value값 추가
        params.forEach((v, i) => {
            const option = document.createElement('option');
            option.setAttribute('value', params[i]);
            option.innerHTML = params[i];
            x.appendChild(option);
        });
    }
    name(SVCSTATNM, svcstatnm);
    name(AREANM, areanm);

    // submit 이벤트
    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault();
        // dropdown value 받아오기
        const chooseSvc = svcstatnm.selectedIndex;
        const chooseAre = areanm.selectedIndex;

        // 선택된 value
        const valueSvc = svcstatnm[chooseSvc].value;
        const valueAre = areanm[chooseAre].value;
        // value와 같은 행사정보 배열 만들기.
        // --선택하세요-- 값은 true로 설정해서 항상 참으로 만든다.
        // 하나만 선택
        const svcArr = row.filter(v => v.SVCSTATNM == valueSvc);
        const areArr = row.filter(v => v.AREANM == valueAre);
        // 두가지선택
        const svcAreArr = row.filter(v => v.SVCSTATNM == valueSvc && v.AREANM == valueAre);
        //index 넘버가 0보다 크면 위의 Arr값 출력하게하기. --> chooseMin > 0 : 선택됨 (기본값 : 0)

        if (chooseSvc > 0) {
            // 기존 출력 박스 삭제
            document.querySelectorAll(`.box`).forEach(v => {
                v.remove();
            });
            // 필터적용된 데이터 생성
            svcArr.forEach(v => elementcreate(v));
            
        } else if (chooseAre > 0) {
            document.querySelectorAll(`.box`).forEach(v => {
                v.remove();
            });
            areArr.forEach(v => elementcreate(v));
        } else if (chooseAre > 0 && chooseSvc > 0) {
            document.querySelectorAll(`.box`).forEach(v => {
                v.remove();
            });
            svcAreArr.forEach(v => elementcreate(v));
        } else if (chooseSvc == 0 || chooseAre == 0) {
            // 둘다 선택안했는데 검색누르면 페이지 새로고침
            location.reload();
        }
    });
})();