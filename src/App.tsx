import { ThemeToggle } from "@antares/components/theme-toggle";
import { useRoute } from "@antares/infra/routing";
import { FileText, Briefcase, PenTool, Target } from "lucide-react";

const ITEMS = [
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

export default function App() {
  const { navigate, route } = useRoute();

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Sidebar Header */}
        <div className="flex flex-col gap-2 p-3.5">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <div>
              <h2 className="font-semibold text-sidebar-foreground">Antares</h2>
              <p className="text-xs text-sidebar-foreground/70">CV Optimizer</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="bg-sidebar-border mx-2 w-auto h-px" />

        {/* Sidebar Content */}
        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="flex flex-col gap-2">
              <ul className="flex w-full min-w-0 flex-col gap-1">
                {ITEMS.map((item) => (
                  <li key={item.title} className="relative">
                    <button 
                      onClick={() => navigate(item.route)}
                      className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                        route === item.route
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                          : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bg-background relative flex w-full flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-end p-4 sticky top-0 z-10">
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-background">
          {/* Show different content based on route */}
          {route === "/" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Welcome to Antares
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Your CV optimization companion that makes you shine as bright as the stars in the night sky.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Smart Reshaping
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Highlight what recruiters are really looking for with AI-powered analysis that understands job market trends.
                  </p>
                </div>

                <div className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      ATS Compatible
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Ensure your CV passes applicant tracking systems with confidence and reaches human recruiters.
                  </p>
                </div>

                <div className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <PenTool className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Amplify Strengths
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Clear, concise, and tailored content that showcase your best qualities and achievements.
                  </p>
                </div>

                <div className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">
                      Skill Gap Analysis
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Identify areas for growth and get recommendations to stand out from the competition.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6">
                  Start Optimizing Your CV
                </button>
                <p className="text-sm text-muted-foreground">
                  100% local processing • Your data never leaves your machine
                </p>
              </div>
            </div>
          )}

          {route === "/base-resume" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Base Resume</h1>
              <p className="text-muted-foreground">Upload and manage your base resume here.</p>
            </div>
          )}

          {route === "/experience" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Experience</h1>
              <p className="text-muted-foreground">Manage your work experience and achievements.</p>
            </div>
          )}

          {route === "/writing-style" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Writing Style</h1>
              <p className="text-muted-foreground">Configure your preferred writing style and tone.</p>
            </div>
          )}

          {route === "/tailor" && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Tailor for Job Description</h1>
              <p className="text-muted-foreground">Upload a job description and tailor your resume.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}