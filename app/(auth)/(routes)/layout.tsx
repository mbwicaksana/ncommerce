export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout untuk halaman sign-in dan sign-up
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}
