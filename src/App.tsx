import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function App() {
  return (
    <main className="flex flex-col h-full w-full bg-background text-foreground">

      <header className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Antares ✨🌌</h1>
          <p className="text-muted-foreground">CV Optimization Tool</p>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-64 bg-card border-r border-border p-4 flex flex-col space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Tools</h2>
            <Button variant="outline" className="w-full justify-start">
              Upload Resume
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Job Description
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Analyze CV
            </Button>
          </div>
          <div className="flex-1" />
          <div className="space-y-2">
            <Button className="w-full">
              Export CV
            </Button>
          </div>
        </nav>

        <section className="flex-1 p-6 bg-background">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Welcome to Antares
              </h2>
              <p className="text-lg text-muted-foreground">
                Transform your resume into a star that shines bright in the job market.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  🔄 Smart Reshaping
                </h3>
                <p className="text-muted-foreground">
                  Highlight what recruiters are really looking for with AI-powered analysis.
                </p>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  📊 ATS Compatible
                </h3>
                <p className="text-muted-foreground">
                  Ensure your CV passes applicant tracking systems with confidence.
                </p>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  🌟 Amplify Strengths
                </h3>
                <p className="text-muted-foreground">
                  Clear, concise, and tailored bullets that showcase your best qualities.
                </p>
              </div>
              
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  💡 Skill Gap Analysis
                </h3>
                <p className="text-muted-foreground">
                  Identify areas for growth and stand out from the competition.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
