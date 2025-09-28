import { ThemeToggle } from "@antares/components/theme-toggle";
import { SideBar } from "@antares/blocks/side-bar";
import { Content } from "@antares/pages/content";

export default function App() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <SideBar />
      <main className="bg-background relative flex w-full flex-1 flex-col">
        <header className="flex items-center justify-end p-4 sticky top-0 z-10">
          <ThemeToggle />
        </header>
        <div className="flex-1 p-6 bg-background">
          <Content />
        </div>
      </main>
    </div>
  );
}