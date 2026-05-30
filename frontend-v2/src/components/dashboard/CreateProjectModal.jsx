import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { createProject } from "../../services/projectService";
import { useProjects } from "../../context/ProjectContext";
import { X } from "lucide-react";

function CreateProjectModal({ open, onClose }) {
  const { fetchProjects } = useProjects();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setLoading(true);
      await createProject({ name });
      await fetchProjects();
      toast.success("Project created successfully");
      setName("");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
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
                  Create Project
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Add a new API infrastructure project.
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                  Project Name
                </label>
                <Input
                  name="name"
                  value={name}
                  placeholder="e.g. Production API"
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-2">
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
                  {loading ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CreateProjectModal;