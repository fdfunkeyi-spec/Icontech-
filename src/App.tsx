import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { StorefrontView } from './components/StorefrontView';
import { RepairSection } from './components/RepairSection';
import { RepairTracker } from './components/RepairTracker';
import { AccountPortal } from './components/AccountPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { DeploymentGuide } from './components/DeploymentGuide';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { MessageCircle, Wrench, ShoppingBag } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, storeInfo, setActiveTab, cartCount, setIsCartOpen } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-slate-100">
      {/* Top Bar with 3-Zone Contract */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && <StorefrontView />}
        {activeTab === 'shop' && <StorefrontView />}
        {activeTab === 'repairs' && <RepairSection />}
        {activeTab === 'track' && <RepairTracker />}
        {activeTab === 'account' && <AccountPortal />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'deploy-guide' && <DeploymentGuide />}
      </main>

      {/* Product Detail Modal */}
      <ProductModal />

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer />

      {/* Footer with Business Location & Details */}
      <Footer />

      {/* Floating Quick Action Pill for Mobile / Desktop */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href={storeInfo.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg shadow-black/60 transition-transform active:scale-95 text-xs font-semibold"
          aria-label="Direct WhatsApp Contact"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
