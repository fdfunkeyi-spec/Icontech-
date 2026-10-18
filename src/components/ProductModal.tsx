import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import {
  X,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Check,
  Plus,
  Minus
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, storeInfo } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setAddedNotice(false);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleDirectWhatsAppOrder = () => {
    const totalAmount = selectedProduct.price * quantity;
    const msg = `*INSTANT ORDER INQUIRY - ICON TECH*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `*Product:* ${selectedProduct.name}\n` +
      `*Category:* ${selectedProduct.category}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Unit Price:* ${formatNaira(selectedProduct.price)}\n` +
      `*Total Price:* ${formatNaira(totalAmount)}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Hello ICON TECH team! I want to purchase this directly via WhatsApp. Please share delivery and bank account details for pickup/dispatch opposite Adeyemi.`;
    window.open(`https://wa.me/2347039420600?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#10131d] border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          {/* Image & Guarantee Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#0a0c13] border border-slate-800 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {selectedProduct.tag && (
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/85 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] rounded">
                  {selectedProduct.tag}
                </div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-[#151926] rounded-lg border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{selectedProduct.warranty || 'Tested Guarantee'}</span>
              </div>
              <div className="p-3 bg-[#151926] rounded-lg border border-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Ondo Town Same-Day</span>
              </div>
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="space-y-5">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="uppercase tracking-wider font-semibold text-[#D4AF37]">
                  {selectedProduct.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className={selectedProduct.inStock ? 'text-emerald-400' : 'text-rose-400'}>
                  {selectedProduct.inStock ? `In Stock (${selectedProduct.stock} units)` : 'Sold Out'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="font-mono font-bold">{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{selectedProduct.reviewsCount} customer reviews</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-[#141824] border border-slate-800 rounded-xl flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Price</span>
                <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                  {formatNaira(selectedProduct.price)}
                </div>
              </div>
              {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Regular Price</span>
                  <div className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    {formatNaira(selectedProduct.originalPrice)}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Features */}
            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Key Highlights
                </h4>
                <ul className="grid grid-cols-1 gap-1 text-xs text-slate-300">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Table */}
            {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="p-2 bg-[#141824] rounded border border-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">{key}</span>
                      <span className="text-slate-200 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-300 font-medium">Quantity:</span>
              <div className="flex items-center bg-[#151926] border border-slate-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                  className="p-2 text-slate-400 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-amber-400 disabled:bg-slate-700 text-black font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'Added to Cart!' : `Add to Cart — ${formatNaira(selectedProduct.price * quantity)}`}</span>
              </button>

              <button
                onClick={handleDirectWhatsAppOrder}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Order (Direct Store Chat)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
