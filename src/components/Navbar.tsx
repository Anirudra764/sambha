import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, LayoutGrid, Home, PhoneCall, ShoppingCart, LogIn, LogOut, User, Lock, Mail, Eye, EyeOff, ShieldCheck, X, UserPlus, Building2 } from 'lucide-react';
import { QuoteItem } from '../types';
import SarvshresthLogo from './SarvshresthLogo';

interface NavbarProps {
  currentView: 'home' | 'catalog' | 'detail' | 'rfq';
  onNavigate: (view: 'home' | 'catalog' | 'detail' | 'rfq') => void;
  quoteItems: QuoteItem[];
  onOpenTray: () => void;
  currentUser: { email: string } | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export default function Navbar({ currentView, onNavigate, quoteItems, onOpenTray, currentUser, onLogin, onLogout }: NavbarProps) {
  const totalItems = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  // Login Modal & Credentials validation states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const targetEmail = loginEmail.trim();
    if (!targetEmail || !targetEmail.includes('@') || !targetEmail.includes('.')) {
      setLoginError('Please enter a valid corporate Email ID containing @ and . symbols.');
      return;
    }

    if (!loginPassword || loginPassword.length < 6) {
      setLoginError('Security policy requires passwords to be at least 6 characters in length.');
      return;
    }

    if (isRegisterMode) {
      const trimmedName = regFullName.trim();
      const trimmedCompany = regCompanyName.trim();
      
      if (!trimmedName) {
        setLoginError('Full name is required for registration.');
        return;
      }

      if (!trimmedCompany) {
        setLoginError('Corporate Company name is required.');
        return;
      }

      if (loginPassword !== regConfirmPassword) {
        setLoginError('Passwords do not match. Please verify your entries.');
        return;
      }
    }

    // Pass valid user to global state
    onLogin(targetEmail);
    setIsLoginModalOpen(false);
    
    // Clear form fields
    setLoginEmail('');
    setLoginPassword('');
    setRegFullName('');
    setRegCompanyName('');
    setRegConfirmPassword('');
    setIsRegisterMode(false);
  };

  const handleContactClick = () => {
    const footerElement = document.getElementById('app-footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 text-white shadow-lg" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand section with micro scale lift */}
          <motion.div 
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="flex items-center gap-2.5 sm:gap-4 cursor-pointer group"
            onClick={() => onNavigate('home')}
            id="nav-logo"
          >
            {/* Ultra-premium industrial logo icon container with dynamic multi-layered gradients and active responsive backlight glow */}
            <div className="relative flex items-center justify-center shrink-0" id="nav-logo-icon-wrap">
              {/* Animated high-tech halo rings */}
              <div className="absolute -inset-1 sm:-inset-1.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-600 rounded-lg sm:rounded-xl blur-sm sm:blur-md opacity-25 group-hover:opacity-60 group-hover:blur-lg transition-all duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/80 to-emerald-500/80 rounded-lg sm:rounded-xl opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Inner metallic/architectural chassis */}
              <div className="relative bg-zinc-950 p-[2px] sm:p-[3px] rounded-[8px] sm:rounded-[10px] flex items-center justify-center shadow-2xl">
                <div className="bg-white p-0.5 sm:p-1 rounded-md sm:rounded-lg flex items-center justify-center shadow-inner relative overflow-hidden group-hover:bg-amber-50/95 transition-colors duration-300">
                  {/* Subtle technical scale metric hatch inside */}
                  <div className="absolute inset-0 border border-zinc-100/50 rounded-md sm:rounded-lg pointer-events-none" />
                  <div className="flex sm:hidden items-center justify-center">
                    <SarvshresthLogo size={28} />
                  </div>
                  <div className="hidden sm:flex items-center justify-center">
                    <SarvshresthLogo size={36} />
                  </div>
                </div>
              </div>
              
              {/* Accent micro status indicator pin */}
              <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
            </div>

            {/* Industrial Grade Global Sourcing Typographical block */}
            <div className="flex flex-col text-left select-none" id="nav-logo-text-wrap">
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-lg sm:text-2xl font-black tracking-tight text-white leading-none whitespace-nowrap group-hover:text-amber-400 transition-colors duration-300">
                  SARVSHRESTH
                </span>
                <span className="text-amber-500 font-black text-lg sm:text-xl leading-none">.</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                <span className="font-mono text-[10px] sm:text-[13px] font-black tracking-[0.12em] sm:tracking-[0.2em] text-zinc-300 group-hover:text-amber-400 transition-colors duration-300 leading-none uppercase whitespace-nowrap">
                  SAMBHARAN
                </span>
                <span className="hidden sm:inline h-3.5 w-[1px] bg-zinc-800" />
                <span className="hidden sm:inline font-display font-medium text-[9px] sm:text-[10px] text-zinc-450 text-zinc-400 tracking-wider uppercase whitespace-nowrap leading-none">
                  ISO 9001:2015
                </span>
              </div>
            </div>
          </motion.div>

          {/* Nav Links with custom spring indicators */}
          <div className="hidden md:flex items-center gap-1.5 relative" id="nav-desktop-menu">
            
            <button
              onClick={() => onNavigate('home')}
              className={`relative flex items-center px-4 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer overflow-hidden ${
                currentView === 'home'
                  ? 'text-amber-400 font-extrabold'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
              id="btn-nav-home"
            >
              {currentView === 'home' && (
                <motion.span 
                  layoutId="activeNavHighlight"
                  className="absolute inset-0 bg-zinc-900/80 border border-zinc-800/60 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 220, damping: 21 }}
                />
              )}
              <span className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                Home
              </span>
            </button>
            
            <button
              onClick={() => onNavigate('catalog')}
              className={`relative flex items-center px-4 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer overflow-hidden ${
                currentView === 'catalog' || currentView === 'detail'
                  ? 'text-amber-400 font-extrabold'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
              id="btn-nav-catalog"
            >
              {(currentView === 'catalog' || currentView === 'detail') && (
                <motion.span 
                  layoutId="activeNavHighlight"
                  className="absolute inset-0 bg-zinc-900/80 border border-zinc-800/60 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 220, damping: 21 }}
                />
              )}
              <span className="flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                Catalog
              </span>
            </button>

            <button
              onClick={() => onNavigate('rfq')}
              className={`relative flex items-center px-4 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer overflow-hidden ${
                currentView === 'rfq'
                  ? 'text-amber-400 font-extrabold'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
              id="btn-nav-rfq"
            >
              {currentView === 'rfq' && (
                <motion.span 
                  layoutId="activeNavHighlight"
                  className="absolute inset-0 bg-zinc-900/80 border border-zinc-800/60 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 220, damping: 21 }}
                />
              )}
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Inquiry
              </span>
            </button>

            <button
              onClick={handleContactClick}
              className="relative flex items-center px-4 py-2.5 rounded-lg font-display text-xs uppercase tracking-wider font-bold text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer overflow-hidden"
              id="btn-nav-contact"
            >
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                Contact
              </span>
            </button>

          </div>

          {/* Quote Basket Tray Indicator with dynamic hover zoom and active bounce */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenTray}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border font-display text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                totalItems > 0
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20 shadow-md shadow-amber-500/5'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
              }`}
              id="btn-nav-quote-basket"
            >
              <ShoppingCart className={`w-3.5 h-3.5 ${totalItems > 0 ? 'animate-bounce text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Quote Tray</span>
              <motion.span 
                key={totalItems}
                initial={totalItems > 0 ? { scale: 0.6 } : false}
                animate={totalItems > 0 ? { scale: 1 } : false}
                className={`inline-flex items-center justify-center font-sans font-bold text-[9px] w-4.5 h-4.5 rounded-full ${
                  totalItems > 0 ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {totalItems}
              </motion.span>
            </motion.button>

            {/* Helpline Section & Authentication button */}
            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3 pl-3 border-l border-zinc-850" id="nav-user-profile">
                  <div className="hidden xl:flex flex-col text-left select-none max-w-[110px]">
                    <span className="text-[9px] uppercase tracking-[0.12em] text-zinc-500 font-extrabold leading-none">SECURE SESSION</span>
                    <span className="font-mono text-[10px] font-bold text-amber-500/90 truncate mt-1 animate-pulse" title={currentUser.email}>
                      {currentUser.email}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onLogout}
                    className="bg-zinc-900/60 border border-zinc-850 text-zinc-400 hover:text-rose-500 hover:border-rose-500/30 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    id="btn-nav-logout"
                    title="Log out of Secure Session"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500/90" />
                    <span className="hidden lg:inline font-sans">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setLoginError('');
                    setIsRegisterMode(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/5 transition-all border border-amber-400/15"
                  id="btn-nav-login"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="font-display font-extrabold">Login</span>
                </motion.button>
              )}

              <div className="hidden lg:flex flex-col text-right border-l border-zinc-850 pl-3.5" id="nav-helpline">
                <span className="text-[9px] uppercase tracking-[0.14em] text-zinc-500 font-extrabold leading-none" id="tech-support-label">Technical Support</span>
                <span className="font-mono text-xs font-bold text-zinc-200 flex items-center gap-1.5 mt-1 justify-end leading-none">
                  <PhoneCall className="w-3 h-3 text-amber-500" />
                  +91 90318 60350
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Ergonomic Mobile bottom docked navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-zinc-900 bg-zinc-950/98 backdrop-blur-md justify-around text-[10px] font-display text-zinc-400 font-bold py-2.5 shadow-[0_-10px_25px_rgba(0,0,0,0.6)] h-16 items-center">
        <button 
          onClick={() => onNavigate('home')} 
          className={`flex flex-col items-center gap-1 w-full transition-colors ${currentView === 'home' ? 'text-amber-400 font-black' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <div className="relative bg-white p-[1px] rounded-[5px] flex items-center justify-center shadow-inner shrink-0 border border-zinc-900 w-5.5 h-5.5 overflow-hidden">
            <SarvshresthLogo size={15} />
          </div>
          <span className="uppercase tracking-wider">Home</span>
        </button>
        <button 
          onClick={() => onNavigate('catalog')} 
          className={`flex flex-col items-center gap-1 w-full transition-colors ${currentView === 'catalog' || currentView === 'detail' ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="uppercase tracking-wider">Catalog</span>
        </button>
        <button 
          onClick={() => onNavigate('rfq')} 
          className={`flex flex-col items-center gap-1 w-full transition-colors ${currentView === 'rfq' ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'}`}
        >
          <FileText className="w-4 h-4" />
          <span className="uppercase tracking-wider">Inquiry</span>
        </button>
        <button 
          onClick={handleContactClick} 
          className="flex flex-col items-center gap-1 w-full text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-amber-500/90" />
          <span className="uppercase tracking-wider">Contact</span>
        </button>
        {currentUser ? (
          <button 
            onClick={onLogout} 
            className="flex flex-col items-center gap-1 w-full text-zinc-400 hover:text-rose-450 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-500/90" />
            <span className="uppercase tracking-wider truncate max-w-[62px]">{currentUser.email.split('@')[0]}</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              setLoginError('');
              setIsRegisterMode(false);
              setIsLoginModalOpen(true);
            }} 
            className="flex flex-col items-center gap-1 w-full text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <LogIn className="w-4 h-4 text-amber-500/90" />
            <span className="uppercase tracking-wider">Login</span>
          </button>
        )}
      </div>
    </nav>

    {/* 5. Beautiful Security Authentication Dialog Modal (Email & Password condition) */}
    <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Dark backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden relative shadow-2xl z-10 my-auto"
              id="login-dialog-box"
            >
              {/* Top Warning Strip */}
              <div className="bg-amber-500 h-1.5 w-full shrink-0" />

              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/40 shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-zinc-100">
                    {isRegisterMode ? "First-time Registration" : "Secure Portal Login"}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsLoginModalOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer animate-none"
                  id="btn-close-login"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Login Form with responsive internal scrolling */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-left overflow-y-auto flex-grow scrollbar-thin">
                <p className="text-zinc-400 text-xs font-light leading-relaxed">
                  {isRegisterMode 
                    ? "Initialize your secure industrial profile. Registration allows instant submission of inquiries, catalog exploration, and tracking."
                    : "Active authorized credentials are required to submit industrial inquiries, trace real-time catalog items, and download Inquiry Reference PDFs."}
                </p>

                {loginError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-450 text-xs font-sans font-medium flex items-start gap-2 text-rose-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{loginError}</span>
                  </motion.div>
                )}

                {/* Additional Register Fields */}
                <AnimatePresence>
                  {isRegisterMode && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Full Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text"
                            required={isRegisterMode}
                            value={regFullName}
                            onChange={(e) => setRegFullName(e.target.value)}
                            placeholder="Anirudra Paul"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      {/* Company Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                          Company / Organization Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text"
                            required={isRegisterMode}
                            value={regCompanyName}
                            onChange={(e) => setRegCompanyName(e.target.value)}
                            placeholder="Enterprise Sourcing Ltd"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email input (re-used for login & registration) */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                    Corporate Email ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type="email"
                      required
                      autoComplete="username"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="purchasing@enterprise.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                {/* Password input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block flex justify-between items-center">
                    <span>{isRegisterMode ? "Choose Password" : "Alpha-Security Password"}</span>
                    <span className="text-[9px] text-zinc-500 lowercase font-light">min. 6 characters</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete={isRegisterMode ? "new-password" : "current-password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-10 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password input (only in register mode) */}
                <AnimatePresence>
                  {isRegisterMode && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                        <input 
                          type={showPassword ? "text" : "password"}
                          required={isRegisterMode}
                          autoComplete="new-password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3 pl-10 pr-10 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verification note */}
                <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-900/80 space-y-1">
                  <p className="text-[10px] text-zinc-400 font-bold">💡 INSTANT VERIFICATION POLICY</p>
                  <p className="text-[9px] text-zinc-500 font-light leading-relaxed">
                    {isRegisterMode
                      ? "Entering any corporate email, matching passwords, and details will instantly mock create your authenticated session."
                      : "For verification simplicity, enter any email ID and any password of at least 6 characters."}
                  </p>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                >
                  {isRegisterMode ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isRegisterMode ? "Complete Registration" : "Authenticate Account"}
                </motion.button>

                {/* Mode toggle link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError('');
                      setIsRegisterMode(!isRegisterMode);
                    }}
                    className="text-[10px] uppercase tracking-wider text-amber-500/80 hover:text-amber-400 font-bold hover:underline transition-all cursor-pointer inline-block"
                  >
                    {isRegisterMode 
                      ? "Already have an account? Go to Login" 
                      : "New user? Register as first-time user"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
