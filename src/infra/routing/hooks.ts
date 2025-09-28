import { useEffect, useState } from "react";
import { RouteManager } from "./manager";

export function useRoute() {
  const [route, setRoute] = useState(RouteManager.currentRoute);

  useEffect(() => {
    return RouteManager.on("route-updated", () => {
      setRoute(RouteManager.currentRoute);
    });
  }, []);

  return {
    route,
    navigate: RouteManager.navigate,
  };
}