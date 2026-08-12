import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "w-full",
          cardBox: "w-full shadow-none",
          card: "w-full rounded-lg border bg-card text-card-foreground shadow-sm",
          header: "px-6 pt-6",
          headerTitle: "text-2xl font-semibold tracking-tight",
          headerSubtitle: "mt-2 text-sm text-muted-foreground",
          socialButtonsBlockButton: "h-11 rounded-md border border-input bg-background shadow-none transition hover:bg-accent hover:text-accent-foreground",
          socialButtonsBlockButtonText: "font-medium",
          dividerLine: "bg-border",
          dividerText: "text-xs text-muted-foreground",
          form: "gap-5",
          formFieldLabel: "text-sm font-medium",
          formFieldInput: "h-11 rounded-md border border-input bg-background shadow-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/25",
          formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
          formButtonPrimary: "h-11 rounded-md bg-primary font-semibold text-primary-foreground shadow-none transition hover:bg-primary/90",
          footer: "border-t bg-muted/40 px-6 py-5",
          footerActionText: "text-sm text-muted-foreground",
          footerActionLink: "font-medium text-primary hover:underline",
          identityPreviewText: "text-foreground",
          formResendCodeLink: "text-primary hover:underline",
          alertText: "text-sm text-foreground",
        },
      }}
    />
  );
}
