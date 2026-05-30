import { Copy, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/ui/Card";
import { useProjects } from "../../context/ProjectContext";

function ApiKeysPage() {
  const { projects, loading } = useProjects();
  const [copiedKey, setCopiedKey] = useState(null);

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    toast.success("API key copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-heading-l mb-2">API Keys</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Manage API keys used by your projects to authenticate with RateGuard middleware.
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={32} className="text-[var(--text-muted)]" />
          </div>
          <h2 className="text-heading-m mb-3">No API Keys Found</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md">
            You don't have any projects yet. Create a project to generate an API key.
          </p>
        </Card>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="flex flex-col p-6 border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    {project.name}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">Standard Rate Limiting Key</p>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 mb-6 relative">
                <p className="font-mono text-sm text-[var(--text-primary)] break-all pr-10">
                  {project.apiKey}
                </p>
                <button
                  onClick={() => copyKey(project.apiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-[var(--border-subtle)] rounded-lg transition-colors"
                >
                  {copiedKey === project.apiKey ? (
                    <CheckCircle2 size={18} className="text-[var(--success)]" />
                  ) : (
                    <Copy size={18} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ApiKeysPage;