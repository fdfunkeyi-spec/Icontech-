import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import {
  User,
  ShoppingBag,
  Wrench,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const AccountPortal: React.FC = () => {
  const {
    currentUser,
    orders,
    repairs,
    loginCustomer,
    logoutCustomer,
    setActiveTab,
    setSelectedProduct
  } = useStore();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Opposite Adeyemi College, Ondo Town');
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'repairs' | 'profile'>('orders');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    loginCustomer(name.trim(), phone.trim(), email.trim(), address.trim());
  };

  // Filter orders and repairs belonging to current user or show recent demo if sample user
  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '') ||
          o.customerName.toLowerCase() === currentUser.name.toLowerCase()
      )
    : [];

  const userRepairs = currentUser
    ? repairs.filter(
        (r) =>
          r.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '') ||
          r.customerName.toLowerCase() === currentUser.name.toLowerCase()
      )
    : [];

  // Fallback demo items to display rich account experience if newly created account has no orders yet
  const displayOrders = userOrders.length > 0 ? userOrders : orders.slice(0, 2);
  const displayRepairs = userRepairs.length > 0 ? userRepairs : repairs.slice(0, 2);

  if (!currentUser) {
    return (
      <div className="py-12 sm:py-20 bg-[#0b0c10] min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#121520] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isRegisterMode ? 'Create Customer Account' : 'Customer Account Login'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRegisterMode
                ? 'Register to track purchases, review repair tickets, and save delivery addresses.'
                : 'Enter your name and phone number to access your order history and repair progress.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Babatunde Adeleke"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 0703 942 0600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. babatunde@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Delivery Address in Ondo (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Opposite Adeyemi College, Ondo Town"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              {isRegisterMode ? 'Register & Continue' : 'Sign In to Portal'}
            </button>

            {/* Quick Demo Login Option */}
            <button
              type="button"
              onClick={() => {
                loginCustomer(
                  'Babatunde Adeleke',
                  '0813 456 7890',
                  'babatunde.a@gmail.com',
                  'Plot 12, Adeyemi Staff Quarters, Ondo Town'
                );
              }}
              className="w-full py-2.5 bg-[#171c2c] hover:bg-[#20273c] text-[#D4AF37] text-xs font-semibold rounded-lg border border-[#D4AF37]/30 transition-colors"
            >
              Quick Test: Log In as Sample Customer
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <button
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs text-slate-400 hover:text-[#D4AF37] transition-colors"
            >
              {isRegisterMode
                ? 'Already have an account? Sign In here'
                : "Don't have an account yet? Register here"}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#0b0c10] min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Header Banner */}
        <div className="p-6 sm:p-8 bg-[#121520] border border-slate-800 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-600 flex items-center justify-center font-extrabold text-black text-xl shadow-md">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
                  Verified Member
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {currentUser.phone}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {currentUser.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logoutCustomer}
              className="px-4 py-2 bg-[#181d2c] hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700/80 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'orders'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order History ({displayOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('repairs')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'repairs'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Repair Tickets ({displayRepairs.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'profile'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Delivery Addresses</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeSubTab === 'orders' && (
          <div className="space-y-4">
            {displayOrders.length === 0 ? (
              <div className="p-12 text-center bg-[#121520] border border-slate-800 rounded-xl space-y-3">
                <ShoppingBag className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm font-semibold text-white">No orders yet</p>
                <p className="text-xs text-slate-400">When you place an order via WhatsApp or checkout, it will be listed here.</p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-lg"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              displayOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#D4AF37]">{ord.orderNumber}</span>
                      <span className="text-slate-500 mx-2">·</span>
                      <span className="text-xs text-slate-400">{ord.createdAt}</span>
                    </div>
                    <div>
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded">
                        Status: <strong className="text-white">{ord.status}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-slate-200">
                          {it.name} <span className="text-slate-500">× {it.quantity}</span>
                        </span>
                        <span className="font-mono text-slate-300 tabular-nums">
                          {formatNaira(it.subtotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
                    <div className="text-slate-400">
                      Destination: <span className="text-white">{ord.deliveryAddress}, {ord.deliveryTown}</span>
                    </div>
                    <div className="font-mono text-sm font-bold text-white">
                      Total: <span className="text-[#D4AF37]">{formatNaira(ord.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Repairs */}
        {activeSubTab === 'repairs' && (
          <div className="space-y-4">
            {displayRepairs.map((rep) => (
              <div
                key={rep.id}
                className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="font-mono text-sm font-bold text-[#D4AF37]">{rep.ticketNumber}</span>
                    <span className="text-slate-500 mx-2">·</span>
                    <span className="text-xs text-white font-semibold">{rep.brandModel}</span>
                  </div>
                  <div>
                    <span className="px-2.5 py-1 bg-amber-950/60 border border-amber-800/50 text-[#D4AF37] text-xs font-bold rounded">
                      {rep.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Fault: </span>
                  {rep.faultCategory} — {rep.faultDescription}
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">
                    Estimate: <strong className="font-mono text-white">{rep.estimatedCost > 0 ? formatNaira(rep.estimatedCost) : 'Pending Diagnosis'}</strong>
                  </span>
                  <button
                    onClick={() => setActiveTab('track')}
                    className="px-3 py-1.5 bg-[#181d2c] hover:bg-[#20273c] text-[#D4AF37] font-semibold rounded text-xs transition-colors self-start sm:self-auto"
                  >
                    Open Full Tracker →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Profile & Address */}
        {activeSubTab === 'profile' && (
          <div className="p-6 bg-[#121520] border border-slate-800 rounded-xl space-y-4 max-w-lg">
            <h3 className="text-sm font-bold text-white">Default Ondo Delivery Location</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#161a29] rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Saved Street Address</span>
                <span className="text-white font-medium">{currentUser.address || 'Opposite Adeyemi College, Ondo Town'}</span>
              </div>
              <div className="p-3 bg-[#161a29] rounded-lg border border-slate-700/80">
                <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                <span className="text-white font-medium font-mono">{currentUser.phone}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              Deliveries within Ondo Town (Opposite Adeyemi, Yaba, Lipakala, Oka) arrive same-day.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
