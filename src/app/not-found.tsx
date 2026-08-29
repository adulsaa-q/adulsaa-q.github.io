import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell not-found-page">
      <p className="not-found-page__code">404 / RECORD NOT FOUND</p>
      <h1>This record is not in the archive.</h1>
      <p>
        The address may be incomplete, or the project may not be part of this public
        work record.
      </p>
      <nav aria-label="404 recovery routes">
        <Link className="text-link" href="/">
          Return home
        </Link>
        <Link className="text-link" href="/work">
          Browse work
        </Link>
      </nav>
    </main>
  );
}
