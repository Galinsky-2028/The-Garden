import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section wrap">
      <h1>Page not found</h1>
      <p>The page you asked for does not exist on this site.</p>
      <Link href="/">Return to The Garden</Link>
    </div>
  );
}
