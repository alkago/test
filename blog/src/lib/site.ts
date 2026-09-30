export const siteConfig = {
  title: "My Tech Blog",
  description: "개발하면서 배운 것들을 기록합니다.",
  author: "Your Name",
  // 우선순위: 명시 설정 > Vercel production 도메인(프로토콜 없이 주입됨) > 로컬
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "ko-KR",
};
