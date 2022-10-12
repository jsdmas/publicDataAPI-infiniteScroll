async function search() {
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

    // 행사 목록 배열
    let festival = data.ListPublicReservationCulture.row;
    // console.log(festival);

    // festival 로 받은 행사 정보를 통해 HTML데이터 생성.
    festival.forEach(v => elementcreate(v));
}
