/**
 * data에서 필터로 사용할 dropdown select 종류를 가져옴
 */

 (async () => {
    let json = null;
    try {
        json = await axios.get(`http://openapi.seoul.go.kr:8088/${KEY}/${dataType}/ListPublicReservationCulture/${firestPage}/461`);
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

    // 데이터의 총 길이 (행사목록 총 길이)
    const listTotalCount = json.data.ListPublicReservationCulture.list_total_count;
    console.log(listTotalCount);

    const { row } = json.data.ListPublicReservationCulture;
    // console.log(row);

    let arr1 = [], arr2 = [], arr3 = [], arr4 = [] ;
    let MINCLASSNM = [], SVCSTATNM = [], PAYATNM = [], AREANM = [];

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

})();