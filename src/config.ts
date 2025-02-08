import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://acfun.win/", // replace this with your deployed domain
  author: "Hantong Chen",
  profile: "https://acfun.win/",
  desc: "Hantong Chen's Blog, collecting my thoughts on programming, tech, and life.",
  title: "Hantong",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false,
  gif: true,
  width: 48,
  height: 48,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/cxw620",
    linkTitle: `${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:cxwdyx620@gmail.com",
    linkTitle: `Email me`,
    active: true,
  },
  {
    name: "Linux.do",
    href: "https://linux.do/u/hantong",
    linkTitle: `${SITE.title} on Linux.do`,
    active: true,
  },
];
