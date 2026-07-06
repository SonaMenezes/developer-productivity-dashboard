function PortalSelection({ setPortal }) {
  return (
    <div className="portal-page">
      <div className="portal-card">

        <h1>Productivity Hub</h1>

        <p>
          Select your workspace
        </p>

        <div
          className="portal-option"
          onClick={() =>
            setPortal("admin")
          }
        >
          <h2> Admin Portal</h2>
        </div>

        <div
          className="portal-option"
          onClick={() =>
            setPortal("developer")
          }
        >
          <h2> Developer Portal</h2>
        </div>

      </div>
    </div>
  );
}

export default PortalSelection;