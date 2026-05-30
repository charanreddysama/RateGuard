import { useEffect, useState } from "react";
import { Trash2, Shield, Search } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import CreateRuleModal from "../../components/dashboard/CreateRuleModal";
import { useProjects } from "../../context/ProjectContext";
import { getProjectRules, deleteRule } from "../../services/ruleService";

function RulesPage() {
  const { selectedProject } = useProjects();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!selectedProject) return;
    loadRules();
  }, [selectedProject]);

  const loadRules = async () => {
    try {
      setLoading(true);
      const data = await getProjectRules(selectedProject._id);
      setRules(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load rules");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ruleId) => {
    try {
      await deleteRule(ruleId);
      toast.success("Rule deleted successfully");
      loadRules();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <CreateRuleModal open={open} onClose={() => setOpen(false)} onCreated={loadRules} />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-heading-l mb-2">Security Rules</h1>
          <p className="text-body text-[var(--text-secondary)]">
            Manage distributed rate limiting rules and protection algorithms.
          </p>
        </div>
        <Button onClick={() => setOpen(true)} disabled={!selectedProject}>Create Rule</Button>
      </div>

      {/* NO PROJECT STATE */}
      {!selectedProject && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
            <Search size={32} className="text-[var(--text-muted)]" />
          </div>
          <h2 className="text-heading-m mb-3">No Project Selected</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md">
            Please select a project from the top navigation to view and manage its rules.
          </p>
        </Card>
      )}

      {/* LOADING STATE */}
      {selectedProject && loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && selectedProject && rules.length === 0 && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--brand-primary)]/10 rounded-full flex items-center justify-center mb-6">
            <Shield size={32} className="text-[var(--brand-primary)]" />
          </div>
          <h2 className="text-heading-m mb-3">No Rules Configured</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md">
            Create your first rate limiting rule to protect your API endpoints.
          </p>
          <Button onClick={() => setOpen(true)}>Create Rule</Button>
        </Card>
      )}

      {/* TABLE */}
      {!loading && rules.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)]">Route</th>
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)]">Algorithm</th>
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)]">Limit</th>
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)]">Window (s)</th>
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)]">Status</th>
                  <th className="py-4 px-6 font-semibold text-sm text-[var(--text-secondary)] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {rules.map((rule) => (
                  <tr key={rule._id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm text-[var(--brand-primary)]">{rule.route}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                        {rule.algorithm}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">{rule.limit}</td>
                    <td className="py-4 px-6 text-sm text-[var(--text-secondary)]">{rule.window}s</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
                        <span className="text-xs font-medium text-[var(--success)]">Active</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(rule._id)}
                        className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-md transition-colors inline-flex"
                        title="Delete Rule"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default RulesPage;