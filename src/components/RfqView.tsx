import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Send, Upload, Trash2, Building2, AlertTriangle, ShieldCheck, RefreshCw, Layers, Download, LogIn, Lock, Mail, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { QuoteItem } from '../types';

interface RfqViewProps {
  quoteItems: QuoteItem[];
  onClearQuote: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (view: 'home' | 'catalog' | 'detail' | 'rfq') => void;
  currentUser: { email: string } | null;
  onLogin: (email: string) => void;
}

export default function RfqView({ quoteItems, onClearQuote, onUpdateQuantity, onRemoveItem, onNavigate, currentUser, onLogin }: RfqViewProps) {
  // Form input inputs
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [phone, setPhone] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [projectDescription, setProjectDescription] = useState('');

  // Inline lock credentials states
  const [isInlineRegisterMode, setIsInlineRegisterMode] = useState(false);
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineFullName, setInlineFullName] = useState('');
  const [inlineCompanyNameState, setInlineCompanyNameState] = useState('');
  const [inlineConfirmPassword, setInlineConfirmPassword] = useState('');
  const [inlineShowPassword, setInlineShowPassword] = useState(false);
  const [inlineError, setInlineError] = useState('');

  // Align form's email input with authorized user
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleInlineLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError('');

    const targetEmail = inlineEmail.trim();
    if (!targetEmail || !targetEmail.includes('@') || !targetEmail.includes('.')) {
      setInlineError('Please enter a valid Corporate Email ID with @ and . characters.');
      return;
    }

    if (!inlinePassword || inlinePassword.length < 6) {
      setInlineError('Password must be at least 6 characters in length.');
      return;
    }

    if (isInlineRegisterMode) {
      const trimmedName = inlineFullName.trim();
      const trimmedCompany = inlineCompanyNameState.trim();

      if (!trimmedName) {
        setInlineError('Full Name is required for registration.');
        return;
      }

      if (!trimmedCompany) {
        setInlineError('Company / organization name is required.');
        return;
      }

      if (inlinePassword !== inlineConfirmPassword) {
        setInlineError('Passwords do not match. Please verify your entries.');
        return;
      }
    }

    onLogin(targetEmail);
    setInlineEmail('');
    setInlinePassword('');
    setInlineFullName('');
    setInlineCompanyNameState('');
    setInlineConfirmPassword('');
    setIsInlineRegisterMode(false);
  };

  // File handling
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Submission process
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionKey, setSubmissionKey] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [validationError, setValidationError] = useState('');

  // Drag and drop attachment mechanics
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setAttachedFile(file);

    // Linear progress animation
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleDownloadPDF = (rfqKey?: string) => {
    const keyToUse = rfqKey || submissionKey || `RFQ-88291-B-${Math.floor(1000 + Math.random() * 9000)}`;
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Top header banner background (black)
      doc.setFillColor(15, 23, 42); // slate-900 / black
      doc.rect(0, 0, 210, 40, 'F');

      // Gold indicator strip under header
      doc.setFillColor(217, 119, 6); // Amber-600
      doc.rect(0, 40, 210, 1.5, 'F');

      // Company logo text (SARVSHRESTH SAMBHARAN)
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('SARVSHRESTH', 20, 16);
      
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(245, 158, 11); // Amber-500
      doc.text('S A M B H A R A N', 20, 22);

      // Subtitle
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(156, 163, 175); // gray-400
      doc.text('PREMIUM INDUSTRIAL PROCUREMENT & INVENTORY SOURCING NETWORK', 20, 28);

      // Header address on right
      doc.setTextColor(241, 245, 249); // slate-100
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('SARVSHRESTH SAMBHARAN', 190, 14, { align: 'right' });
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(203, 213, 225); // slate-300
      doc.text('43, NEW KASHIDIH, SAKCHI, JAMSHEDPUR - 831001', 190, 19, { align: 'right' });
      doc.text('Technical support: +91 90318 60350', 190, 24, { align: 'right' });
      doc.text('Authorized Commercial Distributor Network', 190, 29, { align: 'right' });

      // Main Document Label
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(15, 48, 180, 25, 'F');
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.rect(15, 48, 180, 25, 'S');

      // Official Inquiry text
      doc.setTextColor(15, 23, 42); // slate-900
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('OFFICIAL INQUIRY RECEIPT', 22, 58);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // slate-500
      const currentDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(`Generated on: ${currentDate}`, 22, 64);

      // Inquiry Ref Code info on right
      doc.setTextColor(15, 23, 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`Inquiry Number: ${keyToUse}`, 180, 58, { align: 'right' });

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(217, 119, 6);
      doc.text(`Urgency: ${urgency.toUpperCase()} PRIORITY`, 180, 64, { align: 'right' });

      // Columns for Company & Contact Information
      doc.setTextColor(15, 23, 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('CUSTOMER / SOURCING ENTITY', 15, 84);

      // Underline
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.3);
      doc.line(15, 86, 100, 86);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85); // slate-700
      doc.text(`Company Name: ${companyName}`, 15, 93);
      doc.text(`Contact Person: ${contactName}`, 15, 99);
      doc.text(`Corporate Email: ${email}`, 15, 105);
      doc.text(`Direct Mobile: ${phone}`, 15, 111);

      // Right column: Inquiry Parameters
      doc.setTextColor(15, 23, 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('DISPATCH CHANNELS', 115, 84);

      doc.setDrawColor(15, 23, 42);
      doc.line(115, 86, 195, 86);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      doc.text(`Official Channel: Secure Client Interlink`, 115, 93);
      doc.text(`Security Protocol: SHA-256 Verified`, 115, 99);
      doc.text(`Target Response: < ${urgency === 'Critical' ? '2 Hours' : urgency === 'High' ? '12 Hours' : '24 Hours'}`, 115, 105);
      doc.text(`Schematic Attached: ${attachedFile ? attachedFile.name : 'None'}`, 115, 111);

      // Sourcing items / parts table
      let currentY = 125;
      doc.setTextColor(15, 23, 42);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('INDIVIDUAL COMPONENT REQUISITIONS', 15, currentY);

      // Table line
      doc.setDrawColor(217, 119, 6);
      doc.line(15, currentY + 2, 195, currentY + 2);

      // Table Headers
      currentY += 8;
      doc.setFillColor(15, 23, 42);
      doc.rect(15, currentY - 5, 180, 7, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('S.No.', 18, currentY);
      doc.text('Product Name & Specifications', 35, currentY);
      doc.text('SKU / Part Number', 135, currentY);
      doc.text('Qty', 185, currentY, { align: 'right' });

      // Rows
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(51, 65, 85);

      if (quoteItems.length > 0) {
        quoteItems.forEach((item, index) => {
          currentY += 8;
          
          // Page breakaway safety check
          if (currentY > 265) {
            doc.addPage();
            currentY = 25;
            // repeat headers on new page
            doc.setFillColor(15, 23, 42);
            doc.rect(15, currentY - 5, 180, 7, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('Helvetica', 'bold');
            doc.text('S.No.', 18, currentY);
            doc.text('Product Name & Specifications', 35, currentY);
            doc.text('SKU / Part Number', 135, currentY);
            doc.text('Qty', 185, currentY, { align: 'right' });
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(51, 65, 85);
            currentY += 8;
          }

          // Draw light strip for zebra stripes
          if (index % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(15, currentY - 6, 180, 8, 'F');
          }

          doc.setFont('Helvetica', 'normal');
          doc.text(`${index + 1}`, 18, currentY - 1);
          
          // Product Name text trimming helper
          let nameDesc = item.product.name;
          if (item.customNotes) {
            nameDesc += ` [Note: ${item.customNotes}]`;
          }
          const itemText = doc.splitTextToSize(nameDesc, 95);
          doc.text(itemText, 35, currentY - 1);
          
          doc.text(item.product.partNumber, 135, currentY - 1);
          doc.text(`${item.quantity}`, 185, currentY - 1, { align: 'right' });

          // If text wrapped, adjust currentY
          if (itemText.length > 1) {
            currentY += (itemText.length - 1) * 3.5;
          }
        });
      } else {
        currentY += 8;
        doc.setFillColor(248, 250, 252);
        doc.rect(15, currentY - 6, 180, 10, 'F');
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text('No direct components selected. Drawing blueprint list attached.', 35, currentY);
        currentY += 2;
      }

      // Draw separator line under table boundary
      currentY += 5;
      doc.setDrawColor(226, 232, 240);
      doc.line(15, currentY, 195, currentY);

      // Additional Sourcing / Project Notes Section
      if (projectDescription.trim()) {
        currentY += 10;
        
        // Safety check for space remaining
        if (currentY > 240) {
          doc.addPage();
          currentY = 25;
        }

        doc.setTextColor(15, 23, 42);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('ADDITIONAL PROJECT SPECIFICATIONS & CONTEXT', 15, currentY);
        
        currentY += 4;
        doc.setFillColor(250, 250, 250);
        doc.setDrawColor(240, 240, 240);
        
        const descText = doc.splitTextToSize(projectDescription, 172);
        const boxHeight = descText.length * 4.5 + 6;
        
        doc.rect(15, currentY, 180, boxHeight, 'F');
        doc.rect(15, currentY, 180, boxHeight, 'S');
        
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(71, 85, 105);
        doc.text(descText, 19, currentY + 5);
        
        currentY += boxHeight;
      }

      // Draw Pledge & Signature at the bottom of the last page
      const pageHeight = doc.internal.pageSize.height;
      
      // If we don't have enough space for signature block, add a page
      if (currentY > pageHeight - 50) {
        doc.addPage();
        currentY = 25;
      }

      currentY = pageHeight - 45;

      // Pledge text
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('Disclaimer: This is a professional digital summary of a sourcing request dispatched securely to our sales support line.', 15, currentY);
      doc.text('Pricing estimates, lead times, and official commercial quotes are routed via the stated email address in compliance with commercial policies.', 15, currentY + 3.5);

      // Signature Block layout representation
      doc.setDrawColor(203, 213, 225);
      doc.line(140, currentY + 15, 190, currentY + 15);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Authorized Signatory', 140, currentY + 19);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('SARVSHRESTH SAMBHARAN', 140, currentY + 23);

      // Digital watermark stamp
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.4);
      doc.rect(15, currentY + 10, 50, 15);
      doc.setTextColor(217, 119, 6);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text('SECURE TRANSMISSION', 18, currentY + 15);
      doc.text('VERIFIED DOCUMENT', 21, currentY + 20);

      // Save the document
      doc.save(`Sarvshresth_Sambharan_RFQ_${keyToUse}.pdf`);
    }).catch(err => {
      console.error("Failed to render PDF using jsPDF: ", err);
    });
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Sourcing client validation
    if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setValidationError('Please populate all required details (*): Company Name, Contact Name, Email, and Phone Number.');
      return;
    }

    if (quoteItems.length === 0 && !attachedFile) {
      setValidationError('Cannot dispatch an empty request. Please select a catalog part or attach a BOM blueprint drawing sheet.');
      return;
    }

    // Generate random unique key in specified format
    const key = `RFQ-88291-B-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmissionKey(key);
    setIsSubmitted(true);

    // Automatically trigger PDF receipt generation for future reference
    try {
      handleDownloadPDF(key);
    } catch (e) {
      console.error("Auto pdf launch skipped: ", e);
    }

    // Populate log simulations
    const logs = [
      `[SYS_CONN] Establishing secure dual-pipe interlink with SAP-PP Server...`,
      `[SYS_AUTH] Verifying authentication credentials of corporate node... OK`,
      `[SYS_BOM] Generating secure quote request manifest for ${quoteItems.length} categories...`,
      `[SYS_PROP] Urgency declared: [${urgency.toUpperCase()}]. Routing to expedited priority channel...`,
      `[SYS_DOC] Compiling attached schematic blueprints: ${attachedFile ? attachedFile.name : 'N/A'} ... COMPLETED.`,
      `[SYS_LOG] Transmission completed securely. Keys successfully persisted locally.`,
      `[SYS_KEY] SECURE RFQ HASH CODE LOGGED: ${key}`
    ];

    setTerminalLogs([]);
    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, log]);
      }, (index + 1) * 355);
    });
  };

  const handleResetForm = () => {
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setUrgency('Medium');
    setProjectDescription('');
    setAttachedFile(null);
    setUploadProgress(0);
    setIsSubmitted(false);
    onClearQuote();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 text-left" 
      id="rfq-view"
    >
      
      {/* View Title */}
      <div className="border-b border-zinc-805 border-zinc-840 border-zinc-800 pb-5">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-zinc-100">
          Request For Quotation (RFQ)
        </h1>
        <p className="text-zinc-400 text-sm mt-1 max-w-3xl font-light">
          Complete individual corporate specifications, review selected parts list, drag-and-drop BOM schematic drawings, and dispatch immediately to our engineering desk.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!currentUser ? (
          /* PURE INDUSTRIAL AUTHENTICATION LOCK SCREEN */
          <motion.div
            key="lock-screen"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="max-w-xl mx-auto space-y-6"
            id="rfq-locked-gate"
          >
            <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl relative p-8 space-y-6 text-center">
              <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
              
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 animate-pulse">
                {isInlineRegisterMode ? <UserPlus className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl font-black text-zinc-100 uppercase tracking-wide">
                  {isInlineRegisterMode ? "First-time Registration" : "Corporate Verification Required"}
                </h2>
                <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-sm mx-auto">
                  {isInlineRegisterMode
                    ? "Initialize your secure profile to submit official Request For Quotations (RFQ), access real-time dispatch manifests, and generate formal legal Inquiry PDFs."
                    : "To submit official Request For Quotations (RFQ), access real-time dispatch manifests, and generate formal legal Inquiry PDFs, you must log in with your authorized corporate credentials."}
                </p>
              </div>

              {inlineError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-450 text-xs font-sans font-medium flex items-start gap-2 text-rose-400 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span>{inlineError}</span>
                </div>
              )}

              <form onSubmit={handleInlineLoginSubmit} className="space-y-4 text-left">
                {/* Additional Register Fields */}
                <AnimatePresence>
                  {isInlineRegisterMode && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text"
                            required={isInlineRegisterMode}
                            value={inlineFullName}
                            onChange={(e) => setInlineFullName(e.target.value)}
                            placeholder="Anirudra Paul"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block">
                          Company / Organization Name
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                          <input 
                            type="text"
                            required={isInlineRegisterMode}
                            value={inlineCompanyNameState}
                            onChange={(e) => setInlineCompanyNameState(e.target.value)}
                            placeholder="Enterprise Sourcing Ltd"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
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
                      value={inlineEmail}
                      onChange={(e) => setInlineEmail(e.target.value)}
                      placeholder="procurement@enterprise.com"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400 block flex justify-between items-center">
                    <span>{isInlineRegisterMode ? "Choose Password" : "Alpha-Security Password"}</span>
                    <span className="text-[9px] text-zinc-500 lowercase font-light">min. 6 characters</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type={inlineShowPassword ? "text" : "password"}
                      required
                      autoComplete={isInlineRegisterMode ? "new-password" : "current-password"}
                      value={inlinePassword}
                      onChange={(e) => setInlinePassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 pl-10 pr-10 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setInlineShowPassword(!inlineShowPassword)}
                      className="absolute right-3 top-3.5 text-zinc-505 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    >
                      {inlineShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password input (only in inline register mode) */}
                <AnimatePresence>
                  {isInlineRegisterMode && (
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
                          type={inlineShowPassword ? "text" : "password"}
                          required={isInlineRegisterMode}
                          autoComplete="new-password"
                          value={inlineConfirmPassword}
                          onChange={(e) => setInlineConfirmPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-3.5 pl-10 pr-10 text-xs font-sans text-white focus:outline-none focus:border-amber-500 transition-colors placeholder:text-zinc-650 placeholder:text-zinc-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verification credential help block */}
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-900/80 space-y-1">
                  <p className="text-[10px] text-zinc-400 font-bold">💡 INSTANT VERIFICATION POLICY</p>
                  <p className="text-[9px] text-zinc-500 font-light leading-relaxed">
                    {isInlineRegisterMode
                      ? "Entering any corporate details, email, and matching passwords will instantly mock create your verified session."
                      : "You can enter any valid email syntax (e.g. user@test.com) and any password with at least 6 characters to instantly authenticate."}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10"
                >
                  {isInlineRegisterMode ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  {isInlineRegisterMode ? "Complete Registration & Unlock Form" : "Authenticate & Unlock RFQ Form"}
                </motion.button>

                {/* Mode toggle link */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setInlineError('');
                      setIsInlineRegisterMode(!isInlineRegisterMode);
                    }}
                    className="text-[10px] uppercase tracking-wider text-amber-500/80 hover:text-amber-400 font-bold hover:underline transition-all cursor-pointer inline-block"
                  >
                    {isInlineRegisterMode 
                      ? "Already have an account? Go to Login" 
                      : "New user? Register as first-time user"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : isSubmitted ? (
          /* SUCCESS TRANSACTION PURE BLACK TERMINAL FRAME */
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="max-w-4xl mx-auto space-y-6" 
            id="rfq-success-screen"
          >
            
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <div className="absolute inset-0 engineering-grid opacity-15 pointer-events-none" />
              
              {/* Header tab */}
              <div className="bg-slate-900 px-6 py-4 border-b border-slate-805 border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-300">SECURE DISPATCH VERIFICATION</span>
                </div>
                <span className="font-mono text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-extrabold">
                  TRANSMISSION SUCCESS
                </span>
              </div>

              {/* Content core */}
              <div className="p-8 space-y-8 relative z-10 text-center">
                
                {/* Mechanical checkmark */}
                <motion.div 
                  initial={{ scale: 0.8, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto w-16 h-16 rounded-full bg-emerald-550/15 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5 animate-pulse"
                >
                  <ShieldCheck className="w-10 h-10 stroke-[2]" />
                </motion.div>

                <div className="space-y-2">
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                    Transmission Received Seamlessly
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-md mx-auto font-light leading-relaxed">
                    Your engineering bundle has been compiled, assigned a global industrial ticket, and routed to the corresponding corporate lead desk.
                  </p>
                </div>

                {/* Secure ID Container */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 max-w-md mx-auto cursor-pointer"
                >
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">
                    OFFICIAL RFQ SPECIFIER KEY
                  </span>
                  <span className="font-mono text-lg sm:text-xl font-bold text-amber-400 tracking-wider">
                    {submissionKey}
                  </span>
                </motion.div>

                {/* Real-time Simulated Terminal Output logs */}
                <div className="text-left bg-black border border-zinc-900 rounded-lg p-5 max-w-2xl mx-auto font-mono text-[11px] text-emerald-500 space-y-2 leading-relaxed min-h-[160px]">
                  <div className="text-slate-500 border-b border-zinc-900 pb-2 mb-3 flex justify-between items-center text-[10px]">
                    <span>INTERLINK LOG OUTPUT</span>
                    <span>SYSTEM FEEDBACK</span>
                  </div>
                  {terminalLogs.map((log, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-2"
                    >
                      <span className="text-slate-600 shrink-0 select-none">[{index + 1}]</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                  {terminalLogs.length < 7 && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                      <span>Synchronizing packets with core distribution database...</span>
                    </div>
                  )}
                </div>

                {/* Registered submission summary details card */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 max-w-2xl mx-auto text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5 text-slate-300">
                    <p className="font-mono text-[9px] text-zinc-550 text-zinc-500 uppercase tracking-wider">Contact Information</p>
                    <p className="font-sans font-bold text-white text-sm">{contactName}</p>
                    <p className="font-sans">{companyName}</p>
                    <p className="font-sans text-slate-400">{email} | {phone}</p>
                  </div>
                  <div className="space-y-1.5 text-slate-300">
                    <p className="font-mono text-[9px] text-zinc-550 text-zinc-500 uppercase tracking-wider">Request urgency level</p>
                    <span className={`inline-block px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase mt-1 ${
                      urgency === 'Critical' ? 'bg-rose-500 text-white' : urgency === 'High' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {urgency} Priority Response
                    </span>
                    <p className="font-sans text-slate-400 mt-2 font-light">
                      {attachedFile ? `Attached: ${attachedFile.name}` : 'No schematic files attached'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownloadPDF(submissionKey)}
                    className="bg-emerald-600 hover:bg-emerald-550 text-white font-sans font-bold text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-500/15"
                  >
                    <Download className="w-4 h-4" />
                    Download Sourcing Inquiry PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('catalog')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Return to Components Catalog
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetForm}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs px-5 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Create New RFQ Request
                  </motion.button>
                </div>

              </div>

            </div>

          </motion.div>
        ) : (
          /* PRIMARY FORM AND ITEM REVIEW GRID */
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8" 
            id="rfq-entry-frame"
          >
            
            {/* Left Column: Form & Attachments */}
            <div className="lg:col-span-7 space-y-6">
              
              <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5" id="rfq-core-form">
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="font-display text-sm font-bold text-zinc-100 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-500" />
                    Corporate Credentials Information
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">* Required details</span>
                </div>

                {validationError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-rose-950/20 border border-rose-805 border-rose-800 text-rose-200 p-4 rounded-lg flex gap-3 text-xs" 
                    id="validation-alert-box"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <p className="font-medium text-left">{validationError}</p>
                  </motion.div>
                )}

                {/* Form Entry grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Company Name */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Reliance Petrochemicals Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-zinc-900 text-white border border-zinc-800 rounded-lg p-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium placeholder-zinc-500"
                    />
                  </div>

                  {/* Contact name */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                      Contact Engineer / Buyer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Er. Rajesh Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-zinc-900 text-white border border-zinc-800 rounded-lg p-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium placeholder-zinc-500"
                    />
                  </div>

                  {/* Contact email */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                      Official Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. r.kumar@reliancepetro.co.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900 text-white border border-zinc-800 rounded-lg p-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium placeholder-zinc-500"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                      Direct Mobile / Ext Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98450 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 text-white border border-zinc-800 rounded-lg p-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-medium placeholder-zinc-500"
                    />
                  </div>

                </div>

                 {/* Urgency selection options with sleek layout slide highlight */}
                <div className="space-y-2.5 pt-2 text-left">
                  <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                    Procurement Urgency / Response Speed Requirements
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Low', 'Medium', 'High', 'Critical'] as const).map((lv) => {
                      const isSelected = urgency === lv;
                      return (
                        <button
                          key={lv}
                          type="button"
                          onClick={() => setUrgency(lv)}
                          className={`relative py-3 px-3 border rounded-lg text-xs font-sans font-bold text-center transition-all cursor-pointer overflow-hidden ${
                            isSelected
                              ? 'text-zinc-950 font-bold border-transparent'
                              : 'bg-zinc-900 hover:bg-zinc-855 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                          }`}
                        >
                          {isSelected && (
                            <motion.span 
                              layoutId="activeUrgencyBackground"
                              className={`absolute inset-0 ${
                                lv === 'Critical' ? 'bg-rose-500 text-white' : lv === 'High' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-100 text-zinc-950'
                              }`}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                          )}
                          <span className={`relative z-10 ${isSelected && (lv === 'Critical' || lv === 'High' ? 'text-zinc-950' : 'text-zinc-950')}`}>
                            {lv}
                            {lv === 'Critical' && ' (2 Hr)'}
                            {lv === 'High' && ' (12 Hr)'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project description box */}
                <div className="space-y-1.5 text-left">
                  <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                    Project Context / Custom Sourcing Details
                  </label>
                  <textarea
                    placeholder="e.g. This is for the quarterly maintenance shutdown of Sulphur extraction Unit-C. Ensure parts come packed with chemical analysis tags..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 text-white font-sans placeholder-zinc-500"
                  />
                </div>

                {/* File Attachment Area */}
                <div className="space-y-2 text-left">
                  <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                    Attach Drawing Blueprints / BOM Sheets (PDF, XLSX)
                  </label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                      dragActive
                        ? 'border-amber-500 bg-amber-500/10'
                        : attachedFile
                          ? 'border-emerald-500/50 bg-emerald-500/5'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900'
                    }`}
                    id="drag-and-drop-zone"
                  >
                    <input
                      type="file"
                      id="file-upload-input"
                      multiple={false}
                      accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpg"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {attachedFile ? (
                      <div className="space-y-3" id="file-progress-block">
                        <motion.div 
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-3 bg-zinc-900 p-3 border border-zinc-800 rounded-lg max-w-md mx-auto relative shadow-sm"
                        >
                          <FileText className={`w-8 h-8 ${isUploading ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`} />
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-xs font-bold text-white truncate">{attachedFile.name}</p>
                            <p className="text-[10px] text-zinc-400 font-mono">{(attachedFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-450 hover:text-rose-400 p-1.5 rounded cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>

                        {/* Progress bar loader */}
                        {isUploading && (
                          <div className="max-w-md mx-auto space-y-1">
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <motion.div 
                                className="bg-amber-500 h-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                            <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block text-right">
                              PARSING BLUEPRINTS... {uploadProgress}%
                            </span>
                          </div>
                        )}

                        {!isUploading && (
                          <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-widest block text-center uppercase">
                            ✓ PARSING SKUs COMPLETED SUCCESSFULLY
                          </span>
                        )}

                      </div>
                    ) : (
                      <label htmlFor="file-upload-input" className="cursor-pointer space-y-2 block">
                        <div className="w-12 h-12 rounded-full bg-zinc-900 mx-auto flex items-center justify-center text-zinc-400">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-sans text-xs font-bold text-zinc-200">Drag & Drop drawings or Bill of Materials (BOM) checklist</p>
                          <p className="font-sans text-[10px] text-zinc-500 font-light">PDF, Excel, Word documents up to 10MB acceptable</p>
                        </div>
                        <span className="inline-block mt-2 font-mono text-[9px] text-amber-500 font-bold border border-amber-550/20 border-amber-500/20 px-2 py-1 rounded bg-amber-505 bg-amber-500/5 hover:bg-amber-500/10 uppercase">
                          Select File Locally
                        </span>
                      </label>
                    )}

                  </div>
                </div>

                {/* Submission dispatch action button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-bold text-sm py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
                  id="btn-rfq-submit"
                >
                  <Send className="w-4 h-4 text-zinc-950" />
                  Dispatch Custom RFQ interlink Manifest
                </motion.button>

              </form>

            </div>

            {/* Right Column: Basket Review with smooth exit/rearranging logic */}
            <div className="lg:col-span-5 space-y-6" id="rfq-summary-checklist">
              
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="font-display text-sm font-bold text-zinc-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500" />
                    Your Quotation Basket
                  </span>
                  {quoteItems.length > 0 && (
                    <button
                      onClick={onClearQuote}
                      className="font-mono text-[9px] text-rose-400 font-bold uppercase hover:text-rose-300 cursor-pointer"
                    >
                      Empty Basin
                    </button>
                  )}
                </div>

                {quoteItems.length > 0 ? (
                  <motion.div 
                    layout 
                    className="space-y-4 divide-y divide-zinc-900"
                  >
                    <AnimatePresence mode="popLayout">
                      {quoteItems.map((item) => (
                        <motion.div 
                          layout
                          key={item.product.id} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="pt-3 first:pt-0 flex justify-between gap-3 text-xs" 
                          id={`rfq-item-${item.product.id}`}
                        >
                          
                          <div className="space-y-1 text-left flex-1 min-w-0">
                            <p className="font-display font-medium text-white hover:text-amber-400 cursor-pointer truncate">
                              {item.product.name}
                            </p>
                            <p className="font-mono text-[9px] text-zinc-400">PART #: {item.product.partNumber}</p>
                            
                            {/* Custom configuration detail badges tag */}
                            {item.customNotes && (
                              <div className="font-mono text-[9px] text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 mt-1">
                                {item.customNotes}
                              </div>
                            )}
                          </div>

                          {/* Up/Down quantity adjust panel */}
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <div className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-900 p-1 rounded-md">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => onUpdateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-10 bg-transparent text-center font-mono text-[10px] font-bold text-white focus:outline-none"
                              />
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-zinc-405 text-zinc-400 hover:text-rose-455 hover:text-rose-400 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className="text-center py-10 space-y-2 text-zinc-500 font-sans" id="quotation-tray-empty font-sans">
                    <p className="text-xs font-light text-zinc-400 font-medium">No direct catalog product parts have been selected.</p>
                    <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                      You can still finalize form submission to request pricing on custom lists or drawings attached.
                    </p>
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="mt-2 text-amber-500 hover:text-amber-400 font-mono text-[9px] uppercase font-bold cursor-pointer"
                    >
                      + ADD DIRECT PARTS FROM CATALOG
                    </button>
                  </div>
                )}

                {/* Sourcing credentials pledge */}
                <div className="border-t border-zinc-800 pt-4 bg-zinc-900/30 -mx-5 -mb-5 p-5 rounded-b-2xl space-y-2 text-[11px] text-zinc-400">
                  <span className="font-mono text-[9px] text-emerald-400 tracking-wider font-extrabold flex items-center gap-1">
                    ✓ SECURE INTERLINK GUARANTEE
                  </span>
                  <p className="font-light leading-relaxed text-left text-zinc-405">
                    We warrant that all commercial offers issued represents authentic catalog products complying exclusively with the corresponding industrial test standards.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
