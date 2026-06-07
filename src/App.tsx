import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import ProductDetailView from './components/ProductDetailView';
import RfqView from './components/RfqView';
import QuoteTray from './components/QuoteTray';
import { Product, QuoteItem } from './types';
import { PRODUCTS } from './data/products';
import { Phone, MapPin, Mail, Clock, HelpCircle, ShieldAlert } from 'lucide-react';

export default function App() {
  // Navigation Router state
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'detail' | 'rfq'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('fb-2000');

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(() => {
    try {
      const saved = localStorage.getItem('sarvshresth_user_v1');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (email: string) => {
    const user = { email };
    setCurrentUser(user);
    try {
      localStorage.setItem('sarvshresth_user_v1', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user footprint:', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('sarvshresth_user_v1');
    } catch (e) {
      console.error('Failed to wipe user footprint:', e);
    }
  };

  // Persistent Quote Basket state (Transient local/client-side storage matches rules)
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('sarvshresth_quotes_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Quote tray open drawer state
  const [isQuoteTrayOpen, setIsQuoteTrayOpen] = useState(false);

  // Sync quotes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sarvshresth_quotes_v1', JSON.stringify(quoteItems));
    } catch (e) {
      console.error('Failed to sync quote state: ', e);
    }
  }, [quoteItems]);

  // Navigate State helper
  const handleNavigate = (view: 'home' | 'catalog' | 'detail' | 'rfq') => {
    setCurrentView(view);
    // Smooth scroll page to top upon navigation triggering
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Inspect detail helper
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    handleNavigate('detail');
  };

  // Append product to Quotation basket helper
  const handleAddToQuote = (
    product: Product,
    quantity: number,
    customNotes?: string,
    size?: string,
    material?: string
  ) => {
    setQuoteItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      
      let updated: QuoteItem[];
      if (existingIdx > -1) {
        // Update size or material notes if customized from detail page
        updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: quantity,
          customNotes: customNotes || updated[existingIdx].customNotes,
          selectedSize: size || updated[existingIdx].selectedSize,
          selectedMaterial: material || updated[updated[existingIdx].selectedSize]
        };
      } else {
        // Append new item
        updated = [...prev, { product, quantity, customNotes, selectedSize: size, selectedMaterial: material }];
      }

      return updated;
    });

    // Auto flash drawers up upon adding
    setIsQuoteTrayOpen(true);
  };

  // Update item volumes inside basket
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteItems((prev) => 
      prev.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
    );
  };

  // Delete item from quotation
  const handleRemoveItem = (productId: string) => {
    setQuoteItems((prev) => {
      const filtered = prev.filter((item) => item.product.id !== productId);
      if (filtered.length === 0) {
        setIsQuoteTrayOpen(false);
      }
      return filtered;
    });
  };

  // Wipe quotation basin
  const handleClearQuote = () => {
    setQuoteItems([]);
    setIsQuoteTrayOpen(false);
  };

  // Retrieve selected product data object for inspection
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-slate-100 scroll-smooth" id="web-layout-container">
      
      {/* 1. Global Navigation Bar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        quoteItems={quoteItems}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenTray={() => {
          if (quoteItems.length > 0) {
            setIsQuoteTrayOpen(true);
          }
        }}
      />

      {/* 2. Main Content Routing Module */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12" id="main-route-wrapper">
        {currentView === 'home' && (
          <HomeView 
            onNavigate={handleNavigate} 
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogView 
            onSelectProduct={handleSelectProduct}
            onAddToQuote={handleAddToQuote}
            quoteItems={quoteItems}
          />
        )}

        {currentView === 'detail' && (
          <ProductDetailView 
            product={selectedProduct}
            onBack={() => handleNavigate('catalog')}
            onAddToQuote={handleAddToQuote}
            quoteItems={quoteItems}
          />
        )}

        {currentView === 'rfq' && (
          <RfqView 
            quoteItems={quoteItems}
            onClearQuote={handleClearQuote}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
            currentUser={currentUser}
            onLogin={handleLogin}
          />
        )}
      </main>

      {/* 3. Global Information Footer */}
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-12 pb-24 md:pb-16" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs mb-8">
          
          {/* Logo brand disclaimer */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-amber-500 text-zinc-950 p-1.5 rounded font-bold font-sans">SS</div>
              <span className="font-display text-sm font-bold tracking-tight text-white">SARVSHRESTH SAMBHARAN</span>
            </div>
            <p className="font-sans font-light leading-relaxed max-w-sm text-zinc-400">
              We leverage authorized global direct-buy networks to supply certified mechanical spare parts, flanged valves, roller bearings, and heavy electrical inductors instantly across India. 
            </p>
            <div className="flex gap-4 text-zinc-600">
              <span className="inline-block mt-1 bg-zinc-900 text-zinc-450 text-zinc-400 px-2.5 py-1 rounded font-mono text-[9px] uppercase font-bold border border-zinc-800">
                ISO 9001:2015 REGISTERED
              </span>
            </div>
          </div>

          {/* Quick links portal navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider">PROCUREMENT PORTAL</h4>
            <ul className="space-y-2 font-sans font-medium text-zinc-300">
              <li>
                <button onClick={() => handleNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Corporate Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Components Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('rfq')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Direct RFQ Submission
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hub Locations */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider">REGIONAL DISTRIBUTION HUBS</h4>
            <div className="space-y-2.5 font-sans font-light text-zinc-300">
              <p className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Headquarters: 43, NEW KASHIDIH, SAKCHI, JAMSHEDPUR - 831001</span>
              </p>
              <p className="flex gap-2 items-start">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Working hours: Mon - Sat | 08:30 to 19:30 IST</span>
              </p>
            </div>
          </div>

        </div>

        {/* Global copyright panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 gap-3 text-center">
          <p>© 2026 Sarvshresth Sambharan Industrial Group. Sourcing authorized gears across India with 100% precision. All Rights Reserved.</p>
          <p className="font-mono uppercase text-[9px]">DESIGNED IN COMPLIANCE WITH METRIC STANDARD CONTROLS</p>
        </div>
      </footer>

      {/* 4. Global Persistent Quote Dock Tray overlay */}
      <QuoteTray 
        quoteItems={quoteItems}
        onClearQuote={handleClearQuote}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onNavigate={handleNavigate}
        isOpen={isQuoteTrayOpen}
        setIsOpen={setIsQuoteTrayOpen}
      />

    </div>
  );
}
