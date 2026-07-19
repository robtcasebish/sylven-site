import type { ReactNode } from "react";

type ClinicCardShellProps = {
  title: string;
  children: ReactNode;
};

export function ClinicCardShell({ title, children }: ClinicCardShellProps) {
  const headingId = `clinic-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="clinic-card" aria-labelledby={headingId}>
      <div className="clinic-card__status">
        <span className="status-dot" aria-hidden="true" />
        Listing preview
      </div>
      <h3 id={headingId}>{title}</h3>
      <div>{children}</div>
    </article>
  );
}
