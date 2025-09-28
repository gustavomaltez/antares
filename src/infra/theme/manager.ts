import { Theme, ThemeEvent, ThemeEventCallback } from "./types";

const STORAGE_KEY = "antares-theme";

class ThemeManagerSingleton {
  private static _instance: ThemeManagerSingleton;

  public static get instance() {
    if (!this._instance) {
      this._instance = new ThemeManagerSingleton();
    }
    return this._instance;
  }

  constructor() {
    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.sync();
  }

  private events: Record<ThemeEvent, ThemeEventCallback[]> = {
    "theme-updated": [],
  };

  public on(event: ThemeEvent, callback: ThemeEventCallback) {
    this.events[event].push(callback);
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  private emit(event: ThemeEvent) {
    for (const callback of this.events[event]) {
      callback();
    }
  }

  private sync() {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(this.theme);
  }

  public get theme(): Theme {
    return (localStorage.getItem(STORAGE_KEY) as Theme) || this.getSystemTheme();
  }

  private getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  public toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, newTheme);
    this.sync();
    this.emit("theme-updated");
  }
}

export const ThemeManager = ThemeManagerSingleton.instance;