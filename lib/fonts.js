// Keep builds network-independent. If the brand fonts are installed or loaded
// by the host, the approved editorial faces win; otherwise the fallbacks keep
// the same serif/sans contrast without blocking production compilation.
export const headingFont = { variable: "font-display", className: "" };
export const bodyFont = { variable: "font-body", className: "" };
export const monoFont = { variable: "font-mono", className: "" };
