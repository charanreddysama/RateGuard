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
              Welcome to RateGuard! Follow this guide to secure your API in under 5 minutes.
            </p>
          </div>

          <div className="space-y-16">
            {/* 1. Overview */}
            <section id="overview" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight border-b border-[var(--border-subtle)] pb-2 w-full">
                  1. Overview
                </h2>
              </div>
              
              <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                <p className="leading-relaxed mb-6">
                  RateGuard is a distributed rate-limiting platform that allows developers to protect APIs, monitor traffic, and manage rate-limiting rules from a centralized dashboard without redeploying applications.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Centralized rule management:</strong> Update your rate limits instantly from the dashboard.</li>
                  <li><strong>Real-time analytics:</strong> See exactly who is calling your API and when they are blocked.</li>
                  <li><strong>Multiple rate-limiting algorithms:</strong> Choose between Fixed Window, Sliding Window, or Token Bucket.</li>
                  <li><strong>SDK integration:</strong> Drop-in middleware for Node.js/Express.</li>
                  <li><strong>REST API integration:</strong> Protect non-Node.js applications via standard HTTP requests.</li>
                </ul>
              </div>
            </section>

            {/* 2. Complete Setup Flow */}
            <section id="setup-flow" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center text-[var(--brand-primary)]">
                  <Zap size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight border-b border-[var(--border-subtle)] pb-2 w-full">
                  2. Complete Setup Flow
                </h2>
              </div>
              
              <div className="space-y-12">
                {/* Step 1 & 2 */}
                <div className="relative border-l-2 border-[var(--border-subtle)] pl-8 ml-3 space-y-12">
                  
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-[var(--bg-primary)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Create Account & Project</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      If you haven't already, sign up and navigate to the <Link to="/dashboard/projects" className="text-[var(--brand-primary)] hover:underline">Projects Dashboard</Link> to create your first project. A project represents the specific API or application you want to protect.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-[var(--bg-primary)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Generate API Key</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      Go to the <Link to="/dashboard/api-keys" className="text-[var(--brand-primary)] hover:underline">API Keys</Link> page and generate a secure key for your new project. You will need to copy this key into your backend code.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-[var(--bg-primary)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Configure Rules</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      In the <Link to="/dashboard/rules" className="text-[var(--brand-primary)] hover:underline">Rules Dashboard</Link>, create your rate limiting rules. A rule tells RateGuard how many requests to allow per minute for specific API endpoints (e.g., limit <code className="bg-[var(--bg-secondary)] px-1 rounded">/api/login</code> to 5 requests per minute).
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-[var(--bg-primary)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Integrate SDK</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      Finally, install the SDK in your backend and provide it with your API key and Base URL. The Base URL is required so the SDK knows exactly where your RateGuard instance is deployed.
                    </p>
                    
                    <div className="mb-4">
                      <CodeBlock title="Terminal" code={`npm install rateguard-sdk`} />
                    </div>
                    <div className="shadow-xl rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                      <CodeBlock 
                        title="server.js" 
                        code={`import express from "express";
import { rateGuard } from "rateguard-sdk";

const app = express();

// Global Middleware: Protects all routes
app.use(
  rateGuard({
    apiKey: "YOUR_API_KEY",
    baseUrl: "${apiUrl}" 
  })
);

// Route Middleware: Protects specific routes
app.get("/api/sensitive", rateGuard({ apiKey: "YOUR_API_KEY", baseUrl: "${apiUrl}" }), (req, res) => {
  res.json({ message: "Protected!" });
});`} 
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-[var(--bg-primary)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      5
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Verify & Monitor</h3>
                    <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                      Send a few test requests to your API. RateGuard will intercept them, check against your cloud rules, and record the activity. Visit the <Link to="/dashboard/analytics" className="text-[var(--brand-primary)] hover:underline">Analytics page</Link> to watch your traffic flow in real-time!
                    </p>
                  </div>

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
              <a href="#overview" className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors flex items-center">
                <ChevronRight size={14} className="mr-1 opacity-50" /> 1. Overview
              </a>
              <a href="#setup-flow" className="text-sm text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors flex items-center">
                <ChevronRight size={14} className="mr-1 opacity-50" /> 2. Complete Setup Flow
              </a>
            </nav>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default DocsPage;