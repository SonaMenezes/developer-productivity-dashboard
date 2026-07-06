export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <h2>Developer Productivity Dashboard</h2>
      </header>

      <main>{children}</main>

      <footer>
        <p>Internship Project</p>
      </footer>
    </div>
  );
}