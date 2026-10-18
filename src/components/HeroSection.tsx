import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Zap, MessageCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setSelectedCategory, storeInfo } = useStore();

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0b0c10] via-[#0f121b] to-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Location & Service Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Ondo State Premier Tech Hub</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Opposite Adeyemi
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Express Device Repairs</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Premium Electronics & Certified Device Repairs in Ondo.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Shop brand-new and certified pristine smartphones, laptops, fast GaN chargers, long-lasting power banks, and audio gear. Bring broken screens, dead batteries, and faulty boards to our expert lab opposite Adeyemi College for rapid same-day diagnostics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-500 rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('repairs')}
                className="px-6 py-3 text-sm font-semibold text-slate-200 bg-[#161a26] hover:bg-[#1e2333] border border-slate-700/80 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Wrench className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Device Repair</span>
              </button>

              <a
                href={storeInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {storeInfo.whatsapp}</span>
              </a>
            </div>

            {/* Trust Anchors (No Pill Boxes - Clean unboxed text) */}
            <div className="pt-4 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div>
                <span className="block text-white font-semibold">100% Tested Devices</span>
                <span>Foreign-used & new box units</span>
              </div>
              <div>
                <span className="block text-white font-semibold">Fast 45-Min Screen Fix</span>
                <span>Original OLED & IPS displays</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-white font-semibold">Same-Day Pickup</span>
                <span>Opposite Adeyemi, Ondo State</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-[#12151e] shadow-2xl group">
              <img
                src="/src/assets/images/hero_tech_storefront_1792330408198.jpg"
                alt="ICON TECH Premium Electronics Storefront Showcase"
                className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-80" />
              
              {/* Overlay card for quick stats */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#0e111a]/90 backdrop-blur-md border border-slate-700/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Direct WhatsApp Orders</div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Instant Checkout & Delivery
                  </div>
                </div>
                <a
                  href={storeInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Message Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
