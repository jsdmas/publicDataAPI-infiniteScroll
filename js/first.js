/**
 * 제일 먼저 실행될 자바스크립트 파일
 * data의 총 길이를 구해 scroll event 적용, search 함수로 목록 불러오기.
 */

//첫 페이지에 데이터 불러오기.
search();
(async () => {
    let json = null;
    try {
        json = await axios.get(`http://openapi.seoul.go.kr:8088/${KEY}/${dataType}/ListPublicReservationCulture/${firstPage}/${endPage}`);
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
    // 데이터의 총 길이 (행사목록 총 길이)
    const listTotalCount = data.ListPublicReservationCulture.list_total_count;

    // window scroll event
    window.addEventListener(`scroll`, e => {
        // 더이상 불러올 데이터가 없다면 처리 중단
        // endPage 의 길이가 list_total_count값보다 크다면 실행 중단
        if (endPage > listTotalCount) {
            return;
        }
        // 스크롤바의 Y좌표
        const scrollTop = window.scrollY;
        // 웹 브라우저의 창 높이
        const windowHeight = window.screen.availHeight;
        // HTML 문서의 높이
        const documentHeight = document.body.scrollHeight;
        // 스크롤바의 반동 효과를 고려해서 scrollTop + windowHeight가 실제 화면 크기보다 커 질 수도 있다.
        if (scrollTop + windowHeight >= documentHeight) {
            // 10개의 행사정보 불러오기 (배열길이 설정)
            firstPage += 5;
            endPage += 5;
            search();
        }
    });
})();



