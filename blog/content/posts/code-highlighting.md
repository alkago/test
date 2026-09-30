---
title: "코드 하이라이팅 테스트"
date: "2026-09-29"
description: "rehype-pretty-code(Shiki)로 코드 블록을 렌더링합니다."
tags: ["nextjs", "typescript"]
---

빌드 타임에 Shiki로 하이라이팅하므로 클라이언트 JS가 추가되지 않습니다.

```ts title="posts.ts"
export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPostFile);
}
```

인라인 코드 `npm run dev`도 지원합니다.
