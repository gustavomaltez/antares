import { useRoute } from "@antares/infra/routing";
import { Home } from "./home";
import { BaseResumeContent } from "./base-resume";
import { ExperienceContent } from "./experience";
import { WritingStyleContent } from "./writing-style";
import { TailorContent } from "./tailor";

export function Content() {
  const { route } = useRoute();

  switch (route) {
    case "/base-resume":
      return <BaseResumeContent />;
    case "/experience":
      return <ExperienceContent />;
    case "/writing-style":
      return <WritingStyleContent />;
    case "/tailor":
      return <TailorContent />;
    default:
      return <Home />;
  }
}