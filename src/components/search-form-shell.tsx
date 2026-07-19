export function SearchFormShell() {
  return (
    <form
      className="search-shell"
      action="/locations/british-columbia/metro-vancouver"
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
              <option value="metro-vancouver">Metro Vancouver</option>
            </select>
          </label>
          <button type="submit">
            View directory <span aria-hidden="true">→</span>
          </button>
        </div>
      </fieldset>
      <p className="search-shell__note">
        Pilot search for Metro Vancouver. Listings will show their source and
        last verification date before public release.
      </p>
    </form>
  );
}
