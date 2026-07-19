import Link from "next/link";

type ServiceCardShellProps = {
  title: string;
  description: string;
  href: string;
  index?: string;
};

export function ServiceCardShell({
  title,
  description,
  href,
  index = "01",
}: ServiceCardShellProps) {
  return (
    <article className="service-card">
      <div className="service-card__topline">
        <p className="card-kicker">Pilot service</p>
        <span className="service-card__index" aria-hidden="true">{index}</span>
      </div>
      <h3><Link href={href}>{title}</Link></h3>
      <p>{description}</p>
      <Link className="text-link" href={href}>
        Explore {title} <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
