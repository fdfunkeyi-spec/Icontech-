import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import { ShoppingBag, Eye, Star, CheckCircle, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, storeInfo } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleWhatsAppQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `*PRODUCT INQUIRY - ICON TECH*\n` +
      `Product: ${product.name}\n` +
      `Price: ${formatNaira(product.price)}\n` +
      `Category: ${product.category}\n\n` +
      `Hello ICON TECH! Is this item currently in stock at your store opposite Adeyemi? I would like to buy it.`;
    window.open(`https://wa.me/2347039420600?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col justify-between bg-[#121520] hover:bg-[#151926] border border-slate-800/80 hover:border-slate-700 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
    >
      {/* Visual Slot: 65-70% visual presence with fallback container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d0f17] flex items-center justify-center">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#121522] to-[#1a1f33] text-center">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center mb-2">
              <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-xs font-semibold text-slate-300 line-clamp-1">{product.name}</span>
            <span className="text-[10px] text-slate-500">{product.category}</span>
          </div>
        )}

        {/* Quiet 1-line tag if featured or low stock */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] font-medium text-[#D4AF37] rounded">
            {product.tag}
          </div>
        )}

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute right-2.5 top-2.5 p-2 bg-black/75 hover:bg-black text-slate-200 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
          title="Quick View Details"
          aria-label="View product details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Category & Rating: Unboxed text metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase tracking-wider text-[11px] font-medium text-slate-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="font-mono text-[11px]">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Key spec excerpt */}
          {product.warranty && (
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span className="truncate">{product.warranty}</span>
            </p>
          )}
        </div>

        {/* Price & Action Area */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              {formatNaira(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-slate-500 line-through font-mono tabular-nums">
                {formatNaira(product.originalPrice)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsAppQuickBuy}
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded-lg transition-colors border border-emerald-900/40"
              title="Quick WhatsApp Order"
              aria-label="Direct WhatsApp Order"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="px-3 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
