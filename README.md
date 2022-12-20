# dktechin > Front-end 코딩테스트


- ## 프론트 배포 링크 : [https://bitnaleeeee.github.io/medical-search/](https://bitnaleeeee.github.io/medical-search/)
- ## 서버 배포 링크 : [https://bitnaleeeee.github.io/medical-search/](https://bitnaleeeee.github.io/medical-search/)

<br>

## STACK

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img alt="SASS" src ="https://img.shields.io/badge/SASS-CC6699.svg?&style=for-the-badge&logo=Sass&logoColor=white"/>


<br>

## 목차

- [실행 결과](#실행결과)
- [구현 사항](#구현사항)
- [폴더 구조](#폴더구조)
- [주요 기능](#주요기능)
- [프로젝트의 실행](#프로젝트의실행)

<br>


# 실행결과

<img src="https://user-images.githubusercontent.com/99943583/208465403-0733a2a2-f616-4d9a-aee4-e120d425e562.gif">

<br>

## 구현사항

- [x] 영역 별로 컴포넌트화 
- [x] 제공된 API를 통해 불러온 데이터를 등록일(createdAt) 최신순으로 정렬
- [x] 검색창에 입력된 문자로 실시간 검색하는 기능 구현(타이틀 또는 키워드)
- [x] 오늘 날짜 기준으로 등록일(createdAt)이 2일내 라면 new 데이터로 표시
  - 당일일 경우 'Today'
  - 2일 내 데이터는 '${diff} days ago'
  - 그 외는 'YYYY.MM.DD' 포맷으로 출력
- [x] 검색어 입력 즉시 필터링 되도록 구현(엔터 또는 검색버튼 클릭 없이)
- [x] 실행 중 일어날 수 있는 오류에 대한 예외 처리 
  - 통신이 되지 않았을 때 "오류가 발생했습니다"가 표출되도록 작성 하였습니다.
  - 검색창에 특수문자를 입력하지 못하도록 처리하였습니다.




## 추가 구현사항

- [x] 사용자가 입력한 텍스트와 일치하는 부분을 하이라이트로 처리해 보았습니다.
- [x] 검색어가 없을 시 “검색어 없음” 이 표출되도록 작성하였습니다.
- [x] 입력마다 함수를 호출하지 않도록 `Debounce`를 사용하여 함수 호출 횟수를 줄였습니다.
- [x] dktechin 파피콘을 구현 하였습니다.


</br>

## 폴더구조

```
📦 src
├── 📂 components
│   ├──📂 Container  
│   │   ├──📜 ContainerSearch.js
│   │   └──📜 ContainerSearch.scss
│   │ 
│   ├──📂 DirectLink
│   │   ├──📜 DirectLink.js
│   │   └──📜 DirectLink.scss
│   │ 
│   ├──📂 DocMain
│   │   ├──📜 ContentArticle.js
│   │   ├──📜 ContentArticle.scss
│   │   ├──📜 DocMain.js
│   │   ├──📜 DocMain.scss
│   │   ├──📜 JobItem.js
│   │   └──📜 JobItem.scss
│   │ 
│   ├──📂 Footer
│   │   ├──📜 DocFooter.js
│   │   └──📜 DocFooter.scss
│   │ 
│   └──📂 Header
│       ├──📜 DocHeader.js
│       └──📜 DocHeader.scss 
│   
├── 📂 pages
│       ├──📜 Main.js
│       └──📜 Main.scss
│
├── 📂 styles
│       ├──📜 global.scss
│       └──📜 reset.scss
│ 
├── 📜 index.js
└── 📜 Router.js
```

</br>

# 주요기능

<br>

## 데이터를 등록일(createdAt) 최신순으로 정렬
```javascript 
//Main.js
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

  const fetchData = async () => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:3001/rest/v1/jobs");
    const jobList = response.data.jobList;
    allData = jobList.sort((after, before) => {
      return new Date(before.createdAt) - new Date(after.createdAt);
    });
    setData(allData);
  } catch (e) {
    setError(e);
  }
  setLoading(false);
};

if (loading) return <div className="state-msg">로딩중 입니다..</div>;
if (error) return <div className="state-msg">에러가 발생했습니다</div>;
```
* `axios` 및 `async`, `await`를 활용하여 서버로부터 직업 리스트를 응답받아 `jobList` 변수에 저장합니다.
* `sort` 함수를 사용하여 `allData`에 직업 리스트를 시간 역순으로 정렬하였고 그 값을 `setData`에 담았습니다.
* 또한 데이터 요청중일때 `loading`값을 `true`로 변경하여 "로딩중 입니다" 라고 화면에 출력하며, 통신 오류 등 `error` 가 발생할 경우 `catch` 키워드로 에러객체를 받아 화면에 "에러가 발생했습니다" 라고 출력하도록 작성하였습니다.

<br>

## 검색어 입력 즉시 필터링 되도록 구현
```javascript 
//Main.js
const setSearchIncludeData = (str) => {

  let resultData = allData.filter((item) => {
    let regex = new RegExp(str, "gi");
    let titleBln = regex.test(item.title);
    let badgeBln = false;
    
    item.keywords.forEach((keyword) => {
      if (regex.test(keyword)) {
        badgeBln = true;
        return;
      }
    });
    return (titleBln || badgeBln) && item;
  });
  return resultData;
};

```

* 사용자가 검색어 입력을 하면 `setSearchIncludeData` 함수가 호출되고 이 함수의 파라미터로 `str`에 검색어가 들어있고 이 값을 직업 리스트에서 `filter` 함수를 통해 일치하는 문자열이 있는지 검사합니다.
* 일치하는 문자열은 정규표현식으로 검사하며 검사하는 항목은 작업 리스트의 타이틀과 키워드를 검사합니다.
* 정규표현식 객체를 생성하고 `test()` 메서드를 활용하여 검색어와 타이틀이 일치할시 `true` 로 반환되도록 작성하였고, 키워드의 경우 배열 형태로 `forEach`를 각 배열을 순회하여 검색어와 일치하는 데이터가 있을 경우 `true`로 반환되도록 작성하였습니다. 
* 논리연산자로 타이틀이나 키워드에 검색어가 포함되어 있을 경우 직업 객체를 `return`하여 `resultData` 배열에 담도록 작성하였습니다.

<br>

## 검색어 입력할때마다 자주 함수를 호출하지 않도록 호출 횟수를 줄이는 로직 추가(`Debounce` 적용)

<br>

```javascript



//Main.js
const updateSearchStr = debounce((str) => {
  searchStr = str;
  if (str.length) {
    const searchIncludeData = setSearchIncludeData(str);
    if (searchIncludeData.length) {
      setData(searchIncludeData);
    } else {
      setData([]);
    }
  } else {
    setData(allData);
  }
}, 500);
```

<br>

* 검색창 컴포넌트 `ContainerSearch.js` 의 `input` 박스에 사용자 입력 이벤트 발생시 `props` 로 전달받은 `updateSearchStr` 에 입력값을 인자로 전달하도록 작성하였습니다. 
* 사용자가 검색어를 입력할때 함수 `updateSearchStr` 가 호출되어 검색어를 업데이트 해주고 위에 언급했듯이 `setSearchIncludeData` 함수가 입력된 텍스트와 일치하는 데이터가 있는지 모든 데이터를 검사합니다. 
* 이때, 사용자가 키보드를 입력할 때 마다 함수를 계속 호출하지 않도록 `Debounce` 를 사용하여 0.5초 후 최종 입력된 텍스트를 검사하도록 작성하였습니다. 

<br>

## 데이터 `Props`로 전달 및 검색 결과 없음 출력 로직

```javascript
//ContnentArticle.js
const ContentArticle = (props) => {
  const { jobList, searchStr } = props;
  return (
    <article id="mainContent" className="content-article">
      <h3 className="screen_out">채용 목록</h3>
      <ul className="list_job">
        {jobList.length ? (
          jobList.map((item, idx) => {
            return <JobItem key={idx} JobData={item} searchStr={searchStr} />;
          })
        ) : (
          <li className="none-item">검색 결과가 없습니다.</li>
        )}
      </ul>
    </article>
  );
};
```
* `Main.js` 에서 구인현황이 표시되는 `DocMain` 컴포넌트로 검색어와 일치하는 데이터 `JobList` 와 사용자가 입력한 검색어 `searchStr`을 `props`로 주고 `DocMain.js` 에서는 `ContnentArticle` 로 해당 데이터를 전달해줍니다. 
* 사용자가 입력한 텍스트와 일치하는 데이터가 있을 경우 `map` 함수를 사용하여 일치하는 구인 현황 데이터를 `JobItem.js` 컴포넌트로 뿌려주고, 일치하는 데이터가 없을 경우 "검색 결과가 없습니다" 를 `return` 하도록 작성하였습니다. 

## 오늘 날짜 기준으로 등록일(createdAt)이 2일내 라면 new 데이터로 표시
### 조건
> 당일일 경우 'Today'  
> 2일 내 데이터는 '${diff} days ago'  
> 그 외는 'YYYY.MM.DD' 포맷으로 출력합니다.  

```javascript
//JobItem.js
const JobItem = (props) => {

  const {JobData, searchStr} = props;

  const dateFormat = (dateStr) => {
    let YYYYMMDD = dateStr.substr(0, 10);
    let todayCompare = getTodayCompare(YYYYMMDD);
    let dayResult = '';

    if (todayCompare <= 0) {
      dayResult = 'Today';
    } else if (todayCompare <= 2) {
      dayResult = todayCompare + 'days ago';
    } else {
      dayResult = YYYYMMDD.replace(/-/gi, '.');
    }
      return dayResult;
  }

  const getTodayCompare = (dateStr) => {

    let YYYYMMDD = dateStr.substr(0, 10);
    let dateArr = YYYYMMDD.split("-");    
    let stDate = new Date(dateArr[0], dateArr[1], dateArr[2]);
    
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let endDate = new Date(year, month, day);
    
    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = btMs / (1000 * 60 * 60 * 24);
    
    return Number(btDay);
  }
}
```

* `dataFormat` 함수는 직업 리스트의 날짜 문자열(`createdAt`)을 년/월/일 포멧으로 자른 뒤 비교 날짜에 맞게 출력할 문자열을 리턴해 주는 함수 입니다.
  * 비교 기준은 1일 안이면 Today, 2일 내외면 1 ~ 2 ago, 그 외는 'YYYY.MM.DD' 형식으로 `return` 되도록 작성하였습니다. 
* `getTodayCompare` 함수는 오늘 날짜를 기준으로 직업 리스트의 날짜를 비교하여 몇일이 차이나는지 리턴해주는 함수입니다.
  * `getTodayCompare` 함수의 로직을 살펴보면 직업 리스트의 날짜 문자열(`createdAt`)을 년/월/일로 변경 및 각 날짜들을 Date 객체로 변환해 `stDate` 에 담아줍니다.
  * 현재 날짜를 Date 객체로 생성하여 `now` 변수에 담아주고 이 값도 년/월/일로 나누어 `endDate` 변수에 새로 저장합니다. 이렇게 Date 객체를 나누어 저장하는 이유는 년/월/일 값만 비교하고 시간 및 초는 계산에 제외시키기 위함입니다.
  * 현재 날짜(endDate)에서 비교 날짜(stDate)를 빼서 차이나는 시간을 다시 변환하여 비교합니다.

```javascript
// JSX 부분
<li className={getTodayCompare(JobData.createdAt) <= 2 ? "job-item new" : "job-item"}>
```
* 각 `li` 요소에 `getTodayCompare`의 `return` 된 값에 따라 `className`을 다르게 하여 NEW 도형을 보여지도록 작성하였습니다. 


<br>

# 프로젝트의실행
## Server 실행 

### 1. 서버 디렉토리로 이동해서 프로젝트 초기화

```
$ cd server
$ npm install
```

서버를 설치가 안되어서 구글링을 계속 해보니 node 버전이 맞지 않아서 오류가 나고 있었습니다. `nvm`를 이용하여 node 버전을 14로 변경하였습니다.

### 2. 버전 변경(기준 ver: 14.16.1 )
```
$ nvm install 14.16.1
$ nvm use 14.16.1

>> 변경 완료
>> Now using node v14.16.1 (npm v6.14.12)
```

### 3. 서버 다시 실행
```
$ npm run demo
```
#  

## Client 실행

### 1. client 디렉토리로 이동해서 CRA를 이용하여 리액트 초기화

```
$ cd ..
$ cd client
$ create-react-app ./
```

### 2. 설치할때 `18.12.1` 버전으로 변경

서버를 설치하기 위해 node버전을 14로 변경했었는데 14버전은 CRA가 실행이 안되 다시 node 버전을 업그레이드 하였습니다.

```
$ nvm install 18.12.1
$ nvm use 18.12.1
```

### 3. 노드 버전 `18.12.1`인지 확인

```
$ node -v
>> 18.12.1
```

### 4. 다시 client에 CRA 설치

```
$ create-react-app ./
```

### 5. 리액트 앱 설치되면 리액트 실행

```
$ npm start
```
#
## 추가 모듈(sass, axios, router, lodash)

* `sass` : `v1.57.1`
* `axios` : `v1.2.1`
* `react-router-dom` : `v6.5.0`
* `lodash` : `v4.17.21`

```
$ npm i sass 
$ npm i axios 
$ npm i react-router-dom
$ npm install lodash
```