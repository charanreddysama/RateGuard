import { Shield, Activity, Database, Gauge, Radar, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";

const features = [
  {
    icon: Shield,
    title: "Distributed Rate Limiting",
    description: "Protect APIs globally using Redis-powered distributed middleware infrastructure."
  },
  {
    icon: Activity,
    title: "Real-Time Analytics",
    description: "Track requests, blocked traffic, latency, and API usage in real time."
  },
  {
    icon: Database,
    title: "Redis Powered",
    description: "Ultra-fast request tracking using Redis in-memory infrastructure."
  },
  {
    icon: Cpu,
    title: "Advanced Algorithms",
    description: "Sliding Window, Fixed Window, Token Bucket, and Leaky Bucket support."
  },
  {
    icon: Radar,
    title: "Abuse Prevention",
    description: "Detect spam traffic, brute-force attempts, and suspicious request patterns."
  },
  {
    icon: Gauge,
    title: "Live Monitoring",
    description: "Observe API health, traffic spikes, and latency from one platform."
  }
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container-width">
        {/* SECTION TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle
            badge="Features"
            title="Everything needed for API protection"
            subtitle="Enterprise-grade infrastructure built for modern APIs, distributed systems, and developer platforms."
          />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card card-hover p-8 text-left"
              >
                {/* ICON */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--brand-primary)]/10 mb-6">
                  <Icon size={32} className="text-[var(--brand-primary)]" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold tracking-tight mb-3 text-[var(--text-primary)]">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;