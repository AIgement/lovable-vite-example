import { Button } from "@shared/ui/Button";

const AboutPage = () => {
  return (
    <div className="space-y-6">
      <section className="card-surface p-6 space-y-3">
        <p className="title-display">About this template</p>
        <p className="body-m text-text2">
          이 레포는 Vite + React + Tailwind 조합으로 만든 프로덕션 준비 템플릿입니다. FSD-lite 구조와 PLYN
          v1.2 – Dark 디자인 토큰을 기본값으로 제공합니다.
        </p>
        <div className="flex gap-3">
          <Button
            label="폴더 구조 확인"
            variant="secondary"
            onClick={() => document.getElementById("folder-rules")?.scrollIntoView({ behavior: "smooth" })}
          />
          <Button
            label="Lovable 스펙"
            variant="tertiary"
            onClick={() => document.getElementById("lovable")?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      </section>

      <section id="folder-rules" className="card-surface p-6 space-y-2">
        <p className="title-h1">Import flow</p>
        <p className="body-m text-text2">shared → features → pages → app. 역방향 import 는 금지입니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-bg2 rounded-card p-4 border border-line0">
            <p className="title-h2 mb-2">Good</p>
            <pre className="text-left text-sm text-text1 whitespace-pre-wrap">{`import { LoginForm } from "@/features/auth";
import { Sidebar } from "@/shared/ui/Sidebar";`}</pre>
          </div>
          <div className="bg-bg2 rounded-card p-4 border border-line0">
            <p className="title-h2 mb-2">Bad</p>
            <pre className="text-left text-sm text-danger whitespace-pre-wrap">{`import Layout from "@/app/Layout"; // features -> app 금지`}</pre>
          </div>
        </div>
      </section>

      <section id="lovable" className="card-surface p-6 space-y-2">
        <p className="title-h1">Lovable용 프롬프트</p>
        <p className="body-m text-text2">README 마지막 섹션에 샘플 프롬프트가 포함되어 있습니다.</p>
      </section>
    </div>
  );
};

export default AboutPage;
