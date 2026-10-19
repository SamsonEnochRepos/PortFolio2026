"use client";

import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import { Magnetic } from "./Magnetic";

const icons = { GitHub: GithubIcon, LinkedIn: LinkedinIcon, X: XIcon } as const;

/** The social links from `site.socials`, shared by the profile card and the phone bar. */
export function SocialLinks({
  linkClass,
  iconClass,
  magnetic = false,
}: {
  linkClass: string;
  iconClass: string;
  /** wrap each link in the cursor-following Magnetic effect (desktop card only) */
  magnetic?: boolean;
}) {
  return site.socials.map((s) => {
    const Icon = icons[s.label as keyof typeof icons];
    const link = (
      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={linkClass}>
        <Icon className={iconClass} />
      </a>
    );
    return magnetic ? (
      <Magnetic key={s.label} strength={0.5}>
        {link}
      </Magnetic>
    ) : (
      <span key={s.label} className="contents">
        {link}
      </span>
    );
  });
}
