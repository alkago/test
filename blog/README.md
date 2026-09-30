# Tech Blog

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 기반 마크다운 블로그.

## 시작

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 전 페이지 SSG
```

## 글 쓰기

`content/posts/<slug>.md` 파일을 추가하면 `/posts/<slug>`로 발행됩니다.

```md
---
title: "제목"            # 필수
date: "2026-09-30"       # 필수
description: "요약"      # 목록·OG·RSS에 사용
tags: ["nextjs", "ai"]
draft: true              # dev에서만 노출, production 빌드에서 제외
---

본문 (GFM: 표, 체크리스트, 취소선 지원)
```

## 구조

| 경로 | 역할 |
| --- | --- |
| `content/posts/` | 마크다운 원고 |
| `src/lib/posts.ts` | frontmatter 파싱, 정렬, draft 필터, 태그 집계 |
| `src/lib/markdown.ts` | remark/rehype 파이프라인 (GFM, heading id, Shiki 하이라이팅) |
| `src/lib/site.ts` | 사이트 제목·작성자·URL 설정 |
| `src/app/posts/[slug]` | 글 상세 (SSG) |
| `src/app/tags` | 태그 목록 / 태그별 글 목록 |
| `src/app/rss.xml`, `sitemap.ts` | RSS, sitemap |

배포 시 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 설정하세요 (RSS·sitemap·OG의 절대 URL에 사용).
