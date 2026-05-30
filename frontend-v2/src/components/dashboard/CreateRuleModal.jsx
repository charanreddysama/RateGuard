import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { createRule } from "../../services/ruleService";
import { useProjects } from "../../context/ProjectContext";
import { X } from "lucide-react";

function CreateRuleModal({ open, onClose, onCreated }) {
  const { selectedProject, projects } = useProjects();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    projectId: "",
    route: "",
    algorithm: "fixed_window",
    limit: 100,
    window: 60
  });

  useEffect(() => {
    if (selectedProject?._id) {
      setForm((prev) => ({ ...prev, projectId: selectedProject._id }));
    } else if (projects?.length > 0) {
      setForm((prev) => ({ ...prev, projectId: projects[0]._id }));
    }
  }, [selectedProject, projects, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.projectId) {
      toast.error("Please select a project");
      return;
    }

    try {
      setLoading(true);
      await createRule({
        projectId: form.projectId,
        route: form.route,
        algorithm: form.algorithm,
        limit: Number(form.limit),
        window: Number(form.window)
      });
      toast.success("Rule created successfully");
      onCreated();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create rule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-2xl p-6 overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
                  Create Rule
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Configure a new rate limiting rule.
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={loading}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Project</label>
                <select
                  name="projectId"
                  value={form.projectId}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:border-[var(--brand-primary)]"
                >
                  <option value="" disabled>Select a project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Route Path</label>
                <Input
                  name="route"
                  value={form.route}
                  placeholder="e.g. /api/users/login"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Algorithm</label>
                <select
                  name="algorithm"
                  value={form.algorithm}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-sm focus:outline-none focus:border-[var(--brand-primary)]"
                >
                  <option value="fixed_window">Fixed Window</option>
                  <option value="sliding_window">Sliding Window</option>
                  <option value="token_bucket">Token Bucket</option>
                  <option value="leaky_bucket">Leaky Bucket</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Limit (reqs)</label>
                  <Input
                    type="number"
                    name="limit"
                    value={form.limit}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Window (secs)</label>
                  <Input
                    type="number"
                    name="window"
                    value={form.window}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                  className="px-5"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="px-6">
                  {loading ? "Creating..." : "Create Rule"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CreateRuleModal;