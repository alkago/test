import { MOCK_WEATHER } from './mockData.js'

const API_KEY = import.meta.env.VITE_OWM_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// API 키가 없으면 목업 모드로 동작합니다.
export const IS_MOCK = !API_KEY

// 아이콘 이미지를 못 불러올 때 쓰는 대체 이모지 (OWM 아이콘 코드 앞 두 자리 기준)
const ICON_EMOJI = {
  '01': '☀️', '02': '🌤️', '03': '⛅', '04': '☁️', '09': '🌧️',
  '10': '🌦️', '11': '⛈️', '13': '❄️', '50': '🌫️',
}

export class WeatherError extends Error {}

// OWM 응답을 화면에서 쓰는 모양으로 변환
function normalize(data) {
  const w = data.weather[0]
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    description: w.description,
    iconUrl: `https://openweathermap.org/img/wn/${w.icon}@2x.png`,
    iconEmoji: ICON_EMOJI[w.icon.slice(0, 2)] ?? '🌡️',
  }
}

async function fetchMock(city) {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 500)) // 네트워크 지연 흉내
  const data = MOCK_WEATHER[city.toLowerCase()]
  if (!data) throw new WeatherError(`'${city}'을(를) 찾을 수 없어요.`)
  return data
}

async function fetchLive(city) {
  const params = new URLSearchParams({ q: city, appid: API_KEY, units: 'metric', lang: 'kr' })
  let res
  try {
    res = await fetch(`${BASE_URL}?${params}`)
  } catch {
    throw new WeatherError('네트워크 연결을 확인해 주세요.')
  }
  if (res.status === 404) throw new WeatherError(`'${city}'을(를) 찾을 수 없어요.`)
  if (res.status === 401) throw new WeatherError('API 키가 올바르지 않거나 아직 활성화되지 않았어요.')
  if (!res.ok) throw new WeatherError(`날씨 정보를 불러오지 못했어요. (HTTP ${res.status})`)
  return res.json()
}

export async function fetchWeather(city) {
  const q = city.trim()
  if (!q) throw new WeatherError('도시 이름을 입력해 주세요.')
  const data = IS_MOCK ? await fetchMock(q) : await fetchLive(q)
  return normalize(data)
}
