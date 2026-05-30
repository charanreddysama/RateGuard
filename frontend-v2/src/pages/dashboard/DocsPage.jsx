import DashboardLayout from "../../components/dashboard/DashboardLayout";
import CodeBlock from "../../components/docs/CodeBlock";
import { BookOpen, Package, Zap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function DocsPage() {
  // Get the current backend URL that the frontend is using
  const apiUrl = import.meta.env.VITE_API_URL || "https://rateguard-yfcb.onrender.com/api";

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-12 max-w-[1400px] mx-auto pb-20">
        
        {/* MAIN CONTENT */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-4">
              Documentation
            </h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Integrate RateGuard into any backend in minutes. Fast, distributed, and completely transparent rate limiting infrastructure.
            </p>
          </div>

          <div className="space-y-16">
            {/* Quick Start */}
            <section id="quick-start" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <Zap size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight border-b border-[var(--border-subtle)] pb-2 w-full">
                  Quick Start
                </h2>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 mt-6">1. Install the SDK</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Install the official RateGuard SDK via npm or yarn in your Node.js backend.
                </p>
                <div className="mb-8">
                  <CodeBlock title="Terminal" code={`npm install rateguard-sdk`} />
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 mt-8">2. Integrate Middleware</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Add the RateGuard middleware to your Express application. 
                  Get your API key from the <Link to="/dashboard/projects" className="text-[var(--brand-primary)] font-medium hover:underline">Projects page</Link>.
                </p>
                <div className="mb-8 shadow-xl rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                  <CodeBlock 
                    title="server.js" 
                    code={`import express from "express";
import { rateGuard } from "rateguard-sdk";

const app = express();

// Global rate limiting middleware
app.use(
  rateGuard({
    apiKey: process.env.RATEGUARD_KEY,
    baseUrl: "${apiUrl}" // Your RateGuard instance URL
  })
);

app.get("/api/data", (req, res) => {
  res.json({ message: "Protected endpoint!" });
});`} 
                  />
                </div>
              </div>
            </section>

            {/* Core Concepts */}
            <section id="core-concepts" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight border-b border-[var(--border-subtle)] pb-2 w-full">
                  Core Concepts
                </h2>
              </div>
              
              <div className="space-y-8 mt-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Identifier Functions</h3>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    By default, RateGuard limits traffic based on the client's IP address. If your API handles authenticated users, you can customize this by providing an <code className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-sm text-[var(--brand-primary)]">identifier</code> function to limit by user ID or API token.
                  </p>
                  <div className="shadow-xl rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                    <CodeBlock 
                      title="identifier.js"
                      code={`app.use(rateGuard({
  apiKey: process.env.RATEGUARD_KEY,
  baseUrl: "${apiUrl}",
  identifier: (req) => {
    // Limit by user ID instead of IP
    return req.user?.id || req.ip;
  }
}));`}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 mt-8">Rules Engine</h3>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    Rules are managed entirely in the cloud and synced to your server in real-time. There is no need to redeploy your application when changing rate limits or switching algorithms. Manage your rules in the <Link to="/dashboard/rules" className="text-[var(--brand-primary)] font-medium hover:underline">Rules Dashboard</Link>.
                  </p>
                </div>
              </div>
            </section>

            {/* REST API */}
            <section id="rest-api" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <Package size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight border-b border-[var(--border-subtle)] pb-2 w-full">
                  REST API Integration
                </h2>
              </div>
              
              <div className="mt-6">
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  If you're not using Node.js, you can manually integrate RateGuard using our standard HTTP REST API. Simply send a POST request before executing your protected controller logic.
                </p>
                <div className="shadow-xl rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                  <CodeBlock 
                    title="HTTP Request"
                    code={`POST /api/limiter/check
Headers:
  x-api-key: YOUR_API_KEY
  Content-Type: application/json

Body:
{
  "route": "/products",
  "identifier": "user-123"
}`} 
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ON THIS PAGE (TABLE OF CONTENTS) */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 pt-2">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">On this page</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#quick-start" className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors flex items-center">
                <ChevronRight size={14} className="mr-1 opacity-50" /> Quick Start
              </a>
              <a href="#core-concepts" className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors flex items-center">
                <ChevronRight size={14} className="mr-1 opacity-50" /> Core Concepts
              </a>
              <a href="#rest-api" className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors flex items-center">
                <ChevronRight size={14} className="mr-1 opacity-50" /> REST API Integration
              </a>
            </nav>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default DocsPage;