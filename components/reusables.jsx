export const GrayTitle = ({ children }) => (
    <span className="text-foreground">
        {children}
    </span>)

export const GoldTitle = ({ children }) => (
    <span className="text-[#034f46]">
        {children}
    </span>)

export const SectionLabel = ({ children }) => (
    <p className="editorial-label">
        <span className="h-px w-5 bg-current"/>
        {children}
    </p>);

export const SectionHeading = ({ gray, gold }) => (
    <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.045em]">
        <GrayTitle>{gray}</GrayTitle>
        <br/>
        <GoldTitle>{gold}</GoldTitle>
    </h2>
);

export default function PageHeader({ label, gray, gold, description, right }) {
  return (
    <div className="border-b border-border/80 bg-background px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
        <div>
          {label && <SectionLabel>{label}</SectionLabel>}
          <h1 className="mt-1 font-heading text-[clamp(2.25rem,5vw,4.75rem)] leading-none tracking-[-0.05em]">
            {gray && <GrayTitle>{gray} </GrayTitle>}
            {gold && <GoldTitle>{gold}</GoldTitle>}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d6d63]">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </div>
  );
}
