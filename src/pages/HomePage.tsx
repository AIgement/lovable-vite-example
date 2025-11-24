import { LoginForm } from "@features/auth";
import { DashboardPage } from "@features/dashboard";
import { Button } from "@shared/ui/Button";
import { useAuth } from "@shared/hooks/useAuth";

const HomePage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="space-y-6">
      <section className="card-surface p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="title-display">Welcome back{isAuthenticated && user ? `, ${user.name}` : ""}</p>
            <p className="body-m text-text2">React + Vite + Tailwind SPA 템플릿 (PLYN v1.2 – Dark)</p>
          </div>
          <div className="flex gap-3">
            <Button label="문서 읽기" variant="secondary" onClick={() => window.open("https://vitejs.dev/", "_blank")}/>
            {isAuthenticated && <Button label="로그아웃" variant="tertiary" onClick={logout} />}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2 card-surface p-6">
          <LoginForm onSuccess={() => {}} />
        </div>
        <div className="lg:col-span-3 card-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="title-h1">시스템 건강도</p>
              <p className="body-s text-text3">KPI와 상태를 한 눈에 확인하세요.</p>
            </div>
            <span className="caption text-text2">대시보드는 features/dashboard/ui 내 정의</span>
          </div>
          <DashboardPage />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
