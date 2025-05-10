// app/layout.js

export const metadata = {
    title: 'Graph Algorithms Lab',
    description: 'Empirical analysis of DFS, BFS, Dijkstra, etc.',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  