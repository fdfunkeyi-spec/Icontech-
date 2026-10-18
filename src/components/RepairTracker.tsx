import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatNaira } from '../utils/formatters';
import {
  Search,
  Wrench,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  User,
  Calendar,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { RepairStatus, RepairTicket } from '../types';

export const RepairTracker: React.FC = () => {
  const { repairs, setActiveTab, storeInfo } = useStore();
  const [searchCode, setSearchCode] = useState('IC-REP-8821');
  const [searchedTicket, setSearchedTicket] = useState<RepairTicket | null>(() => {
    return repairs.find((r) => r.ticketNumber === 'IC-REP-8821') || repairs[0] || null;
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    const found = repairs.find(
      (r) =>
        r.ticketNumber.toUpperCase() === query ||
        r.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
    );
    setSearchedTicket(found || null);
    setHasSearched(true);
  };

  const statusSteps: RepairStatus[] = [
    'Ticket Created',
    'Diagnosing',
    'Awaiting Parts',
    'In Repair',
    'Ready for Pickup',
    'Completed'
  ];

  const getStepIndex = (status: RepairStatus) => {
    const idx = statusSteps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="py-10 sm:py-16 bg-[#0b0c10] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Real-Time Diagnostic Status</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Track Your Device Repair Progress
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Enter your ICON TECH ticket reference number (e.g., <code className="text-[#D4AF37] font-mono">IC-REP-8821</code>) or your registered phone number.
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 bg-[#121520] border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. IC-REP-8821) or Phone..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-[#161a29] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] font-mono"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              Track Device
            </button>
          </form>

          {/* Quick-select sample tickets */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
            <span className="text-[11px] text-slate-500">Quick Test Tickets:</span>
            {repairs.slice(0, 3).map((rep) => (
              <button
                key={rep.id}
                onClick={() => {
                  setSearchCode(rep.ticketNumber);
                  setSearchedTicket(rep);
                  setHasSearched(true);
                }}
                className="px-2 py-1 bg-[#181d2c] hover:bg-[#20273a] text-slate-300 hover:text-white rounded border border-slate-700/80 font-mono text-[11px]"
              >
                {rep.ticketNumber} ({rep.status})
              </button>
            ))}
          </div>
        </div>

        {/* Search Result View */}
        {hasSearched && (
          <div>
            {searchedTicket ? (
              <div className="bg-[#111420] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono text-[#D4AF37] font-bold text-sm">
                        {searchedTicket.ticketNumber}
                      </span>
                      <span>·</span>
                      <span>Logged: {searchedTicket.createdAt}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {searchedTicket.brandModel}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Customer: <strong className="text-slate-200">{searchedTicket.customerName}</strong> ({searchedTicket.phone})
                    </p>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Current Status</span>
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${
                      searchedTicket.status === 'Ready for Pickup'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : searchedTicket.status === 'Completed'
                        ? 'bg-blue-950 text-blue-300 border border-blue-800'
                        : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30'
                    }`}>
                      {searchedTicket.status}
                    </span>
                  </div>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Diagnostic & Repair Stages
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {statusSteps.map((step, idx) => {
                      const currentIdx = getStepIndex(searchedTicket.status);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div
                          key={step}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            isCurrent
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-sm'
                              : isPast
                              ? 'bg-slate-900/80 border-slate-700 text-slate-300'
                              : 'bg-[#151824]/40 border-slate-800 text-slate-600'
                          }`}
                        >
                          <div className="flex justify-center mb-1">
                            {isPast ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                            ) : isCurrent ? (
                              <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center font-mono">
                                {idx + 1}
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] font-medium leading-tight block">
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Device Fault & Cost Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#151926] rounded-xl border border-slate-800 space-y-2">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                      Fault Category & Symptoms
                    </span>
                    <div className="font-semibold text-[#D4AF37]">{searchedTicket.faultCategory}</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{searchedTicket.faultDescription}</p>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Urgency: <span className="text-slate-300">{searchedTicket.urgency}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#151926] rounded-xl border border-slate-800 space-y-2">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                      Financial & Assignment Details
                    </span>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Assigned Engineer:</span>
                      <span className="text-white font-medium">{searchedTicket.assignedTechnician || 'Senior Bench Tech'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Estimated Cost:</span>
                      <span className="font-mono text-white font-bold tabular-nums">
                        {searchedTicket.estimatedCost > 0 ? formatNaira(searchedTicket.estimatedCost) : 'Pending Final Diagnosis'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Deposit Paid:</span>
                      <span className="font-mono text-emerald-400 tabular-nums">
                        {formatNaira(searchedTicket.depositPaid)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Technician Work Log & Updates
                  </h4>
                  <div className="space-y-2 border-l-2 border-slate-800 pl-4 ml-2">
                    {searchedTicket.timeline?.map((evt: { status: string; timestamp: string; note: string }, idx: number) => (
                      <div key={idx} className="relative space-y-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] absolute -left-[21px] top-1" />
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-white">{evt.status}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-400 text-[11px] font-mono">{evt.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-300">{evt.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions & WhatsApp Support */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Workshop Location: <strong className="text-white">Opposite Adeyemi, Ondo State</strong>
                  </div>

                  <a
                    href={`https://wa.me/2347039420600?text=${encodeURIComponent(
                      `Hello ICON TECH! I am checking on my repair ticket ${searchedTicket.ticketNumber} for ${searchedTicket.brandModel}. Please give me an update.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire About Ticket on WhatsApp</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="p-8 bg-[#121520] border border-slate-800 rounded-2xl text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No Repair Ticket Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  We couldn't locate a repair ticket matching &ldquo;{searchCode}&rdquo;. Please verify the code on your receipt or submit a new enquiry.
                </p>
                <button
                  onClick={() => setActiveTab('repairs')}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors"
                >
                  Book New Repair
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
