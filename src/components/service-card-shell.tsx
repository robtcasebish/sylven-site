import Link from "next/link";

type ServiceCardShellProps = {
  title: string;
  description: string;
  href: string;
};

export function ServiceCardShell({
  title,
  description,
  href,
}: ServiceCardShellProps) {
  return (
    <article className="service-card">
      <p className="card-kicker">Planned directory category</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={href}>View development page</Link>
    </article>
  );
}
