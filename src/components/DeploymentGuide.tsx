import React from 'react';
import {
  GitBranch,
  Database,
  Cloud,
  Globe,
  Shield,
  Terminal,
  CheckCircle,
  Copy,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DeploymentGuide: React.FC = () => {
  const { storeInfo } = useStore();
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0b0c10] min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/60 border border-blue-800 text-blue-300 text-xs font-semibold rounded-lg">
            <Globe className="w-3.5 h-3.5" />
            <span>Beginner Roadmap: Zero to Production HTTPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Next Steps: Connecting GitHub, Cloud Backend & Public HTTPS
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your initial ICON TECH storefront and repair system is fully constructed with a local reactive database, WhatsApp ordering, and admin management. Follow this structured roadmap to hook up your GitHub repository, configure permanent cloud storage, and launch on your own custom domain.
          </p>
        </div>

        {/* Step 1: GitHub Connection */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                Connect & Push to GitHub
              </h3>
              <p className="text-xs text-slate-400">Safely backup your source code without leaking sensitive files.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pl-12">
            <p>
              1. Open GitHub (<a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">github.com/new</a>) and create a repository called <code className="font-mono text-white">icon-tech-store</code>.
            </p>
            <p>2. Open your terminal in the project folder and run:</p>
            
            <div className="relative p-3.5 bg-[#090b10] border border-slate-800 rounded-lg font-mono text-xs text-slate-200 space-y-1 overflow-x-auto">
              <button
                onClick={() => copyToClipboard('git init\ngit add .\ngit commit -m "feat: initial icon tech storefront & repair system"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/icon-tech-store.git\ngit push -u origin main', 1)}
                className="absolute right-3 top-3 p-1 text-slate-400 hover:text-white"
                title="Copy commands"
              >
                {copiedIndex === 1 ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "feat: initial icon tech storefront & repair system"</div>
              <div>git branch -M main</div>
              <div>git remote add origin https://github.com/YOUR_USERNAME/icon-tech-store.git</div>
              <div>git push -u origin main</div>
            </div>

            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-amber-300 text-[11px]">
              <strong>Security check:</strong> Your <code className="font-mono">.gitignore</code> file is already configured so files containing secrets (like <code className="font-mono">.env</code>) will never be pushed to GitHub.
            </div>
          </div>
        </div>

        {/* Step 2: Database & Backend Planning */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                Persistent Cloud Database & Authentication
              </h3>
              <p className="text-xs text-slate-400">Transitioning from localStorage to persistent multi-device cloud records.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pl-12">
            <p>
              Currently, ICON TECH uses a browser storage layer (<code className="font-mono text-[#D4AF37]">localStorage</code>) so all your products, repair tickets, and orders persist instantly without requiring server setup right away.
            </p>
            <p>When you are ready to connect a real persistent backend, two proven options are recommended:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-[#151926] rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-semibold text-white">Option A: Firebase (Firestore + Auth)</div>
                <p className="text-[11px] text-slate-400">
                  Ideal for real-time order sync and SMS/WhatsApp notifications. Firestore rules ensure customer data is only accessible to authorized accounts.
                </p>
              </div>
              <div className="p-3.5 bg-[#151926] rounded-xl border border-slate-800 space-y-1.5">
                <div className="font-semibold text-white">Option B: PostgreSQL (Supabase / Cloud SQL)</div>
                <p className="text-[11px] text-slate-400">
                  Standard relational schema for complex inventory tracking, multiple store branches in Ondo State, and automated invoice PDF generation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Cloud Image Storage */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cloud className="w-4 h-4 text-amber-400" />
                Permanent Product Photo & Device Intake Storage
              </h3>
              <p className="text-xs text-slate-400">Handling high-resolution uploads for new arrivals and damaged customer devices.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pl-12">
            <p>
              When taking in devices with broken screens opposite Adeyemi, technicians often snap intake photos to prove prior body condition.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li>Use <strong>Google Cloud Storage</strong>, <strong>Firebase Storage</strong>, or <strong>Cloudinary</strong> for fast image compression and web CDN delivery.</li>
              <li>Always upload photos via server-side presigned URLs (<code className="font-mono text-white">POST /api/upload</code>) to prevent exposing API secrets to browser clients.</li>
            </ul>
          </div>
        </div>

        {/* Step 4: Deploying to Public HTTPS URL */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                Deploying to a Real Public HTTPS URL
              </h3>
              <p className="text-xs text-slate-400">Launch with zero server maintenance and automatic SSL certificates.</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pl-12">
            <p>
              Once your code is on GitHub, you can deploy your application to any top-tier cloud platform with 1 click:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#151926] rounded-lg border border-slate-800">
                <strong className="text-white block mb-0.5">Vercel or Netlify (Fastest for Beginners)</strong>
                <span className="text-slate-400">
                  Connect your GitHub repo. Vercel automatically runs <code className="font-mono text-white">npm run build</code> and assigns a live public URL like <code className="font-mono text-[#D4AF37]">icon-tech.vercel.app</code> with free automatic HTTPS.
                </span>
              </div>
              <div className="p-3 bg-[#151926] rounded-lg border border-slate-800">
                <strong className="text-white block mb-0.5">Custom Nigerian Domain Name</strong>
                <span className="text-slate-400">
                  Purchase a custom domain like <code className="font-mono text-[#D4AF37]">icontech.ng</code> or <code className="font-mono text-[#D4AF37]">icontechondo.com</code> from Whogohost, QServers, or Namecheap. Point the DNS CNAME records to your deployment platform.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: WhatsApp Business Setup */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-mono font-bold text-sm">
              5
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                WhatsApp Business Optimization ({storeInfo.whatsapp})
              </h3>
              <p className="text-xs text-slate-400">Setting up quick replies for inbound web inquiries.</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pl-12">
            <p>
              All website orders and repair forms are already programmed to forward structured messages directly to your WhatsApp (<strong className="text-white">{storeInfo.whatsapp}</strong>).
            </p>
            <p className="text-slate-400 text-[11px]">
              In WhatsApp Business app on your phone, set up Quick Replies for phrases like <code className="font-mono text-white">/bank</code> (bank account details) and <code className="font-mono text-white">/location</code> ("We are situated directly opposite Adeyemi College main gate, Ondo State").
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
