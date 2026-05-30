import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Copy, Activity, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useProjects } from "../../context/ProjectContext";
import { getAnalytics } from "../../services/analyticsService";

import { deleteProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { projects, fetchProjects, setSelectedProject, selectedProject } = useProjects();
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();

  const project = projects.find((p) => p._id === projectId);

  useEffect(() => {
    if (!projectId) return;
    loadAnalytics();
  }, [projectId]);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics(projectId);
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(project.apiKey);
    toast.success("API key copied to clipboard");
  };

  const handleDeleteProject = async () => {
    if (window.confirm(`Are you sure you want to delete ${project.name}? All rules and analytics will be permanently lost.`)) {
      try {
        await deleteProject(projectId);
        toast.success("Project deleted successfully");
        await fetchProjects();
        
        // If the deleted project was the currently selected one, clear it
        if (selectedProject?._id === projectId) {
          setSelectedProject(null);
        }
        
        navigate("/dashboard/projects");
      } catch (error) {
        toast.error("Failed to delete project");
        console.error(error);
      }
    }
  };

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  const successRate = analytics?.totalRequests > 0
    ? ((analytics.successfulRequests / analytics.totalRequests) * 100).toFixed(1)
    : 0;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link to="/dashboard/projects" className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Projects
        </Link>
        <h1 className="text-heading-l mb-2">{project.name}</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Manage API access, view specific analytics, and configure rules.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* API KEY CARD */}
        <Card className="lg:col-span-2 p-8">
          <h3 className="text-xl font-bold mb-2">API Credentials</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Use this key to authenticate your requests with the RateGuard SDK or API.
          </p>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-4 mb-6">
            <p className="font-mono text-sm break-all text-[var(--text-primary)]">
              {project.apiKey}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={copyApiKey} className="gap-2">
              <Copy size={16} />
              Copy API Key
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteProject} 
              className="gap-2 bg-[var(--danger)]/10 text-[var(--danger)] hover:bg-[var(--danger)]/20 border-0"
            >
              Delete Project
            </Button>
          </div>
        </Card>

        {/* QUICK STATS */}
        <Card className="p-8">
          <h3 className="text-xl font-bold mb-6">Analytics Overview</h3>
          {analytics ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Activity size={18} /> <span>Total Requests</span>
                </div>
                <span className="font-bold">{analytics.totalRequests}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Shield size={18} className="text-[var(--danger)]" /> <span>Blocked</span>
                </div>
                <span className="font-bold">{analytics.blockedRequests}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <AlertCircle size={18} className="text-[var(--success)]" /> <span>Success Rate</span>
                </div>
                <span className="font-bold text-[var(--success)]">{successRate}%</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin w-5 h-5 border-2 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ProjectDetailsPage;