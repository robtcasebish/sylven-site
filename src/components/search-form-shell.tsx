import { regions } from "@/lib/directory";

export function SearchFormShell() {
  const firstRegion = regions[0];

  return (
    <form
      className="search-shell"
      action={`/locations/${firstRegion.provinceSlug}/${firstRegion.citySlug}`}
      method="get"
      role="search"
    >
      <fieldset>
        <legend>Start with a service</legend>
        <div className="search-shell__fields">
          <label>
            <span>Service</span>
            <select name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option value="mri">MRI</option>
              <option value="ultrasound">Ultrasound</option>
            </select>
          </label>
          <label>
            <span>Location</span>
            <select name="location" defaultValue="">
              <option value="" disabled>
                Select a location
              </option>
              {regions.map((region) => (
                <option key={region.citySlug} value={region.citySlug}>
                  {region.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">
            View directory <span aria-hidden="true">→</span>
          </button>
        </div>
      </fieldset>
      <p className="search-shell__note">
        Pilot search across published regions. Listings will show their
        source and last verification date before public release.
      </p>
    </form>
  );
}
