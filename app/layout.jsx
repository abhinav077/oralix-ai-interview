import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from '@clerk/nextjs'
import { ui } from "@clerk/ui";
import Header from "@/components/Header";
import FirstVisitIntro from "@/components/FirstVisitIntro";
import { Toaster } from "sonner";

export const metadata = {
  title: "Oralix",
  description: "Practice with experienced interviewers. Earn by becoming one.",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider ui={ui}>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-background text-foreground">
          <div className="min-h-dvh bg-background">
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>

              <Header/>

              <FirstVisitIntro />

              <main className="max-w-full">{children}</main>

              <Toaster richColors/>

            </ThemeProvider>
            </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
