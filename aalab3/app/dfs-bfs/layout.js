// app/dfs-bfs/layout.js

export const metadata = {
  title: "Lab 3 – DFS & BFS Explorer",
};

export default function DfsBfsLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="p-4 shadow bg-white font-semibold">
        Laboratory #3 – Traversal Algorithms / DFS & BFS Explorer
      </header>
      <main className="flex-1 p-4 grid lg:grid-cols-12 gap-4">
        {children}
      </main>
    </div>
  );
}
