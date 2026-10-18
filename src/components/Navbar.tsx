import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  Wrench,
  User,
  ShieldCheck,
  Menu,
  X,
  Phone,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    currentUser,
    isAdmin,
    announcement,
    storeInfo
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c10]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Optional Slim Announcement Banner */}
      {announcement.isActive && announcement.text && (
        <div className="bg-[#121624] border-b border-[#D4AF37]/20 px-4 py-1.5 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="text-[#D4AF37] font-semibold shrink-0">NOTICE</span>
              <span className="text-slate-500 shrink-0">·</span>
              <span className="truncate">{announcement.text}</span>
            </div>
            {announcement.linkText && (
              <button
                onClick={() => setActiveTab(announcement.actionTab || 'repairs')}
                className="text-[#D4AF37] hover:underline font-medium shrink-0 hidden sm:inline"
              >
                {announcement.linkText} →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Top Bar Contract: 3 Zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left flex items-center gap-2 shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] via-amber-500 to-amber-700 flex items-center justify-center font-bold text-black text-base shadow-sm">
            I
          </div>
          <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
            ICON <span className="text-[#D4AF37]">TECH</span>
          </span>
        </button>

        {/* Zone 2: 4-5 Concise Single-line Nav Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'home' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Storefront
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'shop' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab('repairs')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'repairs' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Device Repairs</span>
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'track' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Track Repair
          </button>
          <button
            onClick={() => setActiveTab('deploy-guide')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1 ${
              activeTab === 'deploy-guide' ? 'text-blue-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Deployment Guide</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Toggle / Input */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search phones, laptops, repairs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-56 xl:w-64 pl-8 pr-3 py-1.5 text-xs bg-[#12151e] border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile search button */}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Account portal button */}
          <button
            onClick={() => setActiveTab('account')}
            className={`p-2 rounded-lg transition-colors text-slate-300 hover:text-white hover:bg-slate-800/60 ${
              activeTab === 'account' ? 'text-[#D4AF37] bg-slate-800/80' : ''
            }`}
            title={currentUser ? `Signed in as ${currentUser.name}` : 'Customer Account'}
          >
            <User className="w-5 h-5" />
          </button>

          {/* Admin Dashboard shortcut */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`p-2 rounded-lg transition-colors text-slate-400 hover:text-[#D4AF37] hover:bg-slate-800/60 ${
              activeTab === 'admin' ? 'text-[#D4AF37] bg-slate-800/80' : ''
            }`}
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs rounded-lg transition-all shadow-sm active:scale-95"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-black text-[#D4AF37] text-xs font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {showSearchInput && (
        <div className="lg:hidden px-4 pb-3 pt-1 border-t border-slate-800/60 bg-[#0d0f17]">
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search products, chargers, repairs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#151926] border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0d0f17] px-4 py-4 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'home' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => {
                setActiveTab('shop');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'shop' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => {
                setActiveTab('repairs');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'repairs' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Device Repairs
            </button>
            <button
              onClick={() => {
                setActiveTab('track');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'track' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Track Repair
            </button>
            <button
              onClick={() => {
                setActiveTab('account');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'account' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Customer Account
            </button>
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left font-medium ${
                activeTab === 'admin' ? 'bg-[#181d2c] text-[#D4AF37]' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Admin Dashboard
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('deploy-guide');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-xs text-blue-400 bg-blue-950/40 border border-blue-800/40 rounded-lg text-center font-medium"
            >
              Beginner Guide: GitHub, Backend & HTTPS Setup
            </button>

            <a
              href={storeInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp ({storeInfo.whatsapp})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
