## 사용 API
- [문화행사 정보](http://data.seoul.go.kr/dataList/OA-2269/S/1/datasetView.do)
- [카카오지도](https://apis.map.kakao.com/)

## 주요기능
1. 목록표시 (main)
메인화면에 바로 보여지게끔 data_info를 div안에 작성 후 보여지게 하는방식  
한번에 10개의 정보를 보여주며 스크롤을 내릴떄마다 정보를 추가해서 가져온다.  
`div안의 data정보`
```js
SVCNM : "서비스명",
MAXCLASSNM : "문화체험", // 대분류명
IMGURL : "이미지정보" // url
```
`스크롤 이벤트시 값이 변동할 변수`
```js
let firestPage = 1; // 첫번째 정보
let endPage = 10; // 마지막 정보
// 스크롤 내릴때 firestPage,endPage의 값은 10씩 증가 -> 11,20 -> 21,30 ...
// 17.이벤트 처리 06번 예제 활용
```
스크롤 이벤트에서 마지막 페이지에 해당할 경우 async 함수를 사용해 데이터를 추가해준다.

#### 상세정보 표시
- 사진, 제목, 중요정보, 상세정보, 지도표시 (figma문서참조)  
`div 클릭시 옆에서 메뉴 나오게 하기`
```js
IMGURL : "이미지정보",
SVCNM : "서비스명",
SVCSTATNM: "서비스상태", // 접수 여부

RCPTBGNDT : "접수시작일시", //number
RCPTENDDT : "접수종료일시", //number

SVCOPNBGNDT: "서비스개시시작일시", // number
SVCOPNENDDT: "서비스개시종료일시", // number

PAYAYNM : "결제방법", // string

DTLCONT : "상세내용" // HTML TAG를 포함한 stting
```

`div menu 지도`
```js
Y:"장소 Y좌표(lattitue = 위도)",
X:"장소 X좌표(longtitue = 경도)"
// kakao map 사용해서 데이터 가공하여 위치 표시.
```

2. 분류기능으로 조회 (nav)
   - 기간설정(특정 기간 내에서만 검색)-> 캘린더 사용
   - 참여가능한 행사만 표시(기간지난것 제외)

3. 즐겨찾기


## 시간 남으면 추가할 기능
- 상하단 이동버튼
- 후기 남기기 기능
- footer : 참여인원등등.. 만든사람 정보(푸터)