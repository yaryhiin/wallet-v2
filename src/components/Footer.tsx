const Footer = () => {
  return (
    <footer className="text-[var(--text-secondary)] fixed bottom-5 z-1000 flex flex-col items-center justify-center">
      <p>
        Built by{" "}
        <a
          className="text-[var(--text-muted)]"
          href="https://yaryhin.com"
          target="_blank"
          aria-label="Tim Yaryhin Portfolio"
          rel="noreferrer"
        >
          Tim Yaryhin
        </a>
      </p>
      <p>Wallet App &copy; 2026</p>
    </footer>
  );
};

export default Footer;
