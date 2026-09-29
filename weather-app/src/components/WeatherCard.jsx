import { useState } from 'react'

export default function WeatherCard({ data }) {
  const [failedIcon, setFailedIcon] = useState(null) // 로드에 실패한 아이콘 URL

  return (
    <article className="weather-card">
      <header>
        <h2>{data.city}</h2>
        <span className="country">{data.country}</span>
      </header>

      <div className="main">
        {failedIcon === data.iconUrl ? (
          <span className="icon-fallback" role="img" aria-label={data.description}>
            {data.iconEmoji}
          </span>
        ) : (
          <img
            src={data.iconUrl}
            alt={data.description}
            width="100"
            height="100"
            onError={() => setFailedIcon(data.iconUrl)}
          />
        )}
        <div>
          <p className="temp">{data.temp}°</p>
          <p className="desc">{data.description}</p>
        </div>
      </div>

      <dl className="stats">
        <div>
          <dt>습도</dt>
          <dd>{data.humidity}%</dd>
        </div>
        <div>
          <dt>체감</dt>
          <dd>{data.feelsLike}°</dd>
        </div>
        <div>
          <dt>최저 / 최고</dt>
          <dd>{data.tempMin}° / {data.tempMax}°</dd>
        </div>
        <div>
          <dt>바람</dt>
          <dd>{data.wind} m/s</dd>
        </div>
      </dl>
    </article>
  )
}
