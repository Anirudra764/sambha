import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ShoppingCart, HelpCircle, FileText, CheckCircle, Award } from 'lucide-react';
import { Product, QuoteItem } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToQuote: (product: Product, quantity: number, notes?: string, size?: string, material?: string) => void;
  quoteItems: QuoteItem[];
}

const getBlueprintItems = (category: string) => {
  switch (category) {
    case 'Instrument':
      return [
        { id: 1, name: "Clamp-On Transit-Time Transducers", value: "DUAL-BEAM PAIRED", detail: "High-frequency ultrasonic elements offering clean, non-contact signal flow propagation." },
        { id: 2, name: "High-Speed DSP Signal Processing Chip", value: "32-BIT FLOATING POINT", detail: "Calculates flow velocity variations in microseconds with digital noise cancellation filtering." },
        { id: 3, name: "Galvanically Isolated Telemetry Ports", value: "HART / MODBUS ACTIVE", detail: "Ensures noise-free analog and serial telemetry feedback loops directly to PLC racks." },
        { id: 4, name: "Intrinsically Safe Submersible Housing", value: "IP68 ATEX RATED", detail: "Explosion-proof enclosure suitable for Class I Div 1 hazardous petrochemical atmospheres." },
        { id: 5, name: "Integrated Temperature Compensation", value: "RTD PT100 TRACKER", detail: "Continuously adjusts transit calculations based on local thermal fluid density variables." }
      ];
    case 'Motors':
      return [
        { id: 1, name: "Heavy-Duty Cast Iron Frame & Endshields", value: "EN10088 CONFORMING", detail: "Provides structural stability and high corrosion resistance in demanding applications." },
        { id: 2, name: "F-Class Vacuum-Pressure Impregnated Stator", value: "IE3 EFFICIENCY RATED", detail: "Excellent dielectric strength and resistance to thermal stresses under continuous duty." },
        { id: 3, name: "Precision Dynamically Balanced Rotor", value: "ISO 1940 G2.5 LEVEL", detail: "Minimizes vibration amplitudes to protect long-term bearing integrity." },
        { id: 4, name: "Double-Shielded Deep Groove Ball Bearings", value: "C3 CLEARANCE STANDARD", detail: "Pre-lubricated with high-temperature grease for extended maintenance-free service." },
        { id: 5, name: "External Separately Powered Cooling Fan", value: "IP55 FORCE-VENTILATED", detail: "Maintains optimal heat dissipation even during low-speed high-torque operation." }
      ];
    case 'Pumps':
      return [
        { id: 1, name: "Double-Suction Volute Fluid Casing", value: "ASTM A536 DUCTILE IRON", detail: "Optimizes fluid hydraulics and protects against severe water-hammer surges." },
        { id: 2, name: "Closed Dynamic Investment-Cast Impeller", value: "CF8M STAINLESS STEEL", detail: "Precision machined to achieve high hydraulic efficiency and low NPSH requirements." },
        { id: 3, name: "Cartridge Balanced Mechanical Shaft Seals", value: "API 682 PLAN 11/53A", detail: "Zero-leakage secondary containment prevents chemical fluid evaporation leaks." },
        { id: 4, name: "Heavy-Duty Duplex Alloy Steel Shaft", value: "SAF 2205 STANDARD", detail: "Withstands severe torsional stress with virtually zero deflection under load." },
        { id: 5, name: "Intelligent Vibration & Temp Sensors", value: "IOT PRE-FITTED", detail: "Exposes real-time continuous vibrational metrics directly over Modbus telemetry." }
      ];
    case 'Sensors':
      return [
        { id: 1, name: "Piezoresistive Single-Crystal Silicon Core", value: "HASTELLOY DIAPHRAGM", detail: "High-stability pressure sensing cell resists highly aggressive chemical corrosives." },
        { id: 2, name: "High-Resolution Sigma-Delta ADC Module", value: "24-BIT CONVERTER", detail: "Converts subtle pressure deflections to high-speed micro-voltage digital reads." },
        { id: 3, name: "Dynamic Temperature-Compensated ASIC", value: "ACTIVE CORRECTION", detail: "Ensures precise measurements by active compensation of thermal drift gradients." },
        { id: 4, name: "Hermetically Sealed Dual-Compartment Case", value: "NEMA 4X / IP67 SEALED", detail: "Separates sensitive electronics from external toxic environments and moisture." },
        { id: 5, name: "WirelessHART Power-Efficient Transceiver", value: "SAMPLED COMM-LOOP", detail: "Supports self-healing mesh networking for low-power wireless refinery installations." }
      ];
    case 'Valves':
    default:
      return [
        { id: 1, name: "Split-Body Sealing Flanges (ASME B16.34)", value: "100% CONFORMING", detail: "Ensures uniform structural integrity under extreme structural stress loading." },
        { id: 2, name: "Floating Mirror-Finished Solid CF8M Ball", value: "SPHERICITY < 0.05μm", detail: "Reduces torque friction and prevents fluid turbulence degradation." },
        { id: 3, name: "Static Anti-Static Discharge Spindles", value: "PRE-ASSEMBLED", detail: "Grounds electrostatic sparks created by fast flowing mediums." },
        { id: 4, name: "Fire-Safe Metal-to-Metal Backup Ridge", value: "API 607 CERTIFIED", detail: "Maintains zero-leak containment backup during critical high-heat fire bursts." },
        { id: 5, name: "Dual Live-Loaded Belleville Spring Stems", value: "SELF-ADJUSTING", detail: "Compensates for temperature shifts, minimizing routine tightening maintenance." }
      ];
  }
};

const getSpecsSummary = (category: string) => {
  switch (category) {
    case 'Instrument':
      return { label1: "Standard Flow Rate", val1: "1.2 MHz Signals", label2: "Flow Velocity Target", val2: "±0.1 to 12 m/s Active" };
    case 'Motors':
      return { label1: "Insulation Level", val1: "Class F Standard", label2: "VFD Application Factor", val2: "1.15 Continuous Duty" };
    case 'Pumps':
      return { label1: "Hydro Head Limit", val1: "Up to 85 meters", label2: "Maximum Casing Pressure", val2: "16 Bar (PN16 Rating)" };
    case 'Sensors':
      return { label1: "Extreme Overpressure", val1: "150% FS Rating Gate", label2: "Technical Compliance", val2: "IEC 60770 Performance" };
    case 'Valves':
    default:
      return { label1: "Shell Testing Limit", val1: "45 Bar (1.5x PN30)", label2: "Seat Testing Limit", val2: "33 Bar (1.1x PN30)" };
  }
};

export default function ProductDetailView({ product, onBack, onAddToQuote, quoteItems }: ProductDetailViewProps) {
  // Selector inputs
  const [selectedSize, setSelectedSize] = useState('DN50 (2")');
  const [selectedMaterial, setSelectedMaterial] = useState('Reinforced PTFE (RPTFE)');
  const [actuatorOption, setActuatorOption] = useState('Lever Handle with Latch');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSuccessAnimated, setIsSuccessAnimated] = useState(false);
  const [hoveredBlueprintItem, setHoveredBlueprintItem] = useState<number | null>(null);

  // Define customization bounds
  const SIZES = ['DN25 (1")', 'DN50 (2")', 'DN100 (4")', 'DN150 (6")', 'DN200 (8")'];
  const SEAT_MATERIALS = ['Reinforced PTFE (RPTFE)', 'Severe PEEK Option', 'TFM Solid Seat'];
  const ACTUATORS = ['Lever Handle with Latch', 'Worm Gearbox Wheel', 'Pneumatic Double-Acting Unit'];

  const getQuantityInBasket = () => {
    const item = quoteItems.find(i => i.product.id === product.id);
    return item ? item.quantity : 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customNotes = `Size: ${selectedSize}, Seat: ${selectedMaterial}, Actuator: ${actuatorOption}.${notes ? ' ' + notes : ''}`;
    onAddToQuote(product, quantity, customNotes, selectedSize, selectedMaterial);
    
    // Success flash feedback
    setIsSuccessAnimated(true);
    setTimeout(() => {
      setIsSuccessAnimated(false);
    }, 2000);
  };

  const blueprintItems = getBlueprintItems(product.category);
  const specsSummary = getSpecsSummary(product.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 text-left" 
      id="product-detail-view"
    >
      
      {/* Return tracker breadcrumbs - animated icon shift */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors uppercase font-sans cursor-pointer"
        id="btn-detail-back"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        Back to Components Catalog
      </motion.button>

      {/* Main product presentation core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Column - Product Image and Tech exploded view illustration */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Photo Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-6 shadow-sm relative group"
          >
            <span className={`absolute top-4 left-4 z-10 px-2.5 py-1 rounded font-mono text-[9px] font-bold uppercase shadow-sm ${
              product.stockStatus === 'In Stock' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950'
            }`}>
              {product.stockStatus}
            </span>

            <div className="rounded-xl overflow-hidden aspect-[16/10] bg-zinc-950 border border-zinc-900 group">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover grayscale brightness-90 contrast-105 group-hover:scale-104 group-hover:grayscale-0 duration-500 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500">PART: {product.partNumber}</span>
              <span className="font-mono text-[10px] text-amber-500 font-bold tracking-wider">{product.manufacturer}</span>
            </div>
          </motion.div>

          {/* Precision Diagram - Interactive Exploded Mechanical Technical Representation */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-900 text-zinc-100 p-6 rounded-2xl border border-zinc-805 border-zinc-800 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-display text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                {product.partNumber} Technical Details
              </span>
              <span className="font-mono text-[9px] text-amber-500 font-semibold tracking-wider uppercase">
                {product.category} STANDARD ASSEMBLY
              </span>
            </div>            {/* SVG Interactive Blueprint illustration */}
            <div className="bg-zinc-950 rounded-lg p-5 border border-zinc-800 font-mono text-[9px] leading-relaxed relative overflow-hidden" id="blueprint-panel">
              <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />
              
              {/* Layout schema mimicking technical drawing dimensions */}
              <div className="space-y-2.5 relative z-10">
                <div className="flex justify-between items-center text-amber-400 border-b border-zinc-800/60 pb-1.5">
                  <span>DIMENSION / ELEMENT SPECS</span>
                  <span>ALIGNMENT REF</span>
                </div>
                
                {blueprintItems.map((item) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredBlueprintItem(item.id)}
                    onMouseLeave={() => setHoveredBlueprintItem(null)}
                    className="space-y-1 p-1 rounded transition-colors cursor-help duration-200 hover:bg-zinc-900"
                  >
                    <div className="flex justify-between items-center text-zinc-455 text-zinc-400 hover:text-white transition-colors">
                      <span className="font-medium text-zinc-300">[{item.id.toString().padStart(2, '0')}] {item.name}</span>
                      <span className="text-emerald-400 font-bold shrink-0 ml-2">{item.value}</span>
                    </div>

                    <AnimatePresence>
                      {hoveredBlueprintItem === item.id && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[8px] text-amber-450 text-amber-400/80 font-sans pl-4"
                        >
                          {item.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Decorative engineering visual block representation */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 grid grid-cols-2 gap-4 text-[8px] text-zinc-500">
                <div>
                  <p className="font-extrabold text-zinc-400 uppercase tracking-widest">{product.category} Limits</p>
                  <p className="mt-0.5">{specsSummary.label1}: <span className="text-zinc-300">{specsSummary.val1}</span></p>
                  <p>{specsSummary.label2}: <span className="text-zinc-300">{specsSummary.val2}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-zinc-400 uppercase tracking-widest">Document Registry</p>
                  <p className="text-amber-500 font-bold mt-0.5">DWG-{product.partNumber.slice(0, 10).toUpperCase()}-REV1</p>
                  <p>Scale: N.T.S. (Not to Scale)</p>
                </div>
              </div>
            </div>

            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              *Hover over elements on the datasheet diagram to visualize their advanced application limits and materials.
            </p>
          </motion.div>

        </div>

        {/* Right Side Column - Specifications parameters, customization and Cart panel */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Title block */}
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {product.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                PART NO: {product.partNumber}
              </span>
              <span className="font-mono text-xs text-zinc-400 font-semibold uppercase">
                {product.manufacturer}
              </span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed font-light font-sans pt-2">
              {product.longDescription || product.description}
            </p>
          </div>

          {/* Connected parameters configurator layout with smooth sliding transitions */}
          <form 
            onSubmit={handleAddSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5"
            id="detail-customizer-form"
          >
            <h3 className="font-display text-sm font-bold text-white border-b border-zinc-805 border-zinc-800 pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Configure Quote Parameters
            </h3>

            {/* Dimension Selection */}
            <div className="space-y-2.5 text-left">
              <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                1. Bore Connection Diameter Size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SIZES.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`relative py-3.5 px-3 border rounded-lg text-xs font-sans font-semibold text-center transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'text-zinc-950 font-bold border-amber-500'
                          : 'bg-zinc-950 hover:bg-zinc-950/80 text-zinc-300 border-zinc-805 border-zinc-800'
                      }`}
                    >
                      {isSelected && (
                        <motion.span 
                          layoutId="activeSizePill"
                          className="absolute inset-0 bg-amber-500"
                          transition={{ type: "spring", stiffness: 280, damping: 24 }}
                        />
                      )}
                      <span className="relative z-10">{sz}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seat Material Option with sliding mechanics */}
            <div className="space-y-2.5 text-left">
              <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                2. Seat Seal Sealing Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SEAT_MATERIALS.map((seat) => {
                  const isSelected = selectedMaterial === seat;
                  return (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setSelectedMaterial(seat)}
                      className={`relative py-3 px-2 border rounded-lg text-xs font-sans font-semibold text-center transition-all cursor-pointer overflow-hidden ${
                        isSelected
                          ? 'text-zinc-950 font-bold border-amber-500'
                          : 'bg-zinc-950 hover:bg-zinc-950/80 text-zinc-350 text-zinc-300 border-zinc-808 border-zinc-800'
                      }`}
                    >
                      {isSelected && (
                        <motion.span 
                          layoutId="activeMaterialPill"
                          className="absolute inset-0 bg-amber-500"
                          transition={{ type: "spring", stiffness: 280, damping: 24 }}
                        />
                      )}
                      <span className="relative z-10 leading-snug">{seat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Valve Actuation system option */}
            <div className="space-y-2 text-left">
              <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                3. Operations Actuator Style
              </label>
              <select
                value={actuatorOption}
                onChange={(e) => setActuatorOption(e.target.value)}
                className="w-full bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-lg p-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {ACTUATORS.map((act) => (
                  <option key={act} value={act} className="bg-zinc-900 text-zinc-200">
                    {act}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional custom notes */}
            <div className="space-y-1.5 text-left">
              <label className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-wider block text-left">
                Additional Alignment Notes (Optional)
              </label>
              <textarea
                placeholder="e.g. Please supply mill chemical sheet; require NACE MR0175 compliance..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
              />
            </div>

            {/* Quantity Input and Action Button Row with success animation flash feedback */}
            <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-zinc-400 uppercase font-bold">Qty:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 p-2 bg-zinc-950 text-white border border-zinc-800 rounded-lg text-sm text-center focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-sans font-bold text-sm transition-all duration-300 shadow-md cursor-pointer ${
                  isSuccessAnimated
                    ? 'bg-emerald-600 text-white shadow-emerald-600/10'
                    : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/10'
                }`}
                id="btn-add-detail-quote"
              >
                {isSuccessAnimated ? (
                  <motion.div 
                    initial={{ scale: 0.8 }} 
                    animate={{ scale: 1 }} 
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    ADDED TO QUOTE TRAY SUCCESS
                  </motion.div>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    {getQuantityInBasket() > 0 ? 'Update Tray Quantity' : 'Add to Quote Tray'}
                  </>
                )}
              </motion.button>
            </div>

          </form>

          {/* Technical Datasheet Specs spreadsheet */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-zinc-950 px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
              <span className="font-display text-xs font-bold text-white">Complete Component Datasheet Specs</span>
              <span className="font-mono text-[9px] text-zinc-550 text-zinc-500">METRIC STANDARDS APPLIED</span>
            </div>
            
            <div className="divide-y divide-zinc-800/80 font-sans text-xs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex px-5 py-3 items-center hover:bg-zinc-950/40 transition-colors">
                  <span className="w-1/2 text-zinc-400 font-semibold">{key}</span>
                  <span className="w-1/2 text-zinc-200 font-mono font-medium text-left">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
