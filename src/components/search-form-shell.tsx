export function SearchFormShell() {
  return (
    <form className="search-shell" action="/services" method="get" role="search">
      <fieldset>
        <legend>Search the planned directory</legend>
        <div className="search-shell__fields">
          <label>
            <span>Service</span>
            <select name="service" defaultValue="">
              <option value="" disabled>
                Choose a service
              </option>
              <option value="mri">MRI</option>
              <option value="ultrasound">Ultrasound</option>
            </select>
          </label>
          <label>
            <span>Location</span>
            <select name="location" defaultValue="">
              <option value="" disabled>
                Choose a location
              </option>
              <option value="metro-vancouver">Metro Vancouver</option>
            </select>
          </label>
          <button type="submit">Browse services</button>
        </div>
      </fieldset>
      <p className="search-shell__note">
        Development shell only—no live clinic inventory or inquiry submission.
      </p>
    </form>
  );
}
