import { Copy, Terminal } from "lucide-react";
import toast from "react-hot-toast";

function CodeBlock({ code, title = "Example", language = "bash" }) {
  const copy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[#0d1117]">
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Terminal size={14} />
          {title}
        </div>
        <button
          onClick={copy}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          <Copy size={16} />
        </button>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;