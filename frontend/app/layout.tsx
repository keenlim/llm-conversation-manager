"use client"
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { AppShell, ColorSchemeScript, MantineProvider } from '@mantine/core';
import ReactQueryProvider from '@/utils/reactqueryprovider';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <ReactQueryProvider>
              <AppShell
                navbar = {{width: 300, breakpoint: 'sm'}}
                padding = "md"
               >
                  <AppShell.Navbar p = "md">
                    <Sidebar />
                  </AppShell.Navbar>
                  <AppShell.Main>{children}</AppShell.Main>
               </AppShell>
              
             
          </ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}