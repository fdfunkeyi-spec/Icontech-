import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import {
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const RepairSection: React.FC = () => {
  const { submitRepairEnquiry, setActiveTab, currentUser, storeInfo } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [deviceType, setDeviceType] = useState<'Smartphone' | 'Laptop' | 'Tablet' | 'Speaker' | 'Power Bank' | 'Other Device'>('Smartphone');
  const [brandModel, setBrandModel] = useState('');
  const [faultCategory, setFaultCategory] = useState<'Screen Replacement' | 'Battery Replacement' | 'Charging Port' | 'Water Damage' | 'Motherboard Repair' | 'Software / Flashing' | 'Keyboard / Trackpad' | 'Other Fault'>('Screen Replacement');
  const [faultDescription, setFaultDescription] = useState('');
  const [urgency, setUrgency] = useState<'Standard (1-2 days)' | 'Express Same-Day' | 'Emergency Inspection'>('Standard (1-2 days)');
  const [submittedTicket, setSubmittedTicket] = useState<{ ticketNumber: string; whatsappUrl: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !brandModel || !faultDescription) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const { ticket, whatsappUrl } = submitRepairEnquiry({
      customerName,
      phone,
      email: email || undefined,
      deviceType,
      brandModel,
      faultCategory,
      faultDescription,
      urgency
    });

    setSubmittedTicket({ ticketNumber: ticket.ticketNumber, whatsappUrl });
  };

  return (
    <section className="py-10 sm:py-16 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            <Wrench className="w-4 h-4 text-[#D4AF37]" />
            <span>Certified Diagnostic & Repair Laboratory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white text-balance">
            Expert Device Repairs Opposite Adeyemi College.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            From cracked AMOLED screens and water immersion damage to motherboard IC micro-soldering and swollen batteries. We use original parts and provide genuine warranties on every repair.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-2">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-sm font-bold text-white">45-Minute Express Screen Swaps</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast screen replacements for iPhone, Samsung, Redmi, Infinix, and Tecno with TrueTone retention and waterproof gaskets.
            </p>
          </div>

          <div className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Level-3 Micro-Soldering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-precision microscope lab for dead motherboards, short circuits, charging IC failures, and GPU re-balling on laptops.
            </p>
          </div>

          <div className="p-5 bg-[#121520] border border-slate-800 rounded-xl space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">90-Day Repair Guarantee</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every repaired device receives an official physical & digital warranty sticker. If the replaced component fails, we fix it free.
            </p>
          </div>
        </div>

        {/* Main 2-Column: Form & Workbench Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-[#111420] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submittedTicket ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Repair Ticket Successfully Created!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your tracking number is <strong className="text-[#D4AF37] font-mono text-sm">{submittedTicket.ticketNumber}</strong>. We have logged your device fault in our workshop system.
                </p>

                <div className="p-4 bg-[#161a29] border border-slate-700/80 rounded-xl text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Store Address:</span>
                    <span className="text-white font-medium text-right">Opposite Adeyemi, Ondo State</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Workshop Hours:</span>
                    <span className="text-white font-medium">Mon - Sat: 8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Technician Direct:</span>
                    <span className="text-[#D4AF37] font-mono font-medium">{storeInfo.whatsapp}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={submittedTicket.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Ticket to WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('track')}
                    className="py-3 px-5 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Track Live Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="text-xs text-slate-500 hover:text-slate-300 pt-2 block mx-auto underline"
                >
                  Submit Another Repair Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white">Book a Device Repair or Diagnosis</h3>
                  <p className="text-xs text-slate-400">Fill in the details below for an instant quote estimate and ticket creation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Customer Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Adeleke"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Device Category *</label>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Smartphone">Smartphone</option>
                      <option value="Laptop">Laptop / MacBook</option>
                      <option value="Tablet">iPad / Tablet</option>
                      <option value="Speaker">Bluetooth Speaker</option>
                      <option value="Power Bank">Power Bank / Inverter</option>
                      <option value="Other Device">Other Electronic Device</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Brand & Model Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhone 13 / HP Pavilion 15 / Galaxy A54"
                      value={brandModel}
                      onChange={(e) => setBrandModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Primary Fault Category *</label>
                    <select
                      value={faultCategory}
                      onChange={(e) => setFaultCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Screen Replacement">Screen Replacement (Cracked / Black screen)</option>
                      <option value="Battery Replacement">Battery Replacement (Fast drain / Swollen)</option>
                      <option value="Charging Port">Charging Port (Loose pin / Not charging)</option>
                      <option value="Water Damage">Water / Liquid Immersion</option>
                      <option value="Motherboard Repair">Motherboard IC / Dead Device</option>
                      <option value="Software / Flashing">Software / Bricked / iCloud / Passcode</option>
                      <option value="Keyboard / Trackpad">Keyboard / Trackpad / Hinges</option>
                      <option value="Other Fault">Other Device Issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Urgency Level</label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Standard (1-2 days)">Standard (1-2 days turnaround)</option>
                      <option value="Express Same-Day">Express Same-Day (Priority bench)</option>
                      <option value="Emergency Inspection">Emergency Inspection (Immediate while you wait)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Fault Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how the issue started (e.g., dropped on floor, fell in water, sudden shutdown, smoke smell, etc.)"
                    value={faultDescription}
                    onChange={(e) => setFaultDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com (for status notifications)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#161a29] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs rounded-xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Generate Repair Ticket & Free Diagnostic Quote</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Free diagnostic inspection if you choose to repair with us opposite Adeyemi College.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Workshop Visual & Common Price Guide */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Workshop image card */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#121520] shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src="/src/assets/images/repair_lab_bench_1792330409718.jpg"
                  alt="ICON TECH Electronics Diagnostic Workshop Bench"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">ICON TECH Dedicated Clean Lab</div>
                  <div className="text-[11px] text-[#D4AF37]">Opposite Adeyemi, Ondo State</div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Sample Starting Estimates
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300">iPhone / Samsung Screen Swaps</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">From ₦18,000</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300">Original Battery Replacement</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">From ₦12,000</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300">Laptop Keyboard & Hinge Fix</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">From ₦15,000</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-300">Motherboard IC Micro-Soldering</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">From ₦25,000</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-300">Charging Port Flex & Re-pinning</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">From ₦6,500</span>
                  </div>
                </div>

                <div className="p-3 bg-[#151928] rounded-lg border border-slate-700/60 flex items-start gap-2.5 text-[11px] text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>
                    Water-damaged devices must be powered OFF immediately. Do NOT put in raw rice — bring straight to our lab opposite Adeyemi for ultrasonic chemical cleaning.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
