import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import {
  Smartphone,
  Laptop,
  Zap,
  Cable,
  Wind,
  Volume2,
  Headphones,
  ShieldAlert,
  BatteryCharging,
  HardDrive,
  Cpu,
  Wrench,
  Grid
} from 'lucide-react';

interface CategoryItem {
  name: ProductCategory | 'All';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CATEGORIES_CONFIG: CategoryItem[] = [
  { name: 'All', label: 'All Items', icon: Grid },
  { name: 'Smartphones', label: 'Smartphones', icon: Smartphone },
  { name: 'Laptops', label: 'Laptops', icon: Laptop },
  { name: 'Chargers', label: 'Chargers & Adapters', icon: Zap },
  { name: 'USB Cables', label: 'USB Cables', icon: Cable },
  { name: 'Fans', label: 'Rechargeable Fans', icon: Wind },
  { name: 'Bluetooth Speakers', label: 'Speakers', icon: Volume2 },
  { name: 'Headphones', label: 'Headphones & Pods', icon: Headphones },
  { name: 'Phone Accessories', label: 'Phone Accessories', icon: ShieldAlert },
  { name: 'Power Banks', label: 'Power Banks', icon: BatteryCharging },
  { name: 'Storage Devices', label: 'Storage & SSDs', icon: HardDrive },
  { name: 'Other Electronics', label: 'Other Electronics', icon: Cpu },
  { name: 'Repair Services', label: 'Repair Services', icon: Wrench },
];

export const CategoryFilterBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveTab } = useStore();

  const handleSelect = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
    if (category === 'Repair Services') {
      setActiveTab('repairs');
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable horizontal tab bar with indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
        {CATEGORIES_CONFIG.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-[#D4AF37] text-black shadow-sm font-semibold'
                  : 'bg-[#131622] text-slate-300 hover:text-white hover:bg-[#1a1f30] border border-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#D4AF37]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
