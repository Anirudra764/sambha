import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, FolderOpen, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, QuoteItem } from '../types';
import { PRODUCTS, CATEGORIES, MANUFACTURERS } from '../data/products';

interface CatalogViewProps {
  onSelectProduct: (productId: string) => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  quoteItems: QuoteItem[];
}

export default function CatalogView({ onSelectProduct, onAddToQuote, quoteItems }: CatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Components');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All Manufacturers');

  // Interactive search + filter calculations
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(product.specs).some(val => val.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory = selectedCategory === 'All Components' || product.category === selectedCategory;
      const matchManufacturer = selectedManufacturer === 'All Manufacturers' || product.manufacturer === selectedManufacturer;

      return matchSearch && matchCategory && matchManufacturer;
    });
  }, [searchTerm, selectedCategory, selectedManufacturer]);

  // Is product in basket helper
  const getQuantityInBasket = (productId: string) => {
    const item = quoteItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 text-left" 
      id="catalog-view"
    >
      
      {/* Upper context tracker with slide in title */}
      <div className="border-b border-zinc-800 pb-5" id="catalog-header">
        <motion.h1 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-display text-3xl font-extrabold tracking-tight text-white"
        >
          Industrial Components Catalog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-sm mt-1 max-w-3xl"
        >
          Instantly search through thousands of verified SKUs. Select parts to request a quote, customize parameters, or configure technical drawing alignments.
        </motion.p>
      </div>

      {/* Grid containing filters + results layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left filter side controls panel */}
        <div className="space-y-6 lg:self-start lg:sticky lg:top-20" id="catalog-filters">
          
          {/* Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-display text-sm font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                Filter Controls
              </span>
              {(searchTerm || selectedCategory !== 'All Components' || selectedManufacturer !== 'All Manufacturers') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Components');
                    setSelectedManufacturer('All Manufacturers');
                  }}
                  className="font-mono text-[10px] text-amber-500 font-bold uppercase hover:text-amber-400 cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Keyword search entry */}
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Keyword / Part Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. FB-2000, Bearing, SKF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  id="search-input"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>

            {/* Custom Category Selection with Sliding Motion Pill */}
            <div className="space-y-2">
              <label className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Category Group
              </label>
              <div className="flex flex-wrap lg:flex-col gap-1.5" id="category-filters-list">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-3 py-2 text-left rounded-md text-xs font-bold font-sans transition-colors cursor-pointer w-full overflow-hidden ${
                        isSelected
                          ? 'text-zinc-950'
                          : 'bg-zinc-950/40 hover:bg-zinc-950/80 text-zinc-400'
                      }`}
                    >
                      {isSelected && (
                        <motion.span 
                          layoutId="activeCategoryBackground"
                          className="absolute inset-0 bg-amber-500 rounded-md"
                          transition={{ type: "spring", stiffness: 250, damping: 23 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corporate Manufacturer Filter */}
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Authorized Manufacturer
              </label>
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
                id="manufacturer-select"
              >
                {MANUFACTURERS.map((mfg) => (
                  <option key={mfg} value={mfg} className="bg-zinc-900 text-zinc-100">
                    {mfg}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Technical Specs Info banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 text-slate-300 rounded-lg p-5 border border-slate-800 space-y-3 shadow-md"
          >
            <span className="font-mono text-[9px] uppercase text-amber-500 tracking-wider font-semibold block">
              COORDINATED LOGISTICS
            </span>
            <p className="text-xs font-light leading-relaxed">
              Have an urgent emergency backup request? Urgency limits can be declared within the RFQ page so we prioritize your item packaging.
            </p>
          </motion.div>

        </div>

        {/* Right content - products results list */}
        <div className="lg:col-span-3 space-y-6" id="catalog-results">
          
          {/* Matches tracking */}
          <div className="flex items-center justify-between text-xs font-sans text-zinc-550 text-zinc-500 pb-2 border-b border-zinc-900">
            <span className="font-medium">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> matching component units
            </span>
            <span className="font-mono text-[10px] text-zinc-500">
              SECURE SOURCE ENCRYPTED
            </span>
          </div>

          {/* Dynamic Grid of Cards with smooth physical feedback transitions */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6" 
              id="products-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const quantityInBasket = getQuantityInBasket(product.id);

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                      key={product.id}
                      className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-colors flex flex-col justify-between"
                      id={`product-card-${product.id}`}
                    >
                      
                      {/* Floating image and tags */}
                      <div className="relative pt-2 px-4">
                        {/* stock banner and tags */}
                        <div className="absolute top-4 left-6 z-10 flex flex-col gap-1.5 items-start">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase shadow-sm ${
                            product.stockStatus === 'In Stock'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-500 text-slate-950'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              product.stockStatus === 'In Stock' ? 'bg-white animate-pulse' : 'bg-slate-950 animate-pulse'
                            }`} />
                            {product.stockStatus}
                          </span>
                        </div>

                        {/* Display image container with responsive aspect ratio */}
                        <div className="rounded-lg overflow-hidden border border-zinc-850 border-zinc-800 aspect-[16/10] bg-zinc-950 group">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 duration-550 group-hover:opacity-100 group-hover:grayscale-0 transition-all cursor-pointer"
                            onClick={() => onSelectProduct(product.id)}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Metadata specs content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        <div className="space-y-1 text-left">
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-mono text-[10px] text-amber-500 font-bold tracking-wider uppercase">
                              {product.manufacturer}
                            </span>
                            <span className="font-mono text-[9px] font-semibold text-zinc-400 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded">
                              {product.category}
                            </span>
                          </div>

                          <h3 
                            onClick={() => onSelectProduct(product.id)}
                            className="font-display text-lg font-bold text-white tracking-tight hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <p className="font-mono text-[10px] text-zinc-400 mt-1">
                            PART #: <span className="text-zinc-200">{product.partNumber}</span>
                          </p>

                          <p className="text-zinc-400 text-xs font-light line-clamp-2 mt-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Snippet key specs tags */}
                        <div className="bg-zinc-950/65 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-850 border-zinc-800/80 text-[11px] space-y-1">
                          {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-zinc-450 text-zinc-400 font-light">{key}:</span>
                              <span className="text-zinc-200 font-mono font-medium">{value}</span>
                            </div>
                          ))}
                        </div>

                      </div>

                      {/* Action panel footer */}
                      <div className="px-5 pb-5 pt-1 border-t border-zinc-800/80 flex items-center justify-between gap-3 bg-zinc-950/20">
                        <button
                          onClick={() => onSelectProduct(product.id)}
                          className="flex items-center gap-1 font-sans text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          id={`btn-view-${product.id}`}
                        >
                          Technical Specs
                          <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                        </button>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.03 }}
                          onClick={() => onAddToQuote(product, 1)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-sans text-xs font-bold transition-all shadow-sm cursor-pointer ${
                            quantityInBasket > 0
                              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25'
                              : 'bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white hover:text-amber-400'
                          }`}
                          id={`btn-quote-${product.id}`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          {quantityInBasket > 0 ? `In Tray (${quantityInBasket})` : 'Request Quote'}
                        </motion.button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4" 
              id="catalog-no-results"
            >
              <div className="mx-auto w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <FolderOpen className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <p className="font-display text-lg font-bold text-white">No components matched your filters</p>
                <p className="text-zinc-400 text-xs font-light max-w-md mx-auto">
                  Try adjusting categories, manufacturers, or clearing your input search query terms. Or request a custom RFQ matching unlisted equipment lists.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Components');
                  setSelectedManufacturer('All Manufacturers');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}

        </div>

      </div>

    </motion.div>
  );
}
