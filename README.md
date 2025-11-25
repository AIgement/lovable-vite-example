# React + Vite + Tailwind FSD-lite Template (PLYN v1.2 – Dark)

프로덕션에서도 바로 쓸 수 있는 React + Vite + TypeScript + Tailwind SPA 템플릿입니다.  
Next.js 마이그레이션 템플릿이 아닌 순수 React Router 기반 SPA이며,  
폴더 구조 / 코드 스타일 / 디자인 시스템 규칙을 Lovable 스펙으로 제공합니다.

---

## 1. Folder structure

정확히 아래 구조를 사용합니다.

    /src
      /app
        App.tsx
        main.tsx            // Vite 진입점
        router.tsx          // React Router 설정
        Layout.tsx          // 레이아웃 컴포넌트 (배경, 좌측 메뉴 등)
        ErrorBoundary.tsx   // 전역 에러 바운더리

      /pages
        HomePage.tsx
        AboutPage.tsx
        NotFoundPage.tsx    // 404 페이지
        ErrorPage.tsx       // 공통 에러 페이지

      /features
        /auth
          /ui
            index.ts        // auth UI 공개 API (옵션)
            LoginForm.tsx
          /model
            index.ts        // auth model 공개 API (옵션)
            useLogin.ts
          /api
            index.ts        // auth api 공개 API (옵션)
            authApi.ts

        /dashboard
          /ui
            index.ts
            DashboardPage.tsx
          /model
            index.ts
            useDashboard.ts
          /api
            index.ts
            dashboardApi.ts

        // 추가 기능(feature)도 동일 패턴으로 확장 가능

      /shared
        /ui
          index.ts          // 공용 UI barrel (옵션)
          Button.tsx
          Input.tsx
          Sidebar.tsx       // 좌측 메뉴용
        /lib
          index.ts          // 공용 lib barrel (옵션)
          api.ts
          helpers.ts
        /hooks
          index.ts          // 공용 hooks barrel (옵션)
          useAuth.ts
          useFetch.ts

      /styles
        tailwind.css        // Tailwind + 전역 테마(CSS variables)

    tailwind.config.js
    postcss.config.js
    vite.config.ts
    tsconfig.json
    README.md

- `src/app`: 엔트리/라우터/레이아웃/에러 바운더리를 관리하는 셸(shell) 레이어  
- `src/pages`: URL 라우트에 직접 연결되는 페이지 컴포넌트. 도메인 로직은 `features` 에서 import  
- `src/features`: 도메인/유스케이스 단위. 각 feature 는 `ui/`, `model/`, `api/` 세 구획으로 고정되며,  
  `index.ts` 는 이 하위 폴더들 내부에만 존재 (`auth/ui/index.ts` 등)  
- `src/shared`: 어디서나 재사용 가능한 UI/유틸/훅. 필요 시 각 서브폴더 내부에만 `index.ts` 사용  
- `src/styles`: Tailwind 엔트리와 PLYN v1.2 – Dark 토큰

---

## 2. Import direction rules

**허용 방향:** `shared → features → pages → app` (위 방향으로만 import 가능)

- `shared` → 어디서나 사용 가능 (`app`, `pages`, `features`)  
- `features` → `app`, `pages` 에서 사용 가능  
- `pages` → `app` 에서만 사용 (주로 `router.tsx`)

**금지:** 역방향 import 전부 금지

예시:

    // good (feature 내부 barrel은 /ui, /model, /api 안에만 존재)
    import { LoginForm } from "@/features/auth/ui";
    import { useLogin } from "@/features/auth/model";
    import { Button } from "@/shared/ui";
    import { Sidebar } from "@/shared/ui";

    // bad (상위 레이어에서 하위 레이어를 거꾸로 import)
    import Layout from "@/app/Layout"; // features에서 app import 금지

**규칙 요약**

- `src/features/auth/index.ts` 같은 feature 루트 barrel 파일은 만들지 않는다.  
- barrel 이 필요하면 항상 `/ui/index.ts`, `/model/index.ts`, `/api/index.ts` 처럼 **내부 폴더에만** 둔다.

---

## 3. UI / Logic & Prototype boundaries

Feature 내부 책임 분리 (실제 코드와 동일한 패턴):

- `ui/`: 화면·컴포넌트 레이어. 비즈니스 로직 최소화, 필요한 데이터/핸들러는 props 로 받음  
  - 예: `LoginForm.tsx`, `DashboardPage.tsx`
- `model/`: 훅 기반 상태·로직 레이어. 서버 호출, 캐싱, 폼 상태, 뮤테이션 등 UI와 분리된 로직 담당  
  - 예: `useLogin.ts`, `useDashboard.ts`
- `api/`: HTTP 클라이언트 래퍼, fetch/axios 호출, API 엔드포인트 정의  
  - 예: `authApi.ts`, `dashboardApi.ts`
- `index.ts` (옵션, **폴더 내부에만**):

예시:

    // ui/index.ts
    export { LoginForm } from "./LoginForm";

    // model/index.ts
    export { useLogin } from "./useLogin";

    // api/index.ts
    export * from "./authApi";

이렇게 세그먼트 단위 barrel만 두고, **feature 루트 barrel 은 두지 않는다.**

**Prototype Logic**

초기에는 `model/` 과 `api/` 에 프로토타입 수준 로직을 넣되,  
실제 서비스 단계에서 점진적으로 분리/리팩터링할 수 있도록 설계합니다.

---

## 4. Design system (PLYN v1.2 – Dark, Tailwind + CSS variables)

### 4.1 THEME & DESIGN SYSTEM (PLYN v1.2 – Dark)

`/styles/tailwind.css` 에 CSS variables 정의:

    :root {
      /* Background */
      --bg-0: #1C2B23;  /* page root */
      --bg-1: #27342D;  /* card / main panels */
      --bg-2: #2E3932;  /* sub-panel, inputs */
      --line-0: #26332C; /* faint dividers */
      --line-1: #32423D; /* borders */

      /* Text */
      --text-1: #E0E1E0; /* primary */
      --text-2: #969998; /* secondary */
      --text-3: #78807C; /* muted / caption */

      /* Accent & States */
      --accent:        #45C9BC;
      --accent-hover:  #33CCBD;
      --accent-active: #27D8C7;
      --success-aux:   #73A26D;
      --danger:        #E65550;
    }

    body {
      background-color: var(--bg-0);
      color: var(--text-1);
      font-family: "Pretendard", system-ui, -apple-system, "Segoe UI", Roboto,
        "Noto Sans", "Apple SD Gothic Neo", "Malgun Gothic",
        "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
    }

Tailwind semantic 색상 매핑 (`tailwind.config.js`):

    extend: {
      colors: {
        bg0: "var(--bg-0)",
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        line0: "var(--line-0)",
        line1: "var(--line-1)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
        accentActive: "var(--accent-active)",
        successAux: "var(--success-aux)",
        danger: "var(--danger)",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px"
      },
      borderRadius: {
        card: "12px",
        field: "10px",
        pill: "999px"
      },
      boxShadow: {
        plyn: "0 1px 0 rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.02)"
      },
    }

### Typography (Tailwind utilities 예시)

    .title-display { @apply text-[28px] leading-[36px] font-semibold; }
    .title-h1      { @apply text-[22px] leading-[30px] font-semibold; }
    .title-h2      { @apply text-[18px] leading-[26px] font-semibold; }
    .body-m        { @apply text-[16px] leading-[24px] font-medium; }
    .body-s        { @apply text-[14px] leading-[22px] font-normal; }
    .caption       { @apply text-[12px] leading-[18px] font-normal; }

- Header letter-spacing ≈ -2%  
- Body letter-spacing ≈ -3%  
- Caption letter-spacing ≈ -5%  
- KPI/테이블 숫자: tabular numbers 권장

### Spacing / Radius / Shadow

- Base spacing(px): 4, 8, 12, 16, 20, 24, 32, 40  
- Border radius: Card 12, Fields/Buttons 10, Pills 999  
- Shadow:  
  `shadow-plyn = 0 1px 0 rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.02)`

### Component & Interaction rules

- Cards: `bg-bg1` + `border-line1` + `rounded-card` + `p-5/6` + `shadow-plyn`  
- Inputs: `h-10` + `rounded-field` + `bg-bg2` + `text-text1` + `placeholder:text-text3` + `focus:ring-1 focus:ring-accent`  
- Buttons:
  - Primary: `bg-accent` / text `#0E1A16` / `hover:bg-accentHover`
  - Secondary: Transparent, `text-accent`, `border border-accent/50`, `hover:bg-bg2`
  - Tertiary: Text-only `text-text2`, `hover:text-text1`
- Status pills: `h-6` + `rounded-pill`  
  - High = `#E65550`  
  - Mid = `#73A26D`  
  - Info = `accent` (배경은 rgba 가이드 참조)
- Interaction:
  - hover → `bg-bg2`
  - focus → `ring-1 ring-accent`
  - disabled → `opacity-50 cursor-not-allowed`
  - loading → 상단 2px 로더 또는 skeleton

### Layout rules (Dashboard)

- Main width 1440–1600px (`max-w-[1600px] mx-auto`)  
- 12-column grid, gutter 24px, page padding 24px  
- Left navigation width 240px (`w-[240px]`)  
- Top row: page title(Display-L) + breadcrumb + filters/날짜  
- KPI row: 4–6 tiles, height 80–96px  
- `Layout.tsx` 에서 `min-h-screen bg-bg0 text-text1 flex` + `Sidebar w-[240px]` 적용

---

## 5. Barrel / alias guide

### 5.1 Barrel 파일 규칙

**원칙**

- feature 루트(`src/features/auth/index.ts`)에는 barrel 파일을 두지 않는다.  
- barrel 이 필요하면 항상 세그먼트 내부에만 만든다.

예시:

    // src/features/auth/ui/index.ts
    export { LoginForm } from "./LoginForm";

    // src/features/auth/model/index.ts
    export { useLogin } from "./useLogin";

    // src/features/auth/api/index.ts
    export * from "./authApi";

    // src/shared/ui/index.ts
    export { Button } from "./Button";
    export { Sidebar } from "./Sidebar";

사용 예시:

    import { LoginForm } from "@/features/auth/ui";
    import { useLogin } from "@/features/auth/model";
    import { Button, Sidebar } from "@/shared/ui";

### 5.2 Alias 설정 (`tsconfig.json`, `vite.config.ts`)

    {
      "compilerOptions": {
        "baseUrl": "src",
        "paths": {
          "@/*": ["*"],
          "@app/*": ["app/*"],
          "@pages/*": ["pages/*"],
          "@features/*": ["features/*"],
          "@shared/*": ["shared/*"],
          "@styles/*": ["styles/*"]
        }
      }
    }

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@app": path.resolve(__dirname, "src/app"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@features": path.resolve(__dirname, "src/features"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    }

Good / Bad import 예시:

    // good
    import { LoginForm } from "@/features/auth/ui";
    import { Button } from "@/shared/ui";

    // bad (feature 루트 barrel을 가정하는 import 패턴은 사용하지 않음)
    import { LoginForm } from "@/features/auth";

---

## 6. Quick start & 한국어 개발자 가이드

### Quick start

    # 설치
    npm install

    # 개발 서버
    npm run dev

    # 빌드
    npm run build

    # 프리뷰
    npm run preview

### 폴더별 역할

- `src/app`: 엔트리, 라우터, 레이아웃, 에러 바운더리를 관리하는 셸 레이어  
- `src/pages`: URL 라우트 연결 페이지. 실제 도메인/데이터 로직은 `features` 에서 가져온다.  
- `src/features`: 도메인/유스케이스 단위 기능. 각 feature 안에 `ui/`, `model/`, `api/` 세그먼트만 있고, barrel 은 각 세그먼트 내부에만 둔다.  
- `src/shared`: 어디서나 재사용 가능한 프레젠테이션/유틸/훅. 필요 시 `ui/index.ts`, `lib/index.ts`, `hooks/index.ts` 사용.  
- `src/styles`: Tailwind 엔트리, 전역 스타일, PLYN v1.2 – Dark 테마/토큰 정의.

### 새로운 Feature 추가 가이드

1. `src/features/user` 폴더 생성  
2. `ui/UserList.tsx`, `model/useUserList.ts`, `api/userApi.ts` 생성  
3. 필요하다면:

    // ui/index.ts
    export { UserList } from "./UserList";

    // model/index.ts
    export { useUserList } from "./useUserList";

4. `pages` 또는 `app/router.tsx` 에서 아래처럼 사용:

    import { UserList } from "@/features/user/ui";
    import { useUserList } from "@/features/user/model";

### 에러 처리 / 404

- 예상치 못한 런타임 에러: `ErrorBoundary.tsx` → `ErrorPage.tsx` 렌더  
- 존재하지 않는 경로: `NotFoundPage.tsx` 렌더

---

## 7. Lovable Prompt Example

아래 프롬프트는 Lovable에게 이 레포를 “하드 스펙”으로 사용하라고 지시할 때 그대로 사용할 수 있는 예시입니다.  
`index.ts` 관련 규칙도 세그먼트 내부에만 허용하는 쪽으로 수정되었습니다.

    다음 GitHub 레포를 반드시 먼저 열어서, README와 src 폴더 구조를 끝까지 읽어라.

    GitHub repo: https://github.com/AIgement/lovable-vite-example

    이 레포는 "React + Vite + Tailwind FSD-lite + DDD-lite Template (PLYN v1.2 – Dark)" 이다.  
    앞으로 생성하거나 수정하는 모든 코드는 이 레포의 규칙을 하드 제약으로 취급해야 한다.  
    README 내용은 참고가 아니라 “스펙”이다.

    =====================================================
    [하드 제약(HARD CONSTRAINTS) — 반드시 지켜야 함]
    =====================================================

    1. 폴더 구조 변경 금지  
       - 새로운 top-level 폴더(예: src/components, src/common 등) 생성 금지  
       - 모든 파일은 아래 폴더 중 하나에만 위치:
         - src/app
         - src/pages
         - src/features/<name>/{ui,model,api}
         - src/shared/{ui,lib,hooks}
         - src/styles

    2. Feature 규칙  
       - Feature는 반드시 다음 3개 세그먼트 존재:
         ui/, model/, api/
       - 로직/상태는 model/
       - API 호출은 api/
       - 화면 컴포넌트는 ui/
       - index.ts 는 feature 루트가 아니라  
         각 세그먼트 내부(ui/index.ts, model/index.ts, api/index.ts)에만 둘 수 있다.

    3. Import 방향 규칙 고정  
       - shared → features → pages → app 방향으로만 import 허용  
       - 역방향 import 절대 금지  
       - 새로운 레이어 생성 금지

    4. 디자인 시스템(PLYN v1.2 – Dark)을 반드시 준수  
       - CSS variables(--bg-0, --accent 등)은 README의 토큰을 그대로 사용  
       - Tailwind 클래스는 tailwind.config.js 의 semantic 색상/spacing/radius/shadow를 사용  
       - HEX 색상, font-size 등 하드코딩 금지 (토큰 기반만 사용)

    5. Layout / ErrorBoundary 규칙  
       - Layout.tsx 는 좌측 Sidebar, 상단 헤더, main container 를 포함  
       - min-h-screen bg-bg0 text-text1 flex 구조 유지  
       - ErrorBoundary.tsx 는 모든 렌더 에러를 ErrorPage.tsx 로 연결해야 함

    6. 새로운 아키텍처 / 서비스 레이어 / context / store 추가 금지  
       - Redux / Zustand / Recoil 등 추가 금지 (README에 없기 때문)  
       - services/, contexts/, stores/ 등의 폴더 생성 금지

    =====================================================
    [작업 절차]
    =====================================================
    작업을 시작하기 전에 아래 3단계를 반드시 수행하라.

    1) README 전체(폴더 구조, 디자인 시스템, 규칙)를 요약하고  
       “어떤 제약을 따라야 하는지” bullet list 로 다시 적어라.

    2) 스스로 체크리스트를 생성하라. 예:
       - 나는 새로운 폴더를 만들지 않는가?
       - feature 파일 구조를 위반하지 않는가?
       - 디자인 토큰을 하드코딩하지 않는가?
       - index.ts 를 feature 루트가 아니라 /ui, /model, /api 내부에만 두고 있는가?

    3) 체크리스트 통과 후에만 코드를 생성하라.  
       통과하지 못하면 코드를 생성하지 말고 “어떤 제약이 막고 있는지” 알려라.

    =====================================================
    [요청 작업]
    =====================================================

    README의 모든 규칙을 절대적으로 지키면서  
    아래 “요구사항”을 구현하라.  
    추가적인 가정, 새로운 폴더, 임의의 리팩토링은 절대 하지 말라.

    --- 아래에 이번 작업의 요구사항을 붙여 넣으시오 ---

    <여기에 기능 요구사항을 붙이세요>
