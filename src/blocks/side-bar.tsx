import { useRoute } from "@antares/infra/routing";
import { SideBarItem } from "@antares/types";
import { Briefcase, FileText, PenTool, Target } from "lucide-react";

const ITEMS: SideBarItem[] = [
  {
    title: "Base Resume",
    icon: FileText,
    route: "/base-resume",
  },
  {
    title: "Experience",
    icon: Briefcase,
    route: "/experience",
  },
  {
    title: "Writing Style",
    icon: PenTool,
    route: "/writing-style",
  },
  {
    title: "Tailor for JD",
    icon: Target,
    route: "/tailor",
  },
];

export function SideBar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <Header />
      <div className="bg-sidebar-border mx-2 w-auto h-px" />
      <Content />
    </aside>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-2 p-3.5">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <div>
          <h2 className="font-semibold text-sidebar-foreground">Antares</h2>
          <p className="text-xs text-sidebar-foreground/70">CV Optimizer</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  const { route, navigate } = useRoute();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="flex flex-col gap-2">
          <ul className="flex w-full min-w-0 flex-col gap-1">
            {ITEMS.map(item => (
              <li
                key={item.title}
                className="relative"
              >
                <button
                  onClick={() => navigate(item.route)}
                  className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring ${route === item.route
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="truncate">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}