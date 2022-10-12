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

    const { row } = json.data.ListPublicReservationCulture;
    // 필터 데이터 가져오기 
    let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
    let MINCLASSNM = [], SVCSTATNM = [], PAYATNM = [], AREANM = [];

    // 이름과 같은 내용들 배열에 추가
    row.forEach((v) => {
        arr1.push(v.MINCLASSNM);
        MINCLASSNM = arr1.filter((v, i) => arr1.indexOf(v) === i);

        arr2.push(v.SVCSTATNM);
        SVCSTATNM = arr2.filter((v, i) => arr2.indexOf(v) === i);

        arr3.push(v.PAYATNM);
        PAYATNM = arr3.filter((v, i) => arr3.indexOf(v) === i);

        arr4.push(v.AREANM);
        AREANM = arr4.filter((v, i) => arr4.indexOf(v) === i);
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
    name(MINCLASSNM, minclassnm);
    name(SVCSTATNM, svcstatnm);
    name(PAYATNM, payatnm);
    name(AREANM, areanm);


    // submit 이벤트
    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault();

        // dropdown value 받아오기
        const chooseMin = minclassnm.selectedIndex;
        const chooseSvc = svcstatnm.selectedIndex;
        const choosePay = payatnm.selectedIndex;
        const chooseAre = areanm.selectedIndex;

        // 선택된 value
        const valueMin = minclassnm[chooseMin].value;
        const valueSvc = svcstatnm[chooseSvc].value;
        const valuePay = payatnm[choosePay].value;
        const valueAre = areanm[chooseAre].value;

        // value와 같은 행사정보 배열 만들기.
        // --선택하세요-- 값은 true로 설정해서 항상 참으로 만든다.
        // min선택
        const minArr = row.filter(v => v.MINCLASSNM == valueMin);
        console.log(minArr);
        // const minSvcArr = row.filter(v => v.MINCLASSNM == valueMin && v.SVCSTATNM == valueSvc);
        // const minSvcPayArr = row.filter(v => v.MINCLASSNM == valueMin && v.SVCSTATNM == valueSvc && v.PAYATNM == valuePay);
        // const minSvcPayAreArr = row.filter(v => v.MINCLASSNM == valueMin && v.SVCSTATNM == valueSvc && v.PAYATNM == valuePay && v.AREANM == valueAre);
        // // svc선택
        // const svcArr = row.filter(v => v.SVCSTATNM == valueSin);
        // const svcPayArr = row.filter(v => v.PAYATNM == valuePay && v.SVCSTATNM == valueSvc);
        // const svcPayAreArr = row.filter(v => v.PAYATNM == valuePay && v.SVCSTATNM == valueSvc && v.AREANM == valueAre);
        // // pay 선택
        // const payArr = row.filter(v => v.PAYATNM == valuePay);
        // const payAreArr = row.filter(v => v.PAYATNM == valuePay && v.AREANM == valueAre);
        // const payMinArr = row.filter(v => v.PAYATNM == valuePay && v.MINCLASSNM == valueMin);
        // // Are 선택
        // const areArr =         


    });

})();