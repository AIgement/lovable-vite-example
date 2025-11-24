import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/about", label: "About" },
];

export const Sidebar = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-4 border-b border-line1">
        <div className="title-h2">Lovable</div>
        <p className="caption text-text3 mt-1">Vite + Tailwind Template</p>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-5 py-3 body-m transition-colors",
                    isActive ? "bg-bg2 text-text1" : "text-text2 hover:bg-bg2"
                  )
                }
              >
                <span className="w-2 h-2 rounded-full bg-line1" aria-hidden />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-5 py-4 border-t border-line1">
        <p className="caption text-text3">PLYN v1.2 – Dark</p>
        <p className="caption text-text2">Import flow: shared → features → pages → app</p>
      </div>
    </div>
  );
};
