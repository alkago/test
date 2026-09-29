import { useRef, useState } from 'react'
import { fetchWeather, IS_MOCK } from './api/weather.js'
import { MOCK_CITIES } from './api/mockData.js'
import WeatherCard from './components/WeatherCard.jsx'

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const latestRequest = useRef(0) // 빠르게 연속 검색할 때 마지막 요청 결과만 반영

  async function search(name) {
    const id = ++latestRequest.current
    setLoading(true)
    setError('')
    try {
      const data = await fetchWeather(name)
      if (id === latestRequest.current) setWeather(data)
    } catch (e) {
      if (id === latestRequest.current) {
        setWeather(null)
        setError(e.message)
      }
    } finally {
      if (id === latestRequest.current) setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    search(city)
  }

  function pick(name) {
    setCity(name)
    search(name)
  }

  return (
    <main className="app">
      <h1>날씨</h1>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="도시 이름 (예: 서울, Tokyo)"
          aria-label="도시 이름"
          autoFocus
        />
        <button type="submit" disabled={loading || !city.trim()}>
          검색
        </button>
      </form>

      {IS_MOCK && (
        <div className="mock-note">
          <span>목업 모드</span>
          {MOCK_CITIES.map((c) => (
            <button key={c} type="button" onClick={() => pick(c)} disabled={loading}>
              {c}
            </button>
          ))}
        </div>
      )}

      <section className="result" aria-live="polite" aria-busy={loading}>
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>날씨를 불러오는 중…</p>
          </div>
        )}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && weather && <WeatherCard data={weather} />}
        {!loading && !error && !weather && (
          <p className="empty">도시 이름을 입력하면 현재 날씨를 보여드려요.</p>
        )}
      </section>
    </main>
  )
}
