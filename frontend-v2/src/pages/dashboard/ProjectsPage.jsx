import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import CreateProjectModal from "../../components/dashboard/CreateProjectModal";
import { useProjects } from "../../context/ProjectContext";
import { Link } from "react-router-dom";
import { Layers3, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const { projects, loading } = useProjects();
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    toast.success("API Key copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <DashboardLayout>
      <CreateProjectModal open={open} onClose={() => setOpen(false)} />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-heading-l mb-2">Projects</h1>
          <p className="text-body text-[var(--text-secondary)]">
            Manage APIs, environments, and distributed rate limiting projects.
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>Create Project</Button>
      </div>

      {/* STATE: LOADING */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* STATE: EMPTY */}
      {!loading && projects.length === 0 && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
            <Layers3 size={32} className="text-[var(--text-muted)]" />
          </div>
          <h2 className="text-heading-m mb-3">No Projects Found</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md">
            You don't have any projects yet. Create your first RateGuard project to start protecting your APIs.
          </p>
          <Button onClick={() => setOpen(true)}>Create Project</Button>
        </Card>
      )}

      {/* STATE: LIST */}
      {!loading && projects.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} hover className="flex flex-col p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">{project.name}</h2>
                  <div className="inline-flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Active</span>
                  </div>
                </div>
                <div className="p-2 bg-[var(--bg-secondary)] rounded-lg">
                  <Layers3 size={18} className="text-[var(--text-muted)]" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">API KEY</p>
                <div className="flex items-center justify-between bg-[var(--bg-secondary)] px-3 py-2 rounded border border-[var(--border-subtle)]">
                  <span className="font-mono text-sm truncate mr-2">{project.apiKey}</span>
                  <button 
                    onClick={() => handleCopy(project.apiKey)}
                    className="p-1 hover:bg-[var(--border-subtle)] rounded transition-colors"
                  >
                    {copiedKey === project.apiKey ? (
                      <CheckCircle2 size={16} className="text-[var(--success)]" />
                    ) : (
                      <Copy size={16} className="text-[var(--text-secondary)]" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  to={`/dashboard/projects/${project._id}`}
                  className="inline-flex items-center text-sm font-medium text-[var(--brand-primary)] hover:text-[var(--brand-hover)] transition-colors"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProjectsPage;