import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "start" | "split";
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "start",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children ? <div className="section-heading__copy">{children}</div> : null}
    </div>
  );
}
