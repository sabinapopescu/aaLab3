export default function AlgorithmSelector({ value, onChange }) {
    return (
      <label className="block">
        <span className="text-sm font-medium">Algorithm</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="prim">Prim</option>
          <option value="kruskal">Kruskal</option>
        </select>
      </label>
    );
  }
  