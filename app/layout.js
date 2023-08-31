import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import AlertComponent from "@/components/alert_system/AlertComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EI5LI5",
  description: "A simplified learning management system.",
};
// This is the root layout for all pages. The only thing we add here is the
// provider and the alert component. The alert component is added here below the
// children to ensure it will always have the highest z-index.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <AlertComponent />
        </Providers>
      </body>
    </html>
  );
}
