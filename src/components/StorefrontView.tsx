import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroSection } from './HeroSection';
import { CategoryFilterBar } from './CategoryFilterBar';
import { ProductCard } from './ProductCard';
import {
  Wrench,
  Search,
  SlidersHorizontal,
  MapPin,
  MessageCircle,
  Truck,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '../types';

export const StorefrontView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    storeInfo
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchFeatures = p.features?.some((f) => f.toLowerCase().includes(q));
          return matchName || matchCat || matchDesc || matchFeatures;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Featured spotlight items
  const featuredHighlights = useMemo(() => {
    return products.filter((p) => p.isFeatured).slice(0, 4);
  }, [products]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Campaign Section */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 2. Category Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white tracking-tight">
              Explore Categories
            </h2>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs text-[#D4AF37] hover:underline"
              >
                Reset to All Categories
              </button>
            )}
          </div>
          <CategoryFilterBar />
        </div>

        {/* 3. Catalog Controls (Category Header, Result Count, Sort) */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {selectedCategory === 'All' ? 'Available Tech & Accessories' : selectedCategory}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> items in Ondo store
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-[#141825] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 4. Product Cards Grid (3 cols desktop, 2 tablet, 1 mobile) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#111420] border border-slate-800 rounded-2xl space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find items matching your criteria. Try resetting the filters or searching for chargers, power banks, or smartphones.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* 5. Device Repair Spotlight Banner */}
        <section className="mt-14 p-6 sm:p-10 bg-gradient-to-r from-[#121524] via-[#161a2e] to-[#121524] border border-slate-700/80 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <Wrench className="w-4 h-4" />
                <span>On-Site Workshop · Opposite Adeyemi</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-balance leading-tight">
                Got a Broken Phone Screen, Swollen Battery, or Dead Laptop?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Don't abandon your device! Our certified micro-soldering engineers diagnose faults, replace broken screens with original panels, and revive water-damaged logic boards in as little as 45 minutes.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('repairs')}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Diagnostic Inspection</span>
                </button>
                <button
                  onClick={() => setActiveTab('track')}
                  className="px-5 py-2.5 bg-[#1a2032] hover:bg-[#232b42] text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  Track Existing Ticket
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8 space-y-3">
              <div className="text-xs text-slate-400">
                <strong className="text-white block text-sm mb-1">Walk-in Repairs Welcome</strong>
                Located directly opposite Adeyemi College main gate, Ondo State.
              </div>
              <div className="text-xs font-mono text-[#D4AF37]">
                Hotline: {storeInfo.whatsapp}
              </div>
              <a
                href={storeInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Senior Tech</span>
              </a>
            </div>
          </div>
        </section>

        {/* 6. Location & Storefront Trust Strip */}
        <div className="p-6 bg-[#111420] border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Physical Store in Ondo</h4>
              <p className="text-slate-400 mt-0.5">Opposite Adeyemi College, Ondo State. Walk in for instant purchases, device testing, and screen installations.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct WhatsApp Service</h4>
              <p className="text-slate-400 mt-0.5">Order with a single click. Prefilled order details sent directly to {storeInfo.whatsapp} for swift dispatch.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Guaranteed Authenticity</h4>
              <p className="text-slate-400 mt-0.5">All chargers, power banks, and smartphones are genuine, inspected, and backed by ICON TECH warranties.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
