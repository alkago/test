# 날씨 앱 (React + Vite)

도시 이름을 입력하면 OpenWeatherMap의 현재 날씨(온도, 습도, 날씨 아이콘 등)를 보여줍니다.

## 실행

```bash
npm install
npm run dev
```

## API 키 연결

API 키가 없으면 **목업 모드**로 동작합니다. 서울·부산·제주·도쿄·런던·뉴욕·모스크바 7개 도시만 검색할 수 있습니다.

실제 API를 쓰려면:

1. `.env.example`을 `.env`로 복사합니다.
2. `VITE_OWM_API_KEY=발급받은키`를 입력합니다.
3. 개발 서버를 재시작합니다.

코드는 수정하지 않아도 됩니다. 목업 데이터가 OWM 응답과 같은 모양이기 때문입니다.

> 참고: 새로 발급한 키는 활성화까지 시간이 걸릴 수 있습니다(401 오류).
> `VITE_` 환경변수는 빌드 결과물에 그대로 포함되므로, 공개 배포할 때는 서버(프록시)를 거쳐 호출하세요.

## 구조

```
src/
  api/weather.js         API 호출 + 목업 전환 + 응답 정규화
  api/mockData.js        OWM 응답 형태의 목업 데이터
  components/WeatherCard.jsx
  App.jsx                검색 폼, 로딩/에러/결과 상태
  index.css
```
