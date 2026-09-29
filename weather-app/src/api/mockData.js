// OpenWeatherMap "Current weather" 응답(/data/2.5/weather)과 같은 모양의 목업 데이터.
// 필요한 필드만 남겼습니다. 키는 소문자 도시명(한글/영문 모두 허용).

const seoul = {
  name: 'Seoul',
  sys: { country: 'KR' },
  weather: [{ id: 800, main: 'Clear', description: '맑음', icon: '01d' }],
  main: { temp: 22.4, feels_like: 21.9, temp_min: 19.8, temp_max: 24.1, humidity: 48 },
  wind: { speed: 2.6 },
}

const busan = {
  name: 'Busan',
  sys: { country: 'KR' },
  weather: [{ id: 803, main: 'Clouds', description: '구름 많음', icon: '04d' }],
  main: { temp: 23.8, feels_like: 24.2, temp_min: 22.0, temp_max: 25.3, humidity: 71 },
  wind: { speed: 4.8 },
}

const jeju = {
  name: 'Jeju City',
  sys: { country: 'KR' },
  weather: [{ id: 500, main: 'Rain', description: '약한 비', icon: '10d' }],
  main: { temp: 20.1, feels_like: 20.4, temp_min: 19.2, temp_max: 21.0, humidity: 88 },
  wind: { speed: 6.1 },
}

const tokyo = {
  name: 'Tokyo',
  sys: { country: 'JP' },
  weather: [{ id: 802, main: 'Clouds', description: '구름 조금', icon: '03d' }],
  main: { temp: 25.6, feels_like: 26.0, temp_min: 23.9, temp_max: 27.2, humidity: 63 },
  wind: { speed: 3.4 },
}

const london = {
  name: 'London',
  sys: { country: 'GB' },
  weather: [{ id: 701, main: 'Mist', description: '박무', icon: '50n' }],
  main: { temp: 13.2, feels_like: 12.6, temp_min: 11.8, temp_max: 14.5, humidity: 82 },
  wind: { speed: 3.9 },
}

const newYork = {
  name: 'New York',
  sys: { country: 'US' },
  weather: [{ id: 211, main: 'Thunderstorm', description: '뇌우', icon: '11n' }],
  main: { temp: 18.7, feels_like: 18.9, temp_min: 17.1, temp_max: 20.3, humidity: 77 },
  wind: { speed: 7.2 },
}

const moscow = {
  name: 'Moscow',
  sys: { country: 'RU' },
  weather: [{ id: 600, main: 'Snow', description: '약한 눈', icon: '13d' }],
  main: { temp: -2.3, feels_like: -6.8, temp_min: -3.5, temp_max: -1.0, humidity: 90 },
  wind: { speed: 4.2 },
}

export const MOCK_WEATHER = {
  seoul, '서울': seoul,
  busan, '부산': busan,
  jeju, '제주': jeju,
  tokyo, '도쿄': tokyo,
  london, '런던': london,
  'new york': newYork, '뉴욕': newYork,
  moscow, '모스크바': moscow,
}

export const MOCK_CITIES = ['서울', '부산', '제주', '도쿄', '런던', '뉴욕', '모스크바']
