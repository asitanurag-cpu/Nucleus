import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl text-nucleus-accent">404</h1>
      <h2 className="mt-4 font-display text-2xl tracking-tight text-nucleus-text-primary">
        Page not found
      </h2>
      <p className="mt-2 text-sm text-nucleus-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-button bg-nucleus-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-nucleus-accent-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
