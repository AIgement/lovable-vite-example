import { ReactNode } from "react";
import { Sidebar } from "@shared/ui/Sidebar";
import { Button } from "@shared/ui/Button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-bg0 text-text1 flex">
      <aside className="w-[240px] border-r border-line1 bg-bg1">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-line1 bg-bg1/80 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div>
            <p className="title-display">Lovable Control</p>
            <p className="body-s text-text2 mt-1">PLYN v1.2 – Dark SPA template</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="body-s text-text2 px-3 py-1 rounded-pill border border-line1 bg-bg2">Design token: PLYN v1.2</span>
            <Button label="새로고침" variant="secondary" onClick={() => window.location.reload()} />
          </div>
        </header>

        <main className="flex-1 px-6 py-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
