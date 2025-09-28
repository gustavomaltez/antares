import { Briefcase, FileText, LucideIcon, PenTool, Target } from "lucide-react";

const FEATURES = [
  {
    title: "Smart Reshaping",
    description: "Highlight what recruiters are really looking for with AI-powered analysis that understands job market trends.",
    icon: FileText,
  },
  {
    title: "ATS Compatible", 
    description: "Ensure your CV passes applicant tracking systems with confidence and reaches human recruiters.",
    icon: Target,
  },
  {
    title: "Amplify Strengths",
    description: "Clear, concise, and tailored content that showcase your best qualities and achievements.",
    icon: PenTool,
  },
  {
    title: "Skill Gap Analysis",
    description: "Identify areas for growth and get recommendations to stand out from the competition.",
    icon: Briefcase,
  },
];

export function Home() {
  return (
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
        {FEATURES.map((feature) => (
          <Item
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
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
  );
}

function Item(
  { title, description, icon: Icon }: {
    title: string;
    description: string;
    icon: LucideIcon;
  }
) {
  return (
    <div className="group p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}