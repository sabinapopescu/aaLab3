// File: app/dijkstra-floyd/layout.js
export const metadata = {
    title: "Lab 5 – Dijkstra & Floyd–Warshall",
  };
  
  export default function DijkstraFloydLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <header className="p-4 shadow bg-white font-semibold">
          Laboratory #5 – Dynamic Programming / Shortest‑Path Visualiser
        </header>
        <main className="flex-1 p-4 grid lg:grid-cols-12 gap-4">
          {children}
        </main>
      </div>
    );
  }
  