import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useProjects } from "../../context/ProjectContext";
import { TerminalSquare, Send, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ==========================================
// PLAYGROUND PAGE
// This page lets users test their rate limiting rules without having to write
// any backend code themselves. It acts like a fake "client" sending requests to their API.
// ==========================================

function PlaygroundPage() {
  const { projects, selectedProject } = useProjects();
  
  // 1. STATE: Keep track of what the user types in the form
  const [route, setRoute] = useState("/api/products");
  const [identifier, setIdentifier] = useState("user-123");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null); // Stores the API result
  
  // Create a fake project that new users can test with immediately
  const demoProject = {
    _id: "demo-project",
    name: "Demo API (Mocked)",
    apiKey: "rg_demo_1234567890abcdef"
  };

  // Combine the fake project with the user's real projects
  const allProjects = [demoProject, ...projects];

  const [selectedProjectId, setSelectedProjectId] = useState(
    selectedProject ? selectedProject._id : "demo-project"
  );

  const activeProject = allProjects.find(p => p._id === selectedProjectId);

  // 2. STATE: Mock counter to simulate real rate limiting for the Demo Project
  const [demoHits, setDemoHits] = useState(0);

  // 3. HANDLE TEST: Runs when they click "Send Test Request"
  const handleTest = async () => {
    // Basic validation
    if (!activeProject) {
      toast.error("Please select a project first");
      return;
    }
    
    if (!route || !identifier) {
      toast.error("Route and Identifier are required");
      return;
    }

    setLoading(true);
    
    // Start a timer to measure how fast the API responds (latency)
    const startTime = performance.now();

    try {
      // SCENARIO A: They are using the Mock Demo Project
      if (activeProject._id === "demo-project") {
        
        await new Promise(resolve => setTimeout(resolve, 30)); // Fake a 30ms network delay
        const endTime = performance.now();
        
        const hits = demoHits + 1;
        setDemoHits(hits);
        
        // If they clicked more than 3 times, block them! (Simulate Rate Limiting)
        if (hits > 3) {
          setResponse({
            status: 429, // 429 means "Too Many Requests"
            latency: Math.round(endTime - startTime),
            data: { message: "Too many requests", limit: 3, algorithm: "Token Bucket" },
            headers: {
              'x-ratelimit-limit': 3,
              'x-ratelimit-remaining': 0,
              'x-ratelimit-reset': Math.floor(Date.now() / 1000) + 60
            }
          });
          // Reset their demo limit after 5 seconds automatically
          setTimeout(() => setDemoHits(0), 5000);
        } else {
          // They haven't hit the limit yet, so let the request pass (200 OK)
          setResponse({
            status: 200,
            latency: Math.round(endTime - startTime),
            data: { allowed: true, limit: 3, remaining: 3 - hits },
            headers: {
              'x-ratelimit-limit': 3,
              'x-ratelimit-remaining': 3 - hits,
              'x-ratelimit-reset': Math.floor(Date.now() / 1000) + 60
            }
          });
        }
      } 
      // SCENARIO B: They are testing a REAL project connected to the database
      else {
        // Actually send an HTTP POST request to our backend server
        const res = await axios.post(
          `${API_URL}/limiter/check`, 
          { route, identifier },
          { headers: { 'x-api-key': activeProject.apiKey } } // Pass their secret API key
        );
        
        const endTime = performance.now();
        
        // Save the real response from the backend to display on the screen
        setResponse({
          status: res.status,
          latency: Math.round(endTime - startTime),
          data: res.data,
          headers: {
            'x-ratelimit-limit': res.headers['x-ratelimit-limit'],
            'x-ratelimit-remaining': res.headers['x-ratelimit-remaining'],
            'x-ratelimit-reset': res.headers['x-ratelimit-reset']
          }
        });
      }
    } catch (error) {
      // If the backend threw an error (like a 429 Too Many Requests), handle it here
      const endTime = performance.now();
      
      if (error.response) {
        setResponse({
          status: error.response.status,
          latency: Math.round(endTime - startTime),
          data: error.response.data,
          headers: {
            'x-ratelimit-limit': error.response.headers['x-ratelimit-limit'],
            'x-ratelimit-remaining': error.response.headers['x-ratelimit-remaining'],
            'x-ratelimit-reset': error.response.headers['x-ratelimit-reset']
          }
        });
      } else {
        toast.error("Network error");
        setResponse({ error: "Network error connecting to API" });
      }
    } finally {
      // Always turn off the loading spinner at the end
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-heading-l mb-2">API Playground</h1>
        <p className="text-body text-[var(--text-secondary)]">
          Test your rate limiting rules live without writing code.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* REQUEST PANEL */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-subtle)] pb-4">
            <TerminalSquare size={20} className="text-[var(--brand-primary)]" />
            <h2 className="text-lg font-bold">Request Configuration</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Target Project</label>
              <select 
                className="flex h-10 w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <option value="demo-project">Demo API (Mocked)</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>

            {activeProject && (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 rounded-lg flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">API KEY</span>
                <span className="font-mono text-xs truncate max-w-[200px] text-[var(--text-primary)]">{activeProject.apiKey}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Route</label>
              <p className="text-xs text-[var(--text-muted)] mb-2">The exact API endpoint path you want to protect (e.g. <code>/api/products</code>).</p>
              <Input 
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="/api/products"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Identifier (IP or User ID)</label>
              <p className="text-xs text-[var(--text-muted)] mb-2">Rate limits apply per identifier. This is usually the client's IP address or their logged-in User ID.</p>
              <Input 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="192.168.1.1 or user-123"
              />
            </div>

            <Button 
              className="w-full gap-2 mt-2" 
              onClick={handleTest} 
              disabled={loading || !activeProject}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {loading ? "Testing..." : "Send Test Request"}
            </Button>
          </div>
        </Card>

        {/* RESPONSE PANEL */}
        <div className="flex flex-col">
          <Card className="flex-1 p-6 bg-[#0d1117] border-0 text-gray-300">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-gray-400" />
                <h2 className="text-lg font-bold text-white">Response</h2>
              </div>
              {response && response.status && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-400">{response.latency}ms</span>
                  {response.status === 200 ? (
                    <span className="flex items-center gap-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                      <CheckCircle2 size={14} /> 200 OK
                    </span>
                  ) : response.status === 429 ? (
                    <span className="flex items-center gap-1 text-xs font-semibold bg-rose-500/20 text-rose-400 px-2 py-1 rounded">
                      <ShieldAlert size={14} /> 429 TOO MANY REQUESTS
                    </span>
                  ) : (
                    <span className="text-xs font-semibold bg-gray-500/20 text-gray-400 px-2 py-1 rounded">
                      {response.status}
                    </span>
                  )}
                </div>
              )}
            </div>

            {!response ? (
              <div className="h-64 flex items-center justify-center text-sm text-gray-500 font-mono">
                Waiting for request...
              </div>
            ) : response.error ? (
              <div className="text-sm text-rose-400 font-mono">
                {response.error}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Headers</p>
                  <div className="font-mono text-sm space-y-1">
                    {response.headers['x-ratelimit-limit'] && (
                      <div><span className="text-blue-400">X-RateLimit-Limit:</span> {response.headers['x-ratelimit-limit']}</div>
                    )}
                    {response.headers['x-ratelimit-remaining'] !== undefined && (
                      <div><span className="text-blue-400">X-RateLimit-Remaining:</span> {response.headers['x-ratelimit-remaining']}</div>
                    )}
                    {response.headers['x-ratelimit-reset'] && (
                      <div><span className="text-blue-400">X-RateLimit-Reset:</span> {response.headers['x-ratelimit-reset']}</div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Body</p>
                  <pre className="font-mono text-sm bg-black/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-emerald-300">
                      {JSON.stringify(response.data, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PlaygroundPage;
