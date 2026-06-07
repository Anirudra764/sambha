import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'fb-2000',
    partNumber: 'FB-2000-SS4',
    name: 'Floating Ball Valve FB-2000 Series',
    category: 'Valves',
    manufacturer: 'Kitz-Yamada Systems',
    description: 'High-performance split body flanged ball valve engineered for critical service chemical and industrial pipelines.',
    longDescription: 'The FB-2000 Series is a premium side-entry, class 150/300 flanged floating ball valve optimized for process lines. It features a blow-out proof stem, highly durable fire-safe certified design context (API 607), and anti-static devices. The precision-machined spherical mirror ball ensures low torque operation and leakage-free sealing across severe temperature cycles.',
    imageUrl: 'https://images.unsplash.com/photo-1617447820468-b7a2da6a603c?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'In Stock',
    priceRange: 'Quote on Request',
    applications: ['Oil & Gas Refineries', 'Chemical Processing', 'Steam Distribution Systems', 'Water Treatment'],
    specs: {
      'Size Range': '1/2" to 8" (DN15 - DN200)',
      'Pressure Class': 'ASME Class 150 / 300 / 600',
      'Body Material': 'ASTM A351 Gr. CF8M Stainless Steel',
      'Seat Material': 'Reinforced PTFE (RPTFE) / PEEK / Delrin',
      'Temperature Range': '-29°C to 232°C (-20°F to 450°F)',
      'End Connection': 'Flanged RF (Raised Face)',
      'Design Standards': 'API 608, BS 5351, ASME B16.34',
      'Fire Safe Certification': 'API 607 6th Edition compliant'
    },
    datasheetUrl: '#'
  },
  {
    id: 'fm-3022',
    partNumber: 'FM-3022-UT',
    name: 'Digital Ultrasonic Flowmeter FM-3000 Series',
    category: 'Instrument',
    manufacturer: 'Honeywell Process Solutions',
    description: 'Clamp-on ultrasonic flowmeter offering non-invasive, high-precision velocity measurements for liquid process lines.',
    longDescription: 'The FM-3000 Series is a high-accuracy, clamp-on ultrasonic flowmeter engineered for non-contact measurement of clean and mildly aerated liquids in pressurized conduits. Utilizing cutting-edge transit-time differential technology, it eliminates pressure drop, line contamination, and flange leakage risks, providing real-time telemetry over Modbus, HART, and 4-20mA outputs.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'In Stock',
    priceRange: 'Quote on Request',
    applications: ['Petrochemical Transport Pipelines', 'Cooling Water Monitoring', 'High-Purity Process Fluids', 'Desalination Plants'],
    specs: {
      'Measurement Method': 'Transit-Time Ultrasonic Metering',
      'Pipe Size Range': 'DN15 to DN6000 (1/2" to 240")',
      'Fluid Velocity Limit': '± 12 m/s (Dual Directional)',
      'System Accuracy': '± 0.5% of Readout Value',
      'Telemetry Communications': 'HART 7.0, Modbus RTU, 4-20mA Active Loop',
      'Operating Temperature': '-40°C to 150°C (-40°F to 302°F)',
      'Enclosure Rating': 'IP68 Submersible / Explosion Proof NEMA 4X',
      'Power Requirement': '24V DC / Power-over-Ethernet (PoE)'
    },
    datasheetUrl: '#'
  },
  {
    id: 'im-75kw',
    partNumber: 'IM-E3-132S4',
    name: 'Heavy-Duty 3-Phase Induction Motor',
    category: 'Motors',
    manufacturer: 'Siemens Industrial AG',
    description: 'Ultra-efficient IE3 class squirrel cage induction motor with rugged cast iron frame for harsh continuous processing duties.',
    longDescription: 'The Siemens IE3 Series motors offer excellent energy-savings and reliability in dusty or humid environments (IP55 rated). Features continuous F-class insulation (with B-class temp rise limit) and double-shielded bearings for exceptional service life under variable frequency drive (VFD) controls.',
    imageUrl: 'https://images.unsplash.com/photo-1590372648787-bf53026e08df?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'Lead Time 1-2 Weeks',
    priceRange: 'Quote on Request',
    applications: ['Industrial Air Fans & Blowers', 'Conveyors', 'Heavy Compressors', 'Machine Tools'],
    specs: {
      'Rated Power': '7.5 kW (10 HP)',
      'No. of Poles': '4 Pole',
      'Synchronous Speed': '1500 RPM',
      'Rated Voltage': '415V Δ / 690V Y, 3-Phase, 50 Hz',
      'Efficiency Class': 'IE3 Premium Efficiency (89.5%)',
      'Enclosure Class': 'IP55, TEFC (Totally Enclosed Fan Cooled)',
      'Frame Size': '132M (Solid Cast Iron)',
      'Shaft Diameter': '38 mm'
    },
    datasheetUrl: '#'
  },
  {
    id: 'cp-450m',
    partNumber: 'CP-450M-S',
    name: 'Industrial Centrifugal Water Pump',
    category: 'Pumps',
    manufacturer: 'Kirloskar-Sulzer Pumps',
    description: 'High-volume process centrifugal pump for clean water delivery, cooling towers, and light industrial chemicals.',
    longDescription: 'A single-stage, end-suction, back-pull-out pump featuring a closed impeller and double-volute casing. Designed in strict compliance with ISO 2858 and DIN 24256 standards, enabling easy maintenance without disturbing suction/discharge pipelines.',
    imageUrl: 'https://images.unsplash.com/photo-1542124948-ed391de08a2c?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'Lead Time 3-4 Weeks',
    priceRange: 'Quote on Request',
    applications: ['Cooling Tower Systems', 'Industrial Water Supply', 'HVAC Circulation', 'Agriculture Irrigation'],
    specs: {
      'Maximum Discharge Rate': '120 m³/hr',
      'Total Dynamic Head': '45 meters',
      'Suction Port Size': 'DN 80 (Flanged PN16)',
      'Discharge Port Size': 'DN 50 (Flanged PN16)',
      'Impeller Material': 'Cast Bronze (Grade G-CuSn10)',
      'Shaft Seal Type': 'Silicon Carbide Mechanical Seal',
      'Maximum Power Input': '18.5 kW',
      'Max Fluid Temp': '120°C (248°F)'
    },
    datasheetUrl: '#'
  },
  {
    id: 'pt-200p',
    partNumber: 'PT-200-BAR',
    name: 'Precision Pressure Transmitter',
    category: 'Sensors',
    manufacturer: 'Honeywell Process Solutions',
    description: 'Industrial-grade piezoresistive pressure transmitter with 4-20mA smart HART communication protocol.',
    longDescription: 'The PT-200 series provides high-precision pressure readings under extreme hydraulic shocks and thermal fluctuations. Constructed with a 316L Stainless Steel diaphragm, it delivers stable feedback for process control system synchronization.',
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-dd3c6258d190?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'In Stock',
    priceRange: 'Quote on Request',
    applications: ['Hydraulic System Monitoring', 'Refinery Gas Lines', 'Pneumatic Controls', 'Water Purification Loops'],
    specs: {
      'Measurement Range': '0 to 40 Bar (Gauge & Absolute available)',
      'Accuracy Tolerance': '± 0.075% of Span',
      'Output Signal': '4-20 mA with Linear HART 7 Protocol',
      'Process Port Connection': '1/2" NPT Male',
      'Diaphragm Construction': 'Hastelloy C-276 / 316L SS',
      'Ambient Power Supply': '12 to 42 V DC',
      'Ingress Protection': 'IP67 / NEMA 4X (Explosion Proof)',
      'Response Time': '≤ 90 ms'
    },
    datasheetUrl: '#'
  },
  {
    id: 'ec-relay',
    partNumber: 'EC-RC32-415V',
    name: '32A 3-Pole Electrical Contactor',
    category: 'Electrical',
    manufacturer: 'Schneider Electric',
    description: 'High-durability continuous-duty AC-3 magnetic contactor for secure electric motor starting and heavy inductive switching.',
    longDescription: 'The legendary Schneider TeSys D magnetic contactor provides high safety limits with auxiliary contacts. Features anti-wear alloys, transient voltage suppressors, and high electrical durability up to 2 million cycles.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'In Stock',
    priceRange: 'Quote on Request',
    applications: ['Motor Starter Panels', 'HVAC Compactor Relays', 'Automated PLC Cabinets', 'Industrial Heating Arrays'],
    specs: {
      'Rated Operational Current': '32A (AC-3, ≤ 440 V)',
      'Coil Voltage Requirement': '415V AC, 50/60 Hz',
      'Auxiliary Contacts': '1 Normally Open (1 NO) + 1 Normally Closed (1 NC)',
      'Max Operational Voltage': '690V AC (50/60 Hz)',
      'Thermal Overload Range': 'Recommended LRD32 (23-32A)',
      'Mechanical Endurance': '15 Million Operating Cycles'
    },
    datasheetUrl: '#'
  },
  {
    id: 'bv-600',
    partNumber: 'BV-600-W',
    name: 'High-Performance Butterfly Valve',
    category: 'Valves',
    manufacturer: 'Kitz-Yamada Systems',
    description: 'Bi-directional zero-leakage resilient-seated wafer butterfly valve designed for water, air, and gas distribution pipelines.',
    longDescription: 'An exceptionally lightweight yet strong butterfly valve featuring a ductile iron body and stainless steel seat. Configured with an ergonomic handle latch mechanism for precision positioning inside cooling and air pipelines.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    stockStatus: 'In Stock',
    priceRange: 'Quote on Request',
    applications: ['Water Main Distribution', 'Pneumatic Conveying', 'Industrial HVAC', 'Gas Header Piping'],
    specs: {
      'Size Range': '2" to 12" (DN50 - DN300)',
      'Pressure Capability': 'PN16 / ASME Class 150',
      'Body Construction': 'Ductile Iron ASTMA536',
      'Disc Material': 'Stainless Steel 316 (CF8M)',
      'Seat Seal Type': 'EPDM / NBR / Viton Coated',
      'Manual Control': 'Multi-position Notch Plate & Lever Handle',
      'Testing Metrics': 'API 598 shell and seat standards'
    },
    datasheetUrl: '#'
  }
];

export const BRANDS = [
  { name: 'SKF Bearings', logoText: 'SKF' },
  { name: 'Siemens Automation', logoText: 'SIEMENS' },
  { name: 'ABB Heavy Ind', logoText: 'ABB' },
  { name: 'Schneider Electric', logoText: 'Schneider' },
  { name: 'Kitz-Yamada Valves', logoText: 'KITZ' },
  { name: 'Honeywell Sensors', logoText: 'Honeywell' },
  { name: 'Timken Bearings', logoText: 'TIMKEN' },
  { name: 'Kirloskar Pumps', logoText: 'KIRLOSKAR' }
];

export const CATEGORIES = [
  'All Components',
  'Valves',
  'Instrument',
  'Motors',
  'Pumps',
  'Sensors',
  'Electrical'
];

export const MANUFACTURERS = [
  'All Manufacturers',
  'Kitz-Yamada Systems',
  'SKF-TIMKEN India Ltd',
  'Siemens Industrial AG',
  'Kirloskar-Sulzer Pumps',
  'Honeywell Process Solutions',
  'Schneider Electric'
];
