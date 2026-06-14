import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDashboardStats } from "../../services/dashboardService";
import Card from "../../components/ui/Card";
import { Shield, Layers3, Activity, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-[var(--brand-primary)] border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-[var(--text-secondary)]">Unable to load dashboard data. Please try refreshing.</p>
        </div>
      </DashboardLayout>
    );
  }

  const successRate = stats.totalRequests > 0
    ? ((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1)
    : 0;

  const kpis = [
    { title: "Total Projects", value: stats.totalProjects, icon: Layers3 },
    { title: "Total Requests", value: stats.totalRequests, icon: Activity },
    { title: "Blocked Requests", value: stats.blockedRequests, icon: Shield, color: "text-[var(--danger)]" },
    { title: "Success Rate", value: `${successRate}%`, icon: AlertCircle, color: "text-[var(--success)]" }
  ];

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-heading-l mb-2">Dashboard Overview</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Real-time metrics and activity across your distributed API infrastructure.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-[var(--text-secondary)]">{kpi.title}</p>
                <div className={`p-2 rounded-lg bg-[var(--bg-secondary)] ${kpi.color || 'text-[var(--text-primary)]'}`}>
                  <Icon size={18} />
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{kpi.value}</h2>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* RECENT PROJECTS & TOP ROUTES */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Projects</h3>
            {stats.recentProjects?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentProjects.map((p) => (
                  <Link key={p._id} to={`/dashboard/projects/${p._id}`} className="block border border-[var(--border-subtle)] rounded-lg p-4 hover:border-[var(--brand-primary)]/30 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded">Active</div>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-2 font-mono truncate">{p.apiKey}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-sm text-[var(--text-muted)]">No projects yet.</div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Top Rate-Limited Routes</h3>
            {stats.topRoutes?.length > 0 ? (
              <div className="space-y-4">
                {stats.topRoutes.map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)] last:border-0">
                    <span className="font-mono text-sm text-[var(--brand-primary)]">{r._id}</span>
                    <span className="text-sm font-medium">{r.count} requests</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-[var(--text-muted)]">No route data available.</div>
            )}
          </Card>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
            {stats.recentActivity?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentActivity.map((act) => (
                  <div key={act._id} className="flex items-start space-x-3 text-sm border-l-2 border-[var(--border-subtle)] pl-3 ml-1 pb-4 last:pb-0">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-[var(--text-primary)]">{act.identifier}</span>
                        <span className="text-[var(--text-muted)] text-xs">{new Date(act.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="font-mono text-xs text-[var(--text-secondary)] mt-1">{act.route}</div>
                      <div className="mt-1">
                        {act.allowed ? (
                          <span className="text-xs text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded">Allowed</span>
                        ) : (
                          <span className="text-xs text-[var(--danger)] bg-[var(--danger)]/10 px-2 py-0.5 rounded">Blocked</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-[var(--text-muted)]">No recent activity.</div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardHome;