import { Route, RouteEvent, RouteEventCallback } from "./types";

class RouteManagerSingleton {
  private static _instance: RouteManagerSingleton;

  public static get instance() {
    if (!this._instance) {
      this._instance = new RouteManagerSingleton();
    }
    return this._instance;
  }

  constructor() {
    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.navigate = this.navigate.bind(this);
    this.sync();
  }

  private events: Record<RouteEvent, RouteEventCallback[]> = {
    "route-updated": [],
  };

  public on(event: RouteEvent, callback: RouteEventCallback) {
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  private emit(event: RouteEvent) {
    for (const callback of this.events[event]) {
      callback();
    }
  }

  private sync() {
    window.addEventListener("popstate", () => {
      this.emit("route-updated");
    });
  }

  public get currentRoute(): Route {
    return window.location.pathname;
  }

  public navigate(route: Route, replace = false) {
    const fullRoute = route.startsWith("/") ? route : `/${route}`;

    if (replace) {
      window.history.replaceState(null, "", fullRoute);
    } else {
      window.history.pushState(null, "", fullRoute);
    }

    this.emit("route-updated");
  }
}

export const RouteManager = RouteManagerSingleton.instance;