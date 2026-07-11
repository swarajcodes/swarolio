export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">~/</span>swarolio — Swaraj Mohapatra
        </p>
        <div className="flex gap-4 font-mono text-xs">
          <a
            href="https://github.com/swarajcodes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            github
          </a>
          <a
            href="mailto:swaraj081@gmail.com"
            className="text-muted transition-colors hover:text-accent"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
