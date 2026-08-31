type ConsentNoticeProps = {
  clinicNames?: string[];
};

export function ConsentNotice({ clinicNames = [] }: ConsentNoticeProps) {
  const hasRecipients = clinicNames.length > 0;

  return (
    <section className="consent-notice" aria-labelledby="consent-notice-title">
      <h2 id="consent-notice-title">Clinic-specific consent</h2>
      <p>
        {hasRecipients
          ? `An inquiry would be shared only with: ${clinicNames.join(", ")}.`
          : "No clinic recipients are selected in this development scaffold."}
      </p>
      <p>
        A future inquiry flow must name each receiving clinic and record separate
        consent before sharing minimal contact and logistical information.
      </p>
    </section>
  );
}
