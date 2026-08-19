// Shared OS badge icons — used wherever a plugin's supported platforms are
// listed (Sentinella detail page, homepage plugins section, etc).
export function AppleIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 384 512"
      className="h-3 w-3 shrink-0 fill-current"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.7-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 8 184.5 8 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-65.7-90-65.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function WindowsIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 448 512"
      className="h-3 w-3 shrink-0 fill-current"
    >
      <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.7H448V32L203.8 65.7z" />
    </svg>
  );
}

export function osIcon(os: string) {
  if (os.toLowerCase().includes("windows")) return <WindowsIcon />;
  if (os.toLowerCase().includes("macos")) return <AppleIcon />;
  return null;
}
