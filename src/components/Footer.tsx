import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  Wrench,
  HelpCircle,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeInfo, setActiveTab, setSelectedCategory } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Location (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-amber-500 to-amber-700 flex items-center justify-center font-bold text-black text-base shadow-sm">
                I
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ICON <span className="text-[#D4AF37]">TECH</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your trusted partner for certified smartphones, laptops, power banks, charging accessories, and certified device hardware repairs in Ondo State.
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Opposite Adeyemi College of Education, Ondo State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  WhatsApp:{' '}
                  <a
                    href={storeInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#D4AF37] font-mono font-medium underline"
                  >
                    {storeInfo.whatsapp}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">{storeInfo.phoneCall}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{storeInfo.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Store & Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Smartphones');
                    setActiveTab('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Laptops');
                    setActiveTab('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Laptops & MacBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Chargers');
                    setActiveTab('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Fast Chargers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Power Banks');
                    setActiveTab('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Power Banks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Fans');
                    setActiveTab('shop');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Rechargeable Fans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('repairs');
                    scrollToTop();
                  }}
                  className="hover:text-[#D4AF37] text-slate-300 font-medium transition-colors"
                >
                  Device Repairs Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Tracking (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('track');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Track Device Repair</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('account');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Customer Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Staff Admin Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('deploy-guide');
                    scrollToTop();
                  }}
                  className="hover:text-blue-400 text-blue-400/90 transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Developer Roadmap</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Payment Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Bank Transfer
            </h4>
            <div className="p-3.5 bg-[#121520] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>Store Settlement Account</span>
              </div>
              <div className="text-[11px] space-y-1 text-slate-400">
                <div>Bank: <strong className="text-slate-200">{storeInfo.bankName}</strong></div>
                <div>Account: <strong className="text-[#D4AF37] font-mono text-xs">{storeInfo.accountNumber}</strong></div>
                <div>Name: <span className="text-slate-200 font-medium">{storeInfo.accountName}</span></div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                Payment confirmation is verified instantly via WhatsApp after transferring.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ICON TECH Enterprises. All rights reserved. Registered in Ondo State, Nigeria.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
