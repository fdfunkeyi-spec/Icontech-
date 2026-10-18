import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle,
  MapPin
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    submitWhatsAppCartOrder,
    currentUser,
    setActiveTab,
    storeInfo
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [deliveryTown, setDeliveryTown] = useState('Ondo Town (Opposite Adeyemi / Campus)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 35000;
  const deliveryFee = cartTotal >= freeDeliveryThreshold ? 0 : 1500;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your name, phone number, and delivery location to proceed.');
      return;
    }

    setIsSubmitting(true);
    const { order, whatsappUrl } = submitWhatsAppCartOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      deliveryAddress: address.trim(),
      deliveryTown,
      notes: notes.trim() || undefined
    });

    setOrderSuccess(order.orderNumber);
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#0f121b] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
              <span className="text-xs font-mono text-slate-400">({cartCount} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Promo Bar */}
          <div className="bg-[#141824] px-5 py-2.5 text-xs text-slate-300 border-b border-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              {cartTotal >= freeDeliveryThreshold ? (
                <span className="text-emerald-400 font-semibold">Free Ondo delivery unlocked!</span>
              ) : (
                <span>
                  Add <strong className="text-white font-mono">{formatNaira(freeDeliveryThreshold - cartTotal)}</strong> more for free delivery
                </span>
              )}
            </span>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">Order Sent to WhatsApp!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Your order reference is <strong className="text-[#D4AF37] font-mono">{orderSuccess}</strong>. Our team is reviewing your message on WhatsApp (0703 942 0600) to confirm delivery.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCartOpen(false);
                      setActiveTab('account');
                    }}
                    className="w-full py-2.5 px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-semibold text-xs rounded-lg transition-colors"
                  >
                    View in Customer Account
                  </button>
                  <button
                    onClick={() => {
                      setOrderSuccess(null);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-2.5 px-4 bg-[#181d2c] hover:bg-[#20273b] text-slate-300 text-xs font-medium rounded-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold text-slate-300">Your cart is currently empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our smartphones, laptops, fast GaN chargers, and power banks.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab('shop');
                  }}
                  className="mt-3 px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 bg-[#131622] rounded-xl border border-slate-800 flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-slate-900 border border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-semibold text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#D4AF37] font-mono font-bold">
                          {formatNaira(item.product.price)}
                        </div>
                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex items-center bg-[#1c2234] border border-slate-700 rounded">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-auto"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Delivery Information
                    </span>
                    <span className="text-[11px] text-[#D4AF37]">Ondo & Nationwide</span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo Emmanuel"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#151926] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#151926] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Delivery Town / Area</label>
                    <select
                      value={deliveryTown}
                      onChange={(e) => setDeliveryTown(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#151926] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Ondo Town (Opposite Adeyemi / Campus)">Ondo Town (Opposite Adeyemi / Campus)</option>
                      <option value="Ondo Town (Yaba / Lipakala / Oka)">Ondo Town (Yaba / Lipakala / Oka)</option>
                      <option value="Ondo Town (Store Pickup)">Store Pickup (Opposite Adeyemi)</option>
                      <option value="Akure, Ondo State">Akure, Ondo State</option>
                      <option value="Other Ondo State LGA">Other Ondo State Area</option>
                      <option value="Interstate Delivery (Nationwide)">Interstate Delivery (Nationwide Waybill)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Street Address or Campus Hostel *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Room 14, Hall 2 / No 15 College Road"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#151926] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Special Order Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Call before coming, prefer morning delivery"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#151926] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-5 border-t border-slate-800 bg-[#0c0e16] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-semibold tabular-nums">{formatNaira(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-white tabular-nums">
                    {deliveryFee === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : formatNaira(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-[#D4AF37] tabular-nums text-base">{formatNaira(grandTotal)}</span>
                </div>
              </div>

              {/* Instant WhatsApp Order Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Complete Order on WhatsApp ({storeInfo.whatsapp})</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Clicking will pre-fill a detailed WhatsApp message with your selected items, address, and total for immediate confirmation.
              </p>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
};
