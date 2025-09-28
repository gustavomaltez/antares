import { useEffect, useState } from "react";
import { RouteManager } from "./manager";

export function useRoute() {
  const [route, setRoute] = useState(RouteManager.route);

  useEffect(() => {
    return RouteManager.on("route-updated", () => {
      setRoute(RouteManager.route);
    });
  }, []);

  return {
    route,
    navigate: RouteManager.navigate,
  };
}