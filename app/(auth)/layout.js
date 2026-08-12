export default function AuthLayout({ children }) {
  return (
    <section className="min-h-[100dvh] bg-background px-4 py-8 text-foreground sm:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-xl items-center">
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
