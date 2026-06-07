import React from 'react';
import { ShoppingCart, ArrowRight, Trash2, CheckCircle, X, Plus, Minus, FileSpreadsheet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteItem } from '../types';

interface QuoteTrayProps {
  quoteItems: QuoteItem[];
  onClearQuote: () => void;
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onNavigate: (view: 'home' | 'catalog' | 'detail' | 'rfq') => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function QuoteTray({ 
  quoteItems, 
  onClearQuote, 
  onRemoveItem, 
  onUpdateQuantity,
  onNavigate, 
  isOpen, 
  setIsOpen 
}: QuoteTrayProps) {
  const totalQuantity = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  if (quoteItems.length === 0) return null;

  return (
    <>
      {/* Floating Pill / Dock Trigger when drawer is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 sm:bottom-6 right-6 z-40 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white shadow-2xl hover:shadow-zinc-500/5 px-4.5 py-3.5 rounded-xl flex items-center gap-3 cursor-pointer group"
            id="floating-quote-tray-trigger"
          >
            <div className="relative">
              <div className="bg-amber-500 text-zinc-950 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white border border-zinc-950 text-[9px] font-sans font-black rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-lg animate-pulse">
                {totalQuantity}
              </span>
            </div>
            <div className="flex flex-col text-left pr-1 select-none">
              <span className="font-display text-[10px] uppercase tracking-wider font-extrabold text-zinc-400">Sourcing Basket</span>
              <span className="font-mono text-xs font-bold text-amber-500">{totalQuantity} Units Selected</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-over Right Drawer and Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
              id="quote-tray-backdrop"
            />

            {/* Slider container panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-zinc-950 border-l border-zinc-900 shadow-2xl z-51 flex flex-col h-full text-left"
              id="quote-side-drawer"
            >
              <div className="bg-amber-500 h-1.5 w-full shrink-0" />

              {/* Drawer Title Header */}
              <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-lg border border-amber-500/20">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">Sourcing Basket</h3>
                    <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">{quoteItems.length} Products Indexed</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                  id="btn-close-drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable list items container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth scrollbar-thin">
                <div className="flex justify-between items-center pb-1 border-b border-zinc-900">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">Itemized Breakdown</span>
                  <button
                    onClick={() => {
                      onClearQuote();
                      setIsOpen(false);
                    }}
                    className="font-mono text-[9px] text-rose-500 hover:text-rose-400 font-bold uppercase flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>

                <motion.div 
                  layout
                  className="space-y-3"
                  id="drawer-items-list"
                >
                  {quoteItems.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="bg-zinc-900/40 border border-zinc-900/90 rounded-xl p-3.5 space-y-3 hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex gap-3 items-start">
                        {/* Thumbnail image with zero referrer policy */}
                        <div className="w-12 h-12 rounded-lg border border-zinc-800 overflow-hidden bg-zinc-950 shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover grayscale brightness-95"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Text meta details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-extrabold text-xs text-white leading-snug truncate hover:whitespace-normal transition-all">
                            {item.product.name}
                          </h4>
                          <p className="font-sans text-[10px] text-zinc-400 mt-1 leading-none">{item.product.manufacturer}</p>
                          <p className="font-mono text-[8px] text-amber-500/80 uppercase mt-1 tracking-wider leading-none">
                            PN: {item.product.partNumber}
                          </p>
                        </div>

                        {/* Quick remove button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-zinc-500 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Interactive Quantity Controller Section */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-900">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Quantity:</span>
                        
                        <div className="flex items-center bg-zinc-950 border border-zinc-850 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:text-amber-400 text-zinc-400 transition-colors cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val >= 1 && onUpdateQuantity) {
                                onUpdateQuantity(item.product.id, val);
                              }
                            }}
                            className="w-12 bg-transparent text-center font-mono text-xs font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:text-amber-400 text-zinc-400 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Custom note indicator if added from detail */}
                      {item.customNotes && (
                        <div className="bg-zinc-950/80 border border-zinc-900 rounded p-2 mt-1">
                          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-wider block">Inquiry Specification Note:</span>
                          <p className="font-sans text-[10px] text-zinc-400 italic mt-0.5 truncate">{item.customNotes}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Drawer CTA Summary Module */}
              <div className="p-5 border-t border-zinc-900 bg-zinc-900/20 shrink-0 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Total Sourcing Units</p>
                    <p className="font-display font-black text-sm text-amber-500 mt-1">{totalQuantity} Units</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[8.5px] uppercase font-bold tracking-wider">
                      <CheckCircle className="w-3 h-3" /> Raw Mill Traceable
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('rfq');
                    setIsOpen(false);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 cursor-pointer border border-amber-400/20"
                  id="btn-drawer-checkout"
                >
                  Proceed to RFQ Compilation
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <p className="font-mono text-[8px] text-zinc-550 text-zinc-500 uppercase text-center tracking-widest">
                  ISO 9001:2015 REGISTERED SOURCING PIPELINE
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
