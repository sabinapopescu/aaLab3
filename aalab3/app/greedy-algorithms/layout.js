export const metadata = {
    title: "Lab 7 – Minimum Spanning Trees (Prim & Kruskal)",
  };
  
  export default function PKLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
        <header className="p-4 shadow bg-white font-semibold">
        Lab 7 – Minimum Spanning Trees (Prim & Kruskal)
        </header>
        <main className="flex-1 p-4 grid lg:grid-cols-12 gap-4">
          {children}
        </main>
      </div>
    );
  }
  