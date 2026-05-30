import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Search, Activity, Shield, CheckCircle } from "lucide-react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/ui/Card";
import { useProjects } from "../../context/ProjectContext";
import { getAnalytics } from "../../services/analyticsService";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-xl rounded-xl p-4 min-w-[200px]">
        <p className="text-sm font-medium text-[var(--text-secondary)] mb-3 pb-2 border-b border-[var(--border-subtle)]">
          <span className="font-mono">{label}</span>
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)]" />
            <span className="text-sm text-[var(--text-primary)] font-medium">Total Requests</span>
          </div>
          <span className="font-bold">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

function AnalyticsPage() {
  const { selectedProject } = useProjects();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedProject) return;
    loadAnalytics();
  }, [selectedProject]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalytics(selectedProject._id);
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-heading-l mb-2">Analytics</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Monitor traffic, blocked requests, and route usage.
        </p>
      </div>

      {/* NO PROJECT */}
      {!selectedProject && (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mb-6">
            <Search size={32} className="text-[var(--text-muted)]" />
          </div>
          <h2 className="text-heading-m mb-3">No Project Selected</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md">
            Please select a project from the top navigation to view its analytics.
          </p>
        </Card>
      )}

      {/* LOADING */}
      {selectedProject && loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* DATA */}
      {!loading && analytics && selectedProject && (
        <>
          <div className="mb-8 border-b border-[var(--border-subtle)] pb-6">
            <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
            <p className="text-[var(--text-secondary)] mt-1">Real-time rate limiting analytics</p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Total Requests</p>
                <div className="p-2 bg-[var(--bg-secondary)] rounded-lg text-[var(--text-primary)]">
                  <Activity size={20} />
                </div>
              </div>
              <h2 className="text-4xl font-bold">{analytics.totalRequests}</h2>
            </Card>

            <Card className="p-6 border-[var(--danger)]/30">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Blocked Requests</p>
                <div className="p-2 bg-[var(--danger)]/10 rounded-lg text-[var(--danger)]">
                  <Shield size={20} />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-[var(--danger)]">{analytics.blockedRequests}</h2>
            </Card>

            <Card className="p-6 border-[var(--success)]/30">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Successful Requests</p>
                <div className="p-2 bg-[var(--success)]/10 rounded-lg text-[var(--success)]">
                  <CheckCircle size={20} />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-[var(--success)]">{analytics.successfulRequests}</h2>
            </Card>
          </div>

          {/* ROUTE CHART */}
          <Card className="p-8 h-[450px]">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-1">Route Usage</h3>
              <p className="text-sm text-[var(--text-secondary)]">Requests grouped by route.</p>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.routeStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                  <XAxis 
                    dataKey="_id" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
                    content={<CustomTooltip />}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="var(--brand-primary)" 
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}
    </DashboardLayout>
  );
}

export default AnalyticsPage;