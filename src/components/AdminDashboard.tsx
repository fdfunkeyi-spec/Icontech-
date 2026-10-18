import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import { Product, ProductCategory, OrderStatus, RepairStatus } from '../types';
import {
  ShieldCheck,
  Package,
  Wrench,
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  Bell,
  Search,
  ExternalLink,
  Lock,
  LogOut
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    repairs,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateRepairTicket,
    announcement,
    updateAnnouncement,
    resetToDefaultData,
    categories,
    storeInfo
  } = useStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'repairs' | 'orders' | 'content'>('inventory');

  // New Product Form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Smartphones');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formStock, setFormStock] = useState('10');
  const [formImage, setFormImage] = useState('/src/assets/images/smartphones_flagship_1792330408572.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formTag, setFormTag] = useState('');
  const [formWarranty, setFormWarranty] = useState('90 Days Store Guarantee');

  // Announcement state
  const [noticeText, setNoticeText] = useState(announcement.text);
  const [noticeActive, setNoticeActive] = useState(announcement.isActive);
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Repair quick update state
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);
  const [repairStatusUpdate, setRepairStatusUpdate] = useState<RepairStatus>('In Repair');
  const [repairNoteUpdate, setRepairNoteUpdate] = useState('');
  const [repairCostUpdate, setRepairCostUpdate] = useState('');
  const [repairDepositUpdate, setRepairDepositUpdate] = useState('');

  if (!isAdmin) {
    return (
      <div className="py-16 sm:py-24 bg-[#0b0c10] min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#121520] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#D4AF37]/15 rounded-xl flex items-center justify-center mx-auto text-[#D4AF37]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Administrator Access</h2>
            <p className="text-xs text-slate-400">
              Authorized ICON TECH management portal for inventory, price adjustments, repairs, and order fulfillment.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const success = loginAdmin(passwordInput);
              if (!success) {
                setLoginError(true);
              } else {
                setLoginError(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Passcode / PIN</label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. admin123)"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              {loginError && (
                <span className="text-[11px] text-rose-400 mt-1 block">
                  Invalid passcode. Use 'admin123' or '07039420600'.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Sign In to Management
            </button>

            <button
              type="button"
              onClick={() => loginAdmin('admin123')}
              className="w-full py-2 bg-[#171c2c] hover:bg-[#20273c] text-xs text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 transition-colors"
            >
              One-Click Demo Manager Login (admin123)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin stats
  const totalStockCount = products.reduce((acc, p) => acc + p.stock, 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const activeRepairsCount = repairs.filter((r) => r.status !== 'Completed' && r.status !== 'Cancelled').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    const numericPrice = parseFloat(formPrice.replace(/\D/g, '')) || 0;
    const numericOriginalPrice = formOriginalPrice ? parseFloat(formOriginalPrice.replace(/\D/g, '')) : undefined;
    const numericStock = parseInt(formStock, 10) || 0;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: formName,
        category: formCategory,
        price: numericPrice,
        originalPrice: numericOriginalPrice,
        stock: numericStock,
        inStock: numericStock > 0,
        image: formImage,
        description: formDescription,
        tag: formTag || undefined,
        warranty: formWarranty || undefined,
      });
      setEditingProductId(null);
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        price: numericPrice,
        originalPrice: numericOriginalPrice,
        stock: numericStock,
        inStock: numericStock > 0,
        image: formImage,
        description: formDescription,
        features: ['Genuine manufacturer grade', 'Tested by ICON TECH', 'Ondo Town warranty'],
        specs: {
          'Category': formCategory,
          'Warranty': formWarranty || '90 Days Store Guarantee',
          'Condition': 'New/Inspected'
        },
        tag: formTag || undefined,
        warranty: formWarranty || undefined
      });
    }

    // Reset form
    setFormName('');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormStock('10');
    setFormDescription('');
    setFormTag('');
    setIsAddingProduct(false);
  };

  const handleStartEdit = (p: Product) => {
    setEditingProductId(p.id);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setFormStock(p.stock.toString());
    setFormImage(p.image);
    setFormDescription(p.description);
    setFormTag(p.tag || '');
    setFormWarranty(p.warranty || '');
    setIsAddingProduct(true);
  };

  const handleSaveAnnouncement = () => {
    updateAnnouncement(noticeText, noticeActive);
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 2000);
  };

  const handleUpdateRepair = (ticketId: string) => {
    const cost = repairCostUpdate ? parseFloat(repairCostUpdate) : undefined;
    const deposit = repairDepositUpdate ? parseFloat(repairDepositUpdate) : undefined;

    updateRepairTicket(ticketId, {
      status: repairStatusUpdate,
      note: repairNoteUpdate || undefined,
      estimatedCost: cost,
      depositPaid: deposit,
    });

    setSelectedRepairId(null);
    setRepairNoteUpdate('');
    setRepairCostUpdate('');
    setRepairDepositUpdate('');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#0b0c10] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Management Header */}
        <div className="p-6 bg-[#121520] border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase">
                Staff Control Center
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 text-xs font-medium">Session Authenticated</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
              ICON TECH Store & Lab Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Opposite Adeyemi College, Ondo State · WhatsApp: {storeInfo.whatsapp}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefaultData}
              className="px-3.5 py-2 bg-[#181d2c] hover:bg-[#22293e] text-slate-300 rounded-lg text-xs font-medium border border-slate-700/80 transition-colors flex items-center gap-1.5"
              title="Reset sample inventory to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Data</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* KPI Scorecard Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#121520] border border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>Catalog Items</span>
              <Package className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{products.length} Products</div>
            <div className="text-[11px] text-slate-500">{totalStockCount} units total stock</div>
          </div>

          <div className="p-4 bg-[#121520] border border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>Total Value</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono tabular-nums">
              {formatNaira(totalInventoryValue)}
            </div>
            <div className="text-[11px] text-slate-500">Retail inventory value</div>
          </div>

          <div className="p-4 bg-[#121520] border border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>Workshop Queue</span>
              <Wrench className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{activeRepairsCount} Active</div>
            <div className="text-[11px] text-slate-500">{repairs.length} total logged tickets</div>
          </div>

          <div className="p-4 bg-[#121520] border border-slate-800 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>Customer Orders</span>
              <ShoppingBag className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">{pendingOrdersCount} Pending</div>
            <div className="text-[11px] text-slate-500">{orders.length} total store orders</div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('repairs')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'repairs'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Device Repairs ({repairs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'bg-[#D4AF37] text-black shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Website Notice & Banner</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Stock Catalog & Pricing Control</h3>
                <p className="text-xs text-slate-400">Add products, edit selling prices, adjust stock counts, and attach photos.</p>
              </div>
              <button
                onClick={() => {
                  setEditingProductId(null);
                  setFormName('');
                  setFormPrice('');
                  setFormOriginalPrice('');
                  setFormStock('10');
                  setFormDescription('');
                  setIsAddingProduct(!isAddingProduct);
                }}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingProduct ? 'Cancel' : 'Add New Product'}</span>
              </button>
            </div>

            {/* Add / Edit Product Drawer Card */}
            {isAddingProduct && (
              <form onSubmit={handleProductSubmit} className="p-6 bg-[#141825] border border-[#D4AF37]/40 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white">
                  {editingProductId ? 'Edit Product Details' : 'Add New Inventory Item'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anker 30W Nano Fast Charger"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Selling Price (₦) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 15000"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Strike-through Price (₦)</label>
                    <input
                      type="number"
                      placeholder="e.g. 18000"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Available Stock Units *</label>
                    <input
                      type="number"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Image URL / Asset</label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <div className="flex gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setFormImage('/src/assets/images/smartphones_flagship_1792330408572.jpg')}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        Use Flagship Phone Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormImage('/src/assets/images/accessories_audio_hub_1792330408891.jpg')}
                        className="text-[10px] text-[#D4AF37] hover:underline"
                      >
                        Use Accessories Image
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Badge Tag & Warranty</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Tag (e.g. Best Seller)"
                        value={formTag}
                        onChange={(e) => setFormTag(e.target.value)}
                        className="px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                      />
                      <input
                        type="text"
                        placeholder="Warranty (e.g. 6 Months)"
                        value={formWarranty}
                        onChange={(e) => setFormWarranty(e.target.value)}
                        className="px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Product Description</label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Short description highlighting specs, condition, and origin..."
                    className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg"
                  >
                    {editingProductId ? 'Update Product' : 'Save Product to Inventory'}
                  </button>
                </div>
              </form>
            )}

            {/* Inventory Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#121520]">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#151926] text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded bg-slate-900 border border-slate-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="font-semibold text-white truncate block max-w-xs">{p.name}</span>
                          <span className="text-[10px] text-slate-500">{p.warranty || 'No warranty specified'}</span>
                        </div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-slate-400">{p.category}</td>
                      <td className="p-3.5 whitespace-nowrap font-mono font-bold text-white tabular-nums">
                        {formatNaira(p.price)}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                          p.stock > 5 ? 'bg-emerald-950 text-emerald-400' : p.stock > 0 ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-[#D4AF37] transition-colors mr-1"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: REPAIR MANAGEMENT */}
        {activeTab === 'repairs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Workshop Repairs Queue</h3>
                <p className="text-xs text-slate-400">
                  Update diagnostic stages, assign engineers, set repair costs, and log client communication.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {repairs.map((rep) => (
                <div
                  key={rep.id}
                  className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#D4AF37]">{rep.ticketNumber}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs font-semibold text-white">{rep.brandModel}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs text-slate-400">{rep.customerName} ({rep.phone})</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        <strong>Fault:</strong> {rep.faultCategory} — {rep.faultDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                        rep.status === 'Ready for Pickup'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : rep.status === 'Completed'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {rep.status}
                      </span>
                      <button
                        onClick={() => setSelectedRepairId(selectedRepairId === rep.id ? null : rep.id)}
                        className="px-3 py-1 bg-[#181d2c] hover:bg-[#22293e] text-xs text-slate-200 rounded border border-slate-700"
                      >
                        {selectedRepairId === rep.id ? 'Close' : 'Update Status'}
                      </button>
                    </div>
                  </div>

                  {/* Inline Status Updater */}
                  {selectedRepairId === rep.id && (
                    <div className="p-4 bg-[#161a29] border border-slate-700/80 rounded-lg space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Update Repair Stage & Financials
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">New Status</label>
                          <select
                            value={repairStatusUpdate}
                            onChange={(e) => setRepairStatusUpdate(e.target.value as RepairStatus)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#10131d] border border-slate-700 rounded text-white"
                          >
                            <option value="Ticket Created">Ticket Created</option>
                            <option value="Diagnosing">Diagnosing</option>
                            <option value="Awaiting Parts">Awaiting Parts</option>
                            <option value="In Repair">In Repair</option>
                            <option value="Ready for Pickup">Ready for Pickup</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Estimated Cost (₦)</label>
                          <input
                            type="number"
                            placeholder={rep.estimatedCost.toString()}
                            value={repairCostUpdate}
                            onChange={(e) => setRepairCostUpdate(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#10131d] border border-slate-700 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Deposit Paid (₦)</label>
                          <input
                            type="number"
                            placeholder={rep.depositPaid.toString()}
                            value={repairDepositUpdate}
                            onChange={(e) => setRepairDepositUpdate(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs bg-[#10131d] border border-slate-700 rounded text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Work Note for Customer & Log</label>
                        <input
                          type="text"
                          placeholder="e.g. Screen replaced and tested. Ready for customer pickup."
                          value={repairNoteUpdate}
                          onChange={(e) => setRepairNoteUpdate(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-[#10131d] border border-slate-700 rounded text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setSelectedRepairId(null)}
                          className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateRepair(rep.id)}
                          className="px-4 py-1.5 bg-[#D4AF37] text-black text-xs font-bold rounded"
                        >
                          Commit Update
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                    <div>
                      Technician: <span className="text-white">{rep.assignedTechnician || 'Unassigned'}</span>
                    </div>
                    <div>
                      Estimate: <span className="font-mono text-white font-semibold">{formatNaira(rep.estimatedCost)}</span>
                      <span className="mx-2">·</span>
                      Deposit: <span className="font-mono text-emerald-400 font-semibold">{formatNaira(rep.depositPaid)}</span>
                    </div>
                    <a
                      href={`https://wa.me/${rep.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        `Hello ${rep.customerName}! This is ICON TECH workshop (opposite Adeyemi). Regarding your device ${rep.brandModel} (${rep.ticketNumber}): it is now ${rep.status}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>WhatsApp Customer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Store Orders & Delivery Dispatch</h3>
              <p className="text-xs text-slate-400">Manage orders placed online or via WhatsApp.</p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#D4AF37]">{ord.orderNumber}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs text-slate-400">{ord.createdAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {ord.customerName} — {ord.phone}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {ord.deliveryAddress}, {ord.deliveryTown}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-2.5 py-1.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white font-medium"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped / Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-slate-300">
                        <span>
                          {it.name} <span className="text-slate-500">× {it.quantity}</span>
                        </span>
                        <span className="font-mono tabular-nums">{formatNaira(it.subtotal)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">
                      Payment Mode: <strong className="text-white">{ord.paymentMethod}</strong>
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      Total: <span className="text-[#D4AF37]">{formatNaira(ord.totalAmount)}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WEBSITE NOTICE & BANNER */}
        {activeTab === 'content' && (
          <div className="max-w-2xl bg-[#121520] border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Top Announcement Banner</h3>
            <p className="text-xs text-slate-400">
              Customize the prominent notification bar displayed across the top of the website.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Banner Message</label>
                <textarea
                  rows={3}
                  value={noticeText}
                  onChange={(e) => setNoticeText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noticeToggle"
                  checked={noticeActive}
                  onChange={(e) => setNoticeActive(e.target.checked)}
                  className="w-4 h-4 text-[#D4AF37] rounded border-slate-700"
                />
                <label htmlFor="noticeToggle" className="text-xs text-slate-300 cursor-pointer">
                  Display announcement banner to visitors
                </label>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveAnnouncement}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors"
                >
                  {noticeSaved ? 'Announcement Updated!' : 'Save Announcement'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
