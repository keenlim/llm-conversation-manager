// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import ReactQueryProvider from '@/utils/reactqueryprovider';
import { Sidebar } from '@/components/Sidebar/Sidebar';

export const metadata = {
  title: 'My Chat Application',
  description: 'Application that performs CRUD operations on Chat',
};

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
            <main>{children}</main>
          </ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}