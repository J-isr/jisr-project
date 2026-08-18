export type SocialPlatform = "instagram" | "tiktok" | "linkedin" | "x" | "youtube";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  /** Only active platforms are rendered publicly. */
  active: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/jisr.club.kfu?igsh=bTd3cjlrOGNtaDk4",
    active: true,
  },
  {
    platform: "tiktok",
    label: "TikTok",
    url: "https://www.tiktok.com/@jisr.club.kfu?_r=1&_t=ZS-98KVmkBwemq",
    active: true,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/jisrclubkfu?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    active: true,
  },
  { platform: "x", label: "X", url: "", active: false },
  { platform: "youtube", label: "YouTube", url: "", active: false },
];

export const activeSocialLinks = socialLinks.filter((l) => l.active && l.url);
