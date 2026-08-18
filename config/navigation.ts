import type { Language } from "@/translations";
import type { Translation } from "@/translations";

export interface NavItem {
  to:
    | "/"
    | "/about"
    | "/events"
    | "/team"
    | "/partners"
    | "/projects"
    | "/research"
    | "/contact";
  key: keyof Translation["nav"];
}

export const navItems: NavItem[] = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/events", key: "events" },
  { to: "/team", key: "team" },
  { to: "/partners", key: "partners" },
  { to: "/projects", key: "projects" },
  { to: "/research", key: "research" },
  { to: "/contact", key: "contact" },
];

/** Primary navbar links (Home, About, Events, Team, Partners, Contact). */
export const primaryNavItems: NavItem[] = navItems.filter((item) =>
  ["/", "/about", "/events", "/team", "/partners", "/contact"].includes(item.to),
);

export type { Language };
