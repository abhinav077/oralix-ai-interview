import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "w-full",
          cardBox: "w-full shadow-none",
          card: "w-full rounded-[24px] border-2 border-[#1a1a1a] bg-[#ffffeb] shadow-none",
          header: "px-7 pt-8 sm:px-9 sm:pt-10",
          headerTitle: "font-heading text-3xl font-normal tracking-[-0.05em] text-[#1a1a1a]",
          headerSubtitle: "mt-2 text-sm leading-6 text-[#6d6d63]",
          socialButtonsBlockButton: "h-11 rounded-[12px] border-2 border-[#1a1a1a] bg-transparent text-[#1a1a1a] shadow-none transition hover:bg-[#f0d7ff]",
          socialButtonsBlockButtonText: "font-medium text-[#1a1a1a]",
          dividerLine: "bg-[#1a1a1a]/20",
          dividerText: "font-mono text-[0.63rem] lowercase tracking-[0.08em] text-[#6d6d63]",
          form: "gap-5",
          formFieldLabel: "text-sm font-medium text-[#1a1a1a]",
          formFieldInput: "h-11 rounded-[12px] border-2 border-[#1a1a1a]/30 bg-transparent text-[#1a1a1a] shadow-none placeholder:text-[#6d6d63] focus:border-[#034f46] focus:ring-2 focus:ring-[#034f46]/25",
          formFieldInputShowPasswordButton: "text-[#034f46] hover:text-[#1a1a1a]",
          formButtonPrimary: "h-11 rounded-[12px] border-2 border-[#1a1a1a] bg-[#f0d7ff] font-semibold text-[#1a1a1a] shadow-none transition hover:bg-white focus:ring-2 focus:ring-[#034f46]/40 focus:ring-offset-2 focus:ring-offset-[#ffffeb]",
          footer: "border-t-2 border-[#1a1a1a]/20 bg-[#ffffeb] px-7 py-5 sm:px-9",
          footerActionText: "text-sm text-[#6d6d63]",
          footerActionLink: "font-medium text-[#034f46] hover:text-[#1a1a1a]",
          identityPreviewText: "text-[#1a1a1a]",
          formResendCodeLink: "text-[#034f46] hover:text-[#1a1a1a]",
          alertText: "text-sm text-[#1a1a1a]",
        },
      }}
    />
  );
}
