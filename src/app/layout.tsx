import type { Metadata } from "next";
import { StyledEngineProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import "@/app/globals.css";
import { SideNav } from "@/components/nav/SideNav";

export const metadata: Metadata = {
  title: "Frontend Proof-of-Concept Playground",
  description:
    "A test playground for frontend concepts related to React and frequently used libraries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppRouterCacheProvider
          options={{
            enableCssLayer: true,
            key: "css",
          }}
        >
          <StyledEngineProvider injectFirst={true}>
            <header>Frontend Proof-of-Concept Playground</header>

            <div className="page-layout">
              <SideNav />
              {children}
            </div>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
