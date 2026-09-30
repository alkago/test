---
title: "블로그를 시작합니다"
date: "2026-09-30"
description: "Next.js 15 + 마크다운으로 만든 블로그의 첫 글"
tags: ["blog", "nextjs"]
---

## 왜 직접 만들었나

플랫폼에 종속되지 않고, **마크다운 파일 = 글**이라는 단순한 구조를 원했습니다.

- 글은 `content/posts/*.md`에 둡니다
- 파일명이 곧 URL slug가 됩니다
- Git으로 이력이 관리됩니다

| 항목 | 선택 |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Markdown | unified / remark / rehype |
