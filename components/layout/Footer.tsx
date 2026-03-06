import Link from "next/link";

const footerLinks = {
  Platform: [
    { href: "/analysis", label: "Startup Analysis" },
    { href: "/funding", label: "Funding Tracker" },
    { href: "/signals", label: "Signal Tracker" },
    { href: "/landscape", label: "VC Landscape" },
    { href: "/playbooks", label: "Playbooks" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/newsletter", label: "Newsletter" },
  ],
  Connect: [
    { href: "https://linkedin.com/in/asit-anurag", label: "LinkedIn", external: true },
    { href: "mailto:asit.anurag@gmail.com", label: "Email", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-nucleus-border bg-nucleus-dark">
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-nucleus-accent">
                <span className="font-mono text-xs font-bold text-white">N</span>
              </div>
              <span className="font-display text-lg tracking-tight">Nucleus</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-nucleus-text-muted">
              The intelligence core of European venture capital.
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-nucleus-text-muted">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-nucleus-text-secondary transition-colors hover:text-nucleus-text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-nucleus-text-secondary transition-colors hover:text-nucleus-text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-nucleus-border pt-6 text-xs text-nucleus-text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} Nucleus. All rights reserved.</p>
          <p>Built by Asit Anurag</p>
        </div>
      </div>
    </footer>
  );
}
