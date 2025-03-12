import { LanguageProvider } from "@/context/languageContext";
import clsx from "clsx";
import type { Metadata } from "next";
import "../styles/style.scss";

export const metadata: Metadata = {
  title: "My portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={clsx("flex min-h-[100vh] flex-col bg-slate-100")}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
