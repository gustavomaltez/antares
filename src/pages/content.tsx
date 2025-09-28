import { useRoute } from "@antares/infra/routing";
import { Home } from "./home";
import { Resume } from "./resume";
import { Experience } from "./experience";
import { WritingStyle } from "./writing-style";
import { Tailor } from "./tailor";

export function Content() {
  const { route } = useRoute();

  switch (route) {
    case "/base-resume":
      return <Resume />;
    case "/experience":
      return <Experience />;
    case "/writing-style":
      return <WritingStyle />;
    case "/tailor":
      return <Tailor />;
    default:
      return <Home />;
  }
}