// ---------------------------------------------------------------------------
// AICTE Sovereign - SIH 2026 Problem Statement SIH26262 (Team StrataX)
// Comprehensive Seed Dataset: 42 Institutions, 105 Applications, 14 Officers,
// 10 EVC Experts, 24 EVC Visits, 72 Compliance Documents, 50+ Audit Ledger Blocks.
// ---------------------------------------------------------------------------

// 1. REGIONS
export const REGIONS = [
  "Western Region (Mumbai)",
  "Northern Region (New Delhi)",
  "Southern Region (Bengaluru)",
  "Eastern Region (Kolkata)",
  "Central Region (Bhopal)",
  "South-Western Region (Thiruvananthapuram)",
  "North-Western Region (Chandigarh)"
];

// 2. STAGES
export const WORKFLOW_STAGES = [
  { id: "REGISTRATION", label: "Institution Registration", slaDays: 3, owner: "System / Applicant" },
  { id: "SUBMITTED", label: "Application Submission", slaDays: 5, owner: "Applicant" },
  { id: "DOC_VALIDATION", label: "Document Validation", slaDays: 7, owner: "AICTE Registry" },
  { id: "SCRUTINY", label: "Scrutiny Review", slaDays: 14, owner: "Scrutiny Officer" },
  { id: "DEFICIENCY", label: "Deficiency Correction", slaDays: 10, owner: "Applicant" },
  { id: "REVERIFICATION", label: "Scrutiny Reverification", slaDays: 7, owner: "Scrutiny Officer" },
  { id: "EVC_QUEUE", label: "EVC Scheduling", slaDays: 10, owner: "Regional Head" },
  { id: "EVC_VISIT", label: "Expert Visit", slaDays: 14, owner: "EVC Committee" },
  { id: "INSPECTION_REPORT", label: "Inspection Report Submission", slaDays: 5, owner: "EVC Committee" },
  { id: "SAC_FINAL", label: "SAC Final Review", slaDays: 10, owner: "Standing Appellate Committee" },
  { id: "APPROVED", label: "Approval Sanctioned (LoA)", slaDays: 3, owner: "Executive Committee" },
  { id: "REJECTED", label: "Rejected / Closed", slaDays: 0, owner: "Executive Committee" }
];

// 3. APPLICATION TYPES
export const APPLICATION_TYPES = [
  "Increase in Intake (AI, ML & Data Science)",
  "New Technical Campus Approval",
  "Extension of Approval (EoA 2026-27)",
  "Introduction of Supernumerary Seats",
  "Conversion of Diploma to Degree",
  "Change of Site / Location",
  "Closure of Non-Viable Course"
];

// 4. OFFICERS (14 Scrutiny Officers)
export const SEED_OFFICERS = [
  { id: "OFF-101", name: "Dr. R.K. Srivastava", region: "Western Region (Mumbai)", expertise: "Computer Science & Emerging Tech", activeDockets: 5, maxCapacity: 10, availability: "AVAILABLE", rating: 4.9, email: "rk.srivastava@aicte-india.org" },
  { id: "OFF-102", name: "Er. Sunita Verma", region: "Western Region (Mumbai)", expertise: "Civil & Structural Infrastructure", activeDockets: 8, maxCapacity: 10, availability: "AVAILABLE", rating: 4.7, email: "sunita.verma@aicte-india.org" },
  { id: "OFF-103", name: "Dr. Arvind Joshi", region: "Northern Region (New Delhi)", expertise: "Mechanical & Automation", activeDockets: 9, maxCapacity: 10, availability: "OVERLOADED", rating: 4.8, email: "arvind.joshi@aicte-india.org" },
  { id: "OFF-104", name: "Prof. Priya Nair", region: "Southern Region (Bengaluru)", expertise: "Electronics & VLSI Systems", activeDockets: 4, maxCapacity: 12, availability: "AVAILABLE", rating: 4.9, email: "priya.nair@aicte-india.org" },
  { id: "OFF-105", name: "Dr. S. Ramanathan", region: "Southern Region (Bengaluru)", expertise: "Information Tech & Cyber Security", activeDockets: 6, maxCapacity: 10, availability: "AVAILABLE", rating: 4.6, email: "s.ramanathan@aicte-india.org" },
  { id: "OFF-106", name: "Dr. Alok Chatterjee", region: "Eastern Region (Kolkata)", expertise: "Chemical & Materials Engineering", activeDockets: 3, maxCapacity: 8, availability: "AVAILABLE", rating: 4.8, email: "alok.chatterjee@aicte-india.org" },
  { id: "OFF-107", name: "Er. Manpreet Singh", region: "North-Western Region (Chandigarh)", expertise: "Architecture & Town Planning", activeDockets: 7, maxCapacity: 10, availability: "AVAILABLE", rating: 4.5, email: "manpreet.singh@aicte-india.org" },
  { id: "OFF-108", name: "Dr. Deepa Shirodkar", region: "Western Region (Mumbai)", expertise: "Biotechnology & Pharmacy", activeDockets: 2, maxCapacity: 8, availability: "AVAILABLE", rating: 4.9, email: "deepa.shirodkar@aicte-india.org" },
  { id: "OFF-109", name: "Prof. Rajeshwar Tiwari", region: "Central Region (Bhopal)", expertise: "Electrical & Renewable Energy", activeDockets: 6, maxCapacity: 9, availability: "AVAILABLE", rating: 4.7, email: "rajeshwar.tiwari@aicte-india.org" },
  { id: "OFF-110", name: "Dr. K. Ananthapadmanabhan", region: "South-Western Region (Thiruvananthapuram)", expertise: "Management & Applied Sciences", activeDockets: 4, maxCapacity: 10, availability: "AVAILABLE", rating: 4.8, email: "k.anantha@aicte-india.org" },
  { id: "OFF-111", name: "Er. Neha Agarwal", region: "Northern Region (New Delhi)", expertise: "Robotics & Mechatronics", activeDockets: 3, maxCapacity: 8, availability: "AVAILABLE", rating: 4.6, email: "neha.agarwal@aicte-india.org" },
  { id: "OFF-112", name: "Dr. Debabrata Roy", region: "Eastern Region (Kolkata)", expertise: "Computer Science & AI", activeDockets: 5, maxCapacity: 9, availability: "AVAILABLE", rating: 4.7, email: "debabrata.roy@aicte-india.org" },
  { id: "OFF-113", name: "Prof. Vikram Deshmukh", region: "Western Region (Mumbai)", expertise: "Management Studies (MBA/PGDM)", activeDockets: 1, maxCapacity: 8, availability: "AVAILABLE", rating: 4.9, email: "vikram.deshmukh@aicte-india.org" },
  { id: "OFF-114", name: "Er. Hemant Choudhary", region: "Central Region (Bhopal)", expertise: "Civil & Environmental Engineering", activeDockets: 8, maxCapacity: 10, availability: "WARNING", rating: 4.5, email: "hemant.choudhary@aicte-india.org" }
];

// 5. EVC EXPERTS (10 Senior Academicians / Evaluators)
export const SEED_EXPERTS = [
  { id: "EXP-201", name: "Prof. B.N. Mukherjee", affiliation: "IIT Bombay (Emeritus)", expertise: "Computing Systems & AI Infrastructure", city: "Mumbai", phone: "+91 98201 44521" },
  { id: "EXP-202", name: "Dr. Rohini Kulkarni", affiliation: "COEP Tech University Pune", expertise: "Civil Engineering & Structural Safety", city: "Pune", phone: "+91 94220 88123" },
  { id: "EXP-203", name: "Prof. Harsh Vardhan", affiliation: "IIT Delhi", expertise: "Mechanical & Robotics Standards", city: "New Delhi", phone: "+91 98112 33490" },
  { id: "EXP-204", name: "Dr. Shalini Swaminathan", affiliation: "IISc Bengaluru", expertise: "Electrical, Electronics & VLSI Labs", city: "Bengaluru", phone: "+91 99001 77210" },
  { id: "EXP-205", name: "Prof. T.K. Sengupta", affiliation: "IIT Kharagpur", expertise: "Chemical Engineering & Waste Mgmt", city: "Kolkata", phone: "+91 94331 09844" },
  { id: "EXP-206", name: "Dr. Vivek Wanjari", affiliation: "VNIT Nagpur", expertise: "Fire & Campus Barrier-Free Compliance", city: "Nagpur", phone: "+91 98230 65129" },
  { id: "EXP-207", name: "Prof. Meenakshi Sundaram", affiliation: "NIT Trichy", expertise: "Architecture & Urban Town Planning", city: "Chennai", phone: "+91 97890 22345" },
  { id: "EXP-208", name: "Dr. Anil K. Sachdeva", affiliation: "PEC Chandigarh", expertise: "Computer Science & Cyber Labs", city: "Chandigarh", phone: "+91 98765 44109" },
  { id: "EXP-209", name: "Prof. Sandeep Patidar", affiliation: "MANIT Bhopal", expertise: "Energy & High Voltage Testing", city: "Bhopal", phone: "+91 98260 11982" },
  { id: "EXP-210", name: "Dr. George Varghese", affiliation: "NIT Calicut", expertise: "Bio-Informatics & Pharmacy Labs", city: "Kochi", phone: "+91 94471 22871" }
];

// 6. INSTITUTIONS (42 Fictional Institutions Across India)
export const SEED_INSTITUTIONS = [
  { id: "INST-1001", code: "1-354928101", name: "Maharashtra Institute of Technology & AI", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, established: 1998, principal: "Dr. V.D. Karad" },
  { id: "INST-1002", code: "1-992104812", name: "Delhi NCR Technical Campus", type: "Private Self-Financing", region: "Northern Region (New Delhi)", city: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, established: 2008, principal: "Dr. A.K. Bansal" },
  { id: "INST-1003", code: "1-449102831", name: "Bengaluru College of Engineering & Research", type: "Private University Affiliated", region: "Southern Region (Bengaluru)", city: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, established: 2001, principal: "Dr. H.S. Nagaraja" },
  { id: "INST-1004", code: "1-662910404", name: "Kolkata Institute of Applied Science & Tech", type: "Govt. Aided", region: "Eastern Region (Kolkata)", city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, established: 1985, principal: "Dr. S.B. Bhattacharya" },
  { id: "INST-1005", code: "1-551092849", name: "Bhopal National Institute of Technology", type: "State Govt. University", region: "Central Region (Bhopal)", city: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, established: 1994, principal: "Dr. R.C. Mishra" },
  { id: "INST-1006", code: "1-778201944", name: "Somaiya College of Advanced Engineering", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, established: 1983, principal: "Dr. Shubha Pandit" },
  { id: "INST-1007", code: "1-229048172", name: "Nashik Engineering & Polytechnic College", type: "Private Self-Financing", region: "Western Region (Mumbai)", city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, established: 2005, principal: "Dr. K.V. Chandratre" },
  { id: "INST-1008", code: "1-883920194", name: "Vidarbha Technical Institute & Research", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, established: 1992, principal: "Dr. M.P. Singh" },
  { id: "INST-1009", code: "1-339029111", name: "Jaipur Apex Institute of Engineering", type: "Private Self-Financing", region: "North-Western Region (Chandigarh)", city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, established: 2004, principal: "Dr. Pankaj Sharma" },
  { id: "INST-1010", code: "1-448102948", name: "Kochi Marine & Technical Campus", type: "Govt. Aided", region: "South-Western Region (Thiruvananthapuram)", city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, established: 1999, principal: "Dr. Thomas Kurian" },
  { id: "INST-1011", code: "1-558291039", name: "Hyderabad Cyber Technology Academy", type: "Private Autonomous", region: "Southern Region (Bengaluru)", city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, established: 2002, principal: "Dr. K.R. Prasad" },
  { id: "INST-1012", code: "1-667102938", name: "Lucknow Technical University Campus", type: "State Govt. University", region: "Northern Region (New Delhi)", city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, established: 1990, principal: "Dr. Onkar Singh" },
  { id: "INST-1013", code: "1-112948201", name: "Ahmedabad Institute of Technology", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, established: 2003, principal: "Dr. H.N. Shah" },
  { id: "INST-1014", code: "1-224810293", name: "Indore Institute of Management & Tech", type: "Private Self-Financing", region: "Central Region (Bhopal)", city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, established: 2007, principal: "Dr. Maya Ingle" },
  { id: "INST-1015", code: "1-337192840", name: "Bhubaneswar Silicon Academy of Science", type: "Private Autonomous", region: "Eastern Region (Kolkata)", city: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, established: 2001, principal: "Dr. Jaideep Talukdar" },
  { id: "INST-1016", code: "1-441092837", name: "Chandigarh Imperial Institute of Engineering", type: "Private Self-Financing", region: "North-Western Region (Chandigarh)", city: "Mohali", state: "Punjab", lat: 30.7046, lng: 76.7179, established: 2010, principal: "Dr. Gurpreet Singh" },
  { id: "INST-1017", code: "1-552091823", name: "Coimbatore Institute of Emerging Technologies", type: "Govt. Aided", region: "Southern Region (Bengaluru)", city: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, established: 1996, principal: "Dr. N. Saravanakumar" },
  { id: "INST-1018", code: "1-663910284", name: "Guwahati Brahmaputra Engineering College", type: "Govt. Autonomous", region: "Eastern Region (Kolkata)", city: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, established: 1993, principal: "Dr. P.K. Bora" },
  { id: "INST-1019", code: "1-774819203", name: "Patna Aryabhatta Institute of Technology", type: "State Govt. University", region: "Eastern Region (Kolkata)", city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, established: 2008, principal: "Dr. S.N. Guha" },
  { id: "INST-1020", code: "1-885910283", name: "Visakhapatnam Coastal Engineering College", type: "Private Self-Financing", region: "Southern Region (Bengaluru)", city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, established: 2006, principal: "Dr. G.V. Rao" },
  { id: "INST-1021", code: "1-996102834", name: "Vadodara Polytechnic & Engineering Institute", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, established: 1997, principal: "Dr. B.S. Patel" },
  { id: "INST-1022", code: "1-107291038", name: "Thiruvananthapuram Institute of Space Tech", type: "Govt. Aided", region: "South-Western Region (Thiruvananthapuram)", city: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, established: 2007, principal: "Dr. K. Radhakrishnan" },
  { id: "INST-1023", code: "1-218391029", name: "Ranchi Birsa Institute of Technology", type: "State Govt. University", region: "Eastern Region (Kolkata)", city: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, established: 1989, principal: "Dr. D.K. Singh" },
  { id: "INST-1024", code: "1-329481920", name: "Dehradun Doon Valley Engineering Institute", type: "Private Self-Financing", region: "Northern Region (New Delhi)", city: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, established: 2009, principal: "Dr. Sanjay Pant" },
  { id: "INST-1025", code: "1-430591028", name: "Surat Diamond City Engineering College", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, established: 2004, principal: "Dr. R.V. Rao" },
  { id: "INST-1026", code: "1-541602938", name: "Mysuru Heritage Technical Institute", type: "Private Autonomous", region: "Southern Region (Bengaluru)", city: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, established: 1991, principal: "Dr. S. Vidyashankar" },
  { id: "INST-1027", code: "1-652710394", name: "Agra Mughal Institute of Technology", type: "Private Self-Financing", region: "Northern Region (New Delhi)", city: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, established: 2011, principal: "Dr. R.K. Gupta" },
  { id: "INST-1028", code: "1-763820194", name: "Raipur Chhattisgarh Institute of Science", type: "Govt. Autonomous", region: "Central Region (Bhopal)", city: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, established: 2003, principal: "Dr. B.K. Sthapak" },
  { id: "INST-1029", code: "1-874930284", name: "Gwalior Scindia Academy of Technology", type: "Private Self-Financing", region: "Central Region (Bhopal)", city: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828, established: 2005, principal: "Dr. R.K. Trivedi" },
  { id: "INST-1030", code: "1-985040392", name: "Jalandhar Doaba Engineering Institute", type: "Private Self-Financing", region: "North-Western Region (Chandigarh)", city: "Jalandhar", state: "Punjab", lat: 31.3260, lng: 75.5762, established: 2002, principal: "Dr. A.S. Arora" },
  { id: "INST-1031", code: "1-196150493", name: "Aurangabad Marathwada Institute of Tech", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Chhatrapati Sambhajinagar", state: "Maharashtra", lat: 19.8762, lng: 75.3433, established: 1995, principal: "Dr. S.P. Bhosle" },
  { id: "INST-1032", code: "1-207260584", name: "Vellore Peninsula College of Engineering", type: "Private Autonomous", region: "Southern Region (Bengaluru)", city: "Vellore", state: "Tamil Nadu", lat: 12.9165, lng: 79.1325, established: 1984, principal: "Dr. G. Viswanathan" },
  { id: "INST-1033", code: "1-318370695", name: "Kanpur Central Polytechnic & Engineering", type: "Govt. Aided", region: "Northern Region (New Delhi)", city: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, established: 1978, principal: "Dr. P.K. Mishra" },
  { id: "INST-1034", code: "1-429480786", name: "Mangaluru Coastal Technology Institute", type: "Private Autonomous", region: "Southern Region (Bengaluru)", city: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.8560, established: 2000, principal: "Dr. U.C. Niranjan" },
  { id: "INST-1035", code: "1-530590877", name: "Shillong Pine Hills Engineering Academy", type: "Govt. Autonomous", region: "Eastern Region (Kolkata)", city: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, established: 2012, principal: "Dr. L.K. Mawlong" },
  { id: "INST-1036", code: "1-641601968", name: "Amritsar Golden Gate Institute of Tech", type: "Private Self-Financing", region: "North-Western Region (Chandigarh)", city: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, established: 2008, principal: "Dr. R.S. Gill" },
  { id: "INST-1037", code: "1-752712059", name: "Kolhapur Shivaji Engineering College", type: "Private Autonomous", region: "Western Region (Mumbai)", city: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433, established: 1987, principal: "Dr. V.V. Kulkarni" },
  { id: "INST-1038", code: "1-863823140", name: "Kozhikode Malabar Technology Campus", type: "Govt. Aided", region: "South-Western Region (Thiruvananthapuram)", city: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, established: 1999, principal: "Dr. K.P. Mohandas" },
  { id: "INST-1039", code: "1-974934231", name: "Dhanbad Coalfields Institute of Science", type: "State Govt. University", region: "Eastern Region (Kolkata)", city: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, established: 1996, principal: "Dr. R.K. Sinha" },
  { id: "INST-1040", code: "1-185045322", name: "Jabalpur Narmada Valley Tech Institute", type: "Govt. Autonomous", region: "Central Region (Bhopal)", city: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, established: 1991, principal: "Dr. S.K. Sahu" },
  { id: "INST-1041", code: "1-296156413", name: "Belagavi Northern Karnataka Academy", type: "Private Self-Financing", region: "Southern Region (Bengaluru)", city: "Belagavi", state: "Karnataka", lat: 15.8497, lng: 74.4977, established: 2005, principal: "Dr. S.C. Pilli" },
  { id: "INST-1042", code: "1-307267504", name: "Varanasi Kashi Institute of Technology", type: "Private Autonomous", region: "Northern Region (New Delhi)", city: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, established: 2004, principal: "Dr. A.K. Tripathi" }
];

// Helper to generate deterministic dates
const daysFromNow = (d) => new Date(Date.now() + d * 86400000).toISOString();
const daysAgo = (d) => new Date(Date.now() - d * 86400000).toISOString();

// 7. APPLICATIONS GENERATOR (105 Applications)
export const INITIAL_APPLICATIONS = [
  // 1. Primary Demo Docket 1: Scrutiny Active
  {
    id: "AICTE-2026-WZ-9401",
    instituteId: "INST-1001",
    instituteName: "Maharashtra Institute of Technology & AI",
    instituteCode: "1-354928101",
    region: "Western Region (Mumbai)",
    city: "Pune",
    state: "Maharashtra",
    applicationType: "Increase in Intake (AI, ML & Data Science)",
    submittedDate: daysAgo(10),
    currentStage: "SCRUTINY",
    previousStage: "DOC_VALIDATION",
    slaDeadlineDays: 14,
    slaDeadline: daysFromNow(4),
    slaElapsedPercent: 71,
    slaStatus: "ON_TRACK",
    landLeaseExpiry: daysFromNow(18), // Expiring in 18 days!
    fireNocExpiry: daysFromNow(95),
    cadreRatio: "1:20 (Compliant)",
    builtUpAreaSqM: 14200,
    requiredAreaSqM: 12000,
    riskLevel: "MEDIUM",
    assignedOfficer: "Dr. R.K. Srivastava",
    assignedOfficerId: "OFF-101",
    evcCluster: "Pune Hub Alpha",
    lat: 18.5204,
    lng: 73.8567,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-9401-1", name: "Registered Land Lease Deed (30 Yrs)", status: "VERIFIED", expiryDate: daysFromNow(18), category: "LAND_TITLE", hash: "8f4e19...c011" },
      { id: "DOC-9401-2", name: "NBA Tier-I Accreditation Certificate", status: "VERIFIED", expiryDate: daysFromNow(410), category: "ACCREDITATION", hash: "3b12a8...99fa" },
      { id: "DOC-9401-3", name: "Fire Safety NOC (Form-5)", status: "VERIFIED", expiryDate: daysFromNow(95), category: "FIRE_SAFETY", hash: "5e72cc...3312" },
      { id: "DOC-9401-4", name: "Faculty Cadre & Biometric Roster", status: "UNDER_REVIEW", expiryDate: null, category: "FACULTY_ROSTER", hash: "9a21dc...8d01" }
    ],
    timeline: [
      { stage: "REGISTRATION", date: daysAgo(14), actor: "MIT Registrar", note: "Portal enrollment completed." },
      { stage: "SUBMITTED", date: daysAgo(12), actor: "MIT Registrar", note: "Docket submitted with ₹1,20,000 statutory fee." },
      { stage: "DOC_VALIDATION", date: daysAgo(10), actor: "Registry Officer", note: "Initial document presence confirmed." },
      { stage: "SCRUTINY", date: daysAgo(8), actor: "Dr. R.K. Srivastava", note: "Scrutiny initiated. Checking APH Cadre ratio." }
    ]
  },

  // 2. Demo Docket 2: Returned for Deficiency (Cadre & Lease)
  {
    id: "AICTE-2026-NZ-7720",
    instituteId: "INST-1002",
    instituteName: "Delhi NCR Technical Campus",
    instituteCode: "1-992104812",
    region: "Northern Region (New Delhi)",
    city: "Gurugram",
    state: "Haryana",
    applicationType: "New Technical Campus Approval",
    submittedDate: daysAgo(24),
    currentStage: "DEFICIENCY",
    previousStage: "SCRUTINY",
    slaDeadlineDays: 10,
    slaDeadline: daysFromNow(3),
    slaElapsedPercent: 70,
    slaStatus: "WARNING",
    landLeaseExpiry: daysFromNow(22), // Expiring in 22 days!
    fireNocExpiry: daysFromNow(14), // Expiring in 14 days!
    cadreRatio: "1:24 (Deficient)",
    builtUpAreaSqM: 18500,
    requiredAreaSqM: 19000,
    riskLevel: "HIGH",
    assignedOfficer: "Dr. Arvind Joshi",
    assignedOfficerId: "OFF-103",
    evcCluster: "NCR Gurugram Cluster",
    lat: 28.4595,
    lng: 77.0266,
    revertReason: "Cadre Imbalance: Mandatory 1:20 ratio violated. Fire Safety NOC expiring in 14 days.",
    deficiencyHistory: [
      { date: daysAgo(3), clause: "APH 2024-27 Clause 3.4.1", reason: "Shortage of 2 Associate Professors in CSE. Fire safety renewal receipt required." }
    ],
    documents: [
      { id: "DOC-7720-1", name: "Master Plan & Land Conversion Order", status: "VERIFIED", expiryDate: daysFromNow(22), category: "LAND_TITLE", hash: "7b4412...d82a" },
      { id: "DOC-7720-2", name: "Occupancy Certificate (Form-B)", status: "VERIFIED", expiryDate: daysFromNow(320), category: "BUILDING_SAFETY", hash: "1a8843...2120" },
      { id: "DOC-7720-3", name: "Barrier-Free Built Environment Affidavit", status: "DEFICIENT", expiryDate: null, category: "BARRIER_FREE", hash: "90ca74...14eb" }
    ],
    timeline: [
      { stage: "REGISTRATION", date: daysAgo(26), actor: "Campus Admin", note: "Registration completed." },
      { stage: "SUBMITTED", date: daysAgo(24), actor: "Campus Admin", note: "Application filed." },
      { stage: "SCRUTINY", date: daysAgo(16), actor: "Dr. Arvind Joshi", note: "Deficiencies observed in faculty and Fire NOC." },
      { stage: "DEFICIENCY", date: daysAgo(3), actor: "Dr. Arvind Joshi", note: "Notice served. 10 days rectification window opened." }
    ]
  },

  // 3. Demo Docket 3: EVC Queue Ready for Logistics Optimization
  {
    id: "AICTE-2026-WZ-6612",
    instituteId: "INST-1006",
    instituteName: "Somaiya College of Advanced Engineering",
    instituteCode: "1-778201944",
    region: "Western Region (Mumbai)",
    city: "Mumbai",
    state: "Maharashtra",
    applicationType: "Extension of Approval (EoA 2026-27)",
    submittedDate: daysAgo(35),
    currentStage: "EVC_QUEUE",
    previousStage: "REVERIFICATION",
    slaDeadlineDays: 10,
    slaDeadline: daysFromNow(6),
    slaElapsedPercent: 40,
    slaStatus: "ON_TRACK",
    landLeaseExpiry: daysFromNow(800),
    fireNocExpiry: daysFromNow(310),
    cadreRatio: "1:19 (Compliant)",
    builtUpAreaSqM: 26000,
    requiredAreaSqM: 24000,
    riskLevel: "LOW",
    assignedOfficer: "Er. Sunita Verma",
    assignedOfficerId: "OFF-102",
    evcCluster: "Mumbai Coastal Hub",
    lat: 19.0760,
    lng: 72.8777,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-6612-1", name: "Permanent AICTE Approval Baseline", status: "VERIFIED", expiryDate: daysFromNow(600), category: "STATUTORY_NOC", hash: "4a9192...ff01" },
      { id: "DOC-6612-2", name: "Fire Safety Certificate Form-5", status: "VERIFIED", expiryDate: daysFromNow(310), category: "FIRE_SAFETY", hash: "99104f...8821" }
    ],
    timeline: [
      { stage: "SCRUTINY", date: daysAgo(20), actor: "Er. Sunita Verma", note: "All digital documentation cleared with 100% score." },
      { stage: "EVC_QUEUE", date: daysAgo(5), actor: "Regional Head", note: "Awaiting route optimization and committee assignment." }
    ]
  },

  // 4. Demo Docket 4: SAC Final Review
  {
    id: "AICTE-2026-SZ-8831",
    instituteId: "INST-1003",
    instituteName: "Bengaluru College of Engineering & Research",
    instituteCode: "1-449102831",
    region: "Southern Region (Bengaluru)",
    city: "Bengaluru",
    state: "Karnataka",
    applicationType: "Increase in Intake (AI & Data Science)",
    submittedDate: daysAgo(45),
    currentStage: "SAC_FINAL",
    previousStage: "INSPECTION_REPORT",
    slaDeadlineDays: 10,
    slaDeadline: daysFromNow(8),
    slaElapsedPercent: 20,
    slaStatus: "ON_TRACK",
    landLeaseExpiry: daysFromNow(450),
    fireNocExpiry: daysFromNow(240),
    cadreRatio: "1:19 (Compliant)",
    builtUpAreaSqM: 25000,
    requiredAreaSqM: 22000,
    riskLevel: "LOW",
    assignedOfficer: "Prof. Priya Nair",
    assignedOfficerId: "OFF-104",
    evcCluster: "Bengaluru Tech Hub",
    lat: 12.9716,
    lng: 77.5946,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-8831-1", name: "EVC Physical Verification Audio-Video Log", status: "VERIFIED", expiryDate: null, category: "EVC_EVIDENCE", hash: "7f4a9b...4411" },
      { id: "DOC-8831-2", name: "HPC GPU Cluster Purchase Vouchers", status: "VERIFIED", expiryDate: null, category: "LAB_INFRA", hash: "21a34b...8829" }
    ],
    timeline: [
      { stage: "EVC_VISIT", date: daysAgo(12), actor: "Prof. Shalini Swaminathan", note: "Campus visit verified 60 GPU workstations." },
      { stage: "INSPECTION_REPORT", date: daysAgo(6), actor: "EVC Committee", note: "100% positive recommendation forwarded to SAC." },
      { stage: "SAC_FINAL", date: daysAgo(2), actor: "SAC Chairman", note: "Final ratifications scheduled for next Tuesday." }
    ]
  },

  // 5. Demo Docket 5: SLA Breached File (Requires Immediate Escalation)
  {
    id: "AICTE-2026-EZ-6512",
    instituteId: "INST-1004",
    instituteName: "Kolkata Institute of Applied Science & Tech",
    instituteCode: "1-662910404",
    region: "Eastern Region (Kolkata)",
    city: "Kolkata",
    state: "West Bengal",
    applicationType: "Conversion of Diploma to Degree",
    submittedDate: daysAgo(38),
    currentStage: "SCRUTINY",
    previousStage: "DOC_VALIDATION",
    slaDeadlineDays: 14,
    slaDeadline: daysAgo(4), // Breached 4 days ago!
    slaElapsedPercent: 128,
    slaStatus: "BREACHED",
    landLeaseExpiry: daysFromNow(90),
    fireNocExpiry: daysAgo(5), // Expired 5 days ago!
    cadreRatio: "1:22 (Review Pending)",
    builtUpAreaSqM: 11000,
    requiredAreaSqM: 10500,
    riskLevel: "CRITICAL",
    assignedOfficer: "Dr. Alok Chatterjee",
    assignedOfficerId: "OFF-106",
    evcCluster: "Kolkata Metro Corridor",
    lat: 22.5726,
    lng: 88.3639,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-6512-1", name: "Fire Safety NOC (Form-5)", status: "EXPIRED", expiryDate: daysAgo(5), category: "FIRE_SAFETY", hash: "11904e...1123" }
    ],
    timeline: [
      { stage: "SCRUTINY", date: daysAgo(18), actor: "Dr. Alok Chatterjee", note: "Under review - delayed due to missing Fire NOC verification." }
    ]
  },

  // 6. Demo Docket 6: Approved (LoA Issued)
  {
    id: "AICTE-2026-CZ-5104",
    instituteId: "INST-1005",
    instituteName: "Bhopal National Institute of Technology",
    instituteCode: "1-551092849",
    region: "Central Region (Bhopal)",
    city: "Bhopal",
    state: "Madhya Pradesh",
    applicationType: "Introduction of Supernumerary Seats",
    submittedDate: daysAgo(60),
    currentStage: "APPROVED",
    previousStage: "SAC_FINAL",
    slaDeadlineDays: 3,
    slaDeadline: daysAgo(12),
    slaElapsedPercent: 100,
    slaStatus: "ON_TRACK",
    landLeaseExpiry: daysFromNow(1200),
    fireNocExpiry: daysFromNow(500),
    cadreRatio: "1:18 (Excellent)",
    builtUpAreaSqM: 32000,
    requiredAreaSqM: 28000,
    riskLevel: "LOW",
    assignedOfficer: "Prof. Rajeshwar Tiwari",
    assignedOfficerId: "OFF-109",
    evcCluster: "Bhopal Central Cluster",
    lat: 23.2599,
    lng: 77.4126,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-5104-1", name: "Letter of Approval (LoA 2026-27)", status: "VERIFIED", expiryDate: daysFromNow(365), category: "LOA", hash: "99aa11...55ee" }
    ],
    timeline: [
      { stage: "APPROVED", date: daysAgo(12), actor: "Executive Committee AICTE", note: "Formal sanction granted. Letter of Approval (LoA) generated with digital seal." }
    ]
  },

  // 7. Demo Docket 7: Unassigned Application (Eligible for Smart Workload Balancing)
  {
    id: "AICTE-2026-WZ-9407",
    instituteId: "INST-1007",
    instituteName: "Nashik Engineering & Polytechnic College",
    instituteCode: "1-229048172",
    region: "Western Region (Mumbai)",
    city: "Nashik",
    state: "Maharashtra",
    applicationType: "Increase in Intake (AI, ML & Data Science)",
    submittedDate: daysAgo(2),
    currentStage: "SCRUTINY",
    previousStage: "DOC_VALIDATION",
    slaDeadlineDays: 14,
    slaDeadline: daysFromNow(12),
    slaElapsedPercent: 14,
    slaStatus: "ON_TRACK",
    landLeaseExpiry: daysFromNow(600),
    fireNocExpiry: daysFromNow(190),
    cadreRatio: "1:20 (Compliant)",
    builtUpAreaSqM: 16500,
    requiredAreaSqM: 15000,
    riskLevel: "LOW",
    assignedOfficer: "UNASSIGNED",
    assignedOfficerId: null,
    evcCluster: "Nashik North Hub",
    lat: 19.9975,
    lng: 73.7898,
    revertReason: null,
    deficiencyHistory: [],
    documents: [
      { id: "DOC-9407-1", name: "Registered Land Lease Deed", status: "VERIFIED", expiryDate: daysFromNow(600), category: "LAND_TITLE", hash: "3c91a0...77b1" }
    ],
    timeline: [
      { stage: "DOC_VALIDATION", date: daysAgo(2), actor: "Registry System", note: "Validated. Ready for Smart Officer Assignment." }
    ]
  }
];

// Dynamically generate the remaining 98 applications to reach 105 total applications
const STAGE_POOL = ["SCRUTINY", "EVC_QUEUE", "SAC_FINAL", "APPROVED", "DEFICIENCY", "REVERIFICATION", "DOC_VALIDATION"];
const RISK_POOL = ["LOW", "MEDIUM", "HIGH"];
const TYPE_POOL = APPLICATION_TYPES;

for (let i = 8; i <= 105; i++) {
  const inst = SEED_INSTITUTIONS[(i - 1) % SEED_INSTITUTIONS.length];
  const stage = STAGE_POOL[i % STAGE_POOL.length];
  const officer = (i % 8 === 0) ? null : SEED_OFFICERS[i % SEED_OFFICERS.length];
  const daysPassed = (i * 3) % 40 + 2;
  const isBreached = (i % 11 === 0);
  const isWarning = (i % 7 === 0 && !isBreached);
  const slaStatus = isBreached ? "BREACHED" : isWarning ? "WARNING" : "ON_TRACK";
  const deadlineDays = isBreached ? -((i % 5) + 1) : ((i % 12) + 2);
  const slaPercent = isBreached ? (105 + (i % 25)) : isWarning ? (75 + (i % 15)) : (25 + (i % 45));

  INITIAL_APPLICATIONS.push({
    id: `AICTE-2026-${inst.region.charAt(0)}Z-${9400 + i}`,
    instituteId: inst.id,
    instituteName: inst.name,
    instituteCode: inst.code,
    region: inst.region,
    city: inst.city,
    state: inst.state,
    applicationType: TYPE_POOL[i % TYPE_POOL.length],
    submittedDate: daysAgo(daysPassed),
    currentStage: stage,
    previousStage: stage === "SCRUTINY" ? "DOC_VALIDATION" : stage === "EVC_QUEUE" ? "SCRUTINY" : stage === "SAC_FINAL" ? "EVC_VISIT" : null,
    slaDeadlineDays: 14,
    slaDeadline: daysFromNow(deadlineDays),
    slaElapsedPercent: slaPercent,
    slaStatus: slaStatus,
    landLeaseExpiry: (i % 9 === 0) ? daysFromNow(12) : daysFromNow(300 + i * 10),
    fireNocExpiry: (i % 13 === 0) ? daysAgo(3) : daysFromNow(180 + i * 5),
    cadreRatio: (i % 6 === 0) ? "1:23 (Deficient)" : "1:20 (Compliant)",
    builtUpAreaSqM: 12000 + (i * 150),
    requiredAreaSqM: 11000 + (i * 120),
    riskLevel: (isBreached || stage === "DEFICIENCY") ? "HIGH" : RISK_POOL[i % RISK_POOL.length],
    assignedOfficer: officer ? officer.name : "UNASSIGNED",
    assignedOfficerId: officer ? officer.id : null,
    evcCluster: `${inst.city} Cluster ${String.fromCharCode(65 + (i % 4))}`,
    lat: inst.lat,
    lng: inst.lng,
    revertReason: stage === "DEFICIENCY" ? "Cadre ratio deficient: Faculty to student ratio does not satisfy 1:20 norm as per APH Chapter III." : null,
    deficiencyHistory: stage === "DEFICIENCY" ? [{ date: daysAgo(4), clause: "APH Chapter III Clause 3.4.1", reason: "Cadre imbalance observed." }] : [],
    documents: [
      { id: `DOC-${i}-1`, name: "Registered Land Lease Deed", status: "VERIFIED", expiryDate: daysFromNow(300 + i * 10), category: "LAND_TITLE", hash: `8a${i}f9...9b01` },
      { id: `DOC-${i}-2`, name: "Fire Safety NOC", status: (i % 13 === 0) ? "EXPIRED" : "VERIFIED", expiryDate: (i % 13 === 0) ? daysAgo(3) : daysFromNow(180), category: "FIRE_SAFETY", hash: `5b${i}c1...33aa` },
      { id: `DOC-${i}-3`, name: "Approved Building Stability Plan", status: "VERIFIED", expiryDate: daysFromNow(500), category: "BUILDING_SAFETY", hash: `2d${i}ee...12bb` }
    ],
    timeline: [
      { stage: "SUBMITTED", date: daysAgo(daysPassed), actor: "Institute Registrar", note: "Docket submitted." },
      { stage: stage, date: daysAgo(Math.max(1, Math.floor(daysPassed / 2))), actor: officer ? officer.name : "Registry Officer", note: `Entered ${stage} stage.` }
    ]
  });
}

// 8. EVC VISITS (24 Inspection Visits)
export const SEED_EVC_VISITS = [
  {
    id: "EVC-2026-WZ-01",
    applicationId: "AICTE-2026-WZ-9401",
    instituteName: "Maharashtra Institute of Technology & AI",
    city: "Pune",
    scheduledDate: daysFromNow(3),
    status: "SCHEDULED",
    committeeLead: "Prof. B.N. Mukherjee",
    members: ["Prof. B.N. Mukherjee (Lead)", "Dr. Rohini Kulkarni", "Prof. Sandeep Patidar"],
    lat: 18.5204,
    lng: 73.8567,
    checklist: [
      { item: "Continuous Geo-Tagged Video Recording Setup", passed: true, score: 10 },
      { item: "60 Workstation High-Performance AI/GPU Lab", passed: true, score: 10 },
      { item: "Barrier-Free Ramps (gradient <= 1:12) & Divyangjan Lifts", passed: true, score: 10 },
      { item: "Fire Extinguishers & Active Hydrant Lines", passed: true, score: 10 }
    ],
    inspectionReport: null
  },
  {
    id: "EVC-2026-WZ-02",
    applicationId: "AICTE-2026-WZ-6612",
    instituteName: "Somaiya College of Advanced Engineering",
    city: "Mumbai",
    scheduledDate: daysFromNow(4),
    status: "SCHEDULED",
    committeeLead: "Prof. B.N. Mukherjee",
    members: ["Prof. B.N. Mukherjee (Lead)", "Dr. Vivek Wanjari"],
    lat: 19.0760,
    lng: 72.8777,
    checklist: [
      { item: "Campus Land Perimeter Verification", passed: true, score: 10 },
      { item: "Faculty Biometric Attendance Terminal Integrity", passed: true, score: 10 }
    ],
    inspectionReport: null
  },
  {
    id: "EVC-2026-WZ-03",
    applicationId: "AICTE-2026-WZ-9407",
    instituteName: "Nashik Engineering & Polytechnic College",
    city: "Nashik",
    scheduledDate: daysFromNow(6),
    status: "PROPOSED",
    committeeLead: "Dr. Rohini Kulkarni",
    members: ["Dr. Rohini Kulkarni (Lead)", "Prof. Sandeep Patidar"],
    lat: 19.9975,
    lng: 73.7898,
    checklist: [],
    inspectionReport: null
  },
  {
    id: "EVC-2026-WZ-04",
    applicationId: "AICTE-2026-WZ-9408",
    instituteName: "Vidarbha Technical Institute & Research",
    city: "Nagpur",
    scheduledDate: daysFromNow(8),
    status: "CONFIRMED",
    committeeLead: "Dr. Vivek Wanjari",
    members: ["Dr. Vivek Wanjari (Lead)", "Prof. B.N. Mukherjee"],
    lat: 21.1458,
    lng: 79.0882,
    checklist: [],
    inspectionReport: null
  }
];

// Add 20 more visits to satisfy 24 EVC visits
for (let v = 5; v <= 24; v++) {
  const inst = SEED_INSTITUTIONS[(v * 2) % SEED_INSTITUTIONS.length];
  const expert = SEED_EXPERTS[v % SEED_EXPERTS.length];
  const isPast = v > 18;
  SEED_EVC_VISITS.push({
    id: `EVC-2026-NAT-${String(v).padStart(2, '0')}`,
    applicationId: `AICTE-2026-${inst.region.charAt(0)}Z-${9400 + v}`,
    instituteName: inst.name,
    city: inst.city,
    scheduledDate: isPast ? daysAgo(v - 15) : daysFromNow((v % 14) + 1),
    status: isPast ? "COMPLETED" : (v % 3 === 0) ? "CONFIRMED" : (v % 2 === 0) ? "SCHEDULED" : "AWAITING_SCHEDULING",
    committeeLead: expert.name,
    members: [expert.name, SEED_EXPERTS[(v + 1) % SEED_EXPERTS.length].name],
    lat: inst.lat,
    lng: inst.lng,
    checklist: [
      { item: "Lab Infrastructure & Equipment Verification", passed: true, score: 10 },
      { item: "Fire Safety NOC Verification", passed: true, score: 10 },
      { item: "Library & E-Journals AICTE Subscription", passed: true, score: 10 }
    ],
    inspectionReport: isPast ? {
      submittedAt: daysAgo(v - 16),
      score: 94,
      verdict: "RECOMMENDED_FULL_INTAKE",
      remarks: "Infrastructure compliant with AICTE norms. Video geo-tagged and archived."
    } : null
  });
}

// 9. COMPLIANCE DOCUMENTS (72 Compliance Records)
export const SEED_COMPLIANCE_DOCS = [
  { id: "DOC-REC-01", institutionId: "INST-1001", institutionName: "Maharashtra Institute of Technology & AI", documentType: "Registered Land Lease Deed (30 Yrs)", expiryDate: daysFromNow(18), category: "EXPIRING_30_DAYS", verificationStatus: "VERIFIED", lastVerified: daysAgo(10), risk: "HIGH", region: "Western Region (Mumbai)" },
  { id: "DOC-REC-02", institutionId: "INST-1002", institutionName: "Delhi NCR Technical Campus", documentType: "Fire Safety NOC (Form-5)", expiryDate: daysFromNow(14), category: "EXPIRING_30_DAYS", verificationStatus: "VERIFIED", lastVerified: daysAgo(20), risk: "HIGH", region: "Northern Region (New Delhi)" },
  { id: "DOC-REC-03", institutionId: "INST-1004", institutionName: "Kolkata Institute of Applied Science & Tech", documentType: "Fire Safety NOC (Form-5)", expiryDate: daysAgo(5), category: "EXPIRED", verificationStatus: "EXPIRED_ACTION_REQUIRED", lastVerified: daysAgo(90), risk: "CRITICAL", region: "Eastern Region (Kolkata)" },
  { id: "DOC-REC-04", institutionId: "INST-1007", institutionName: "Nashik Engineering & Polytechnic College", documentType: "Building Stability Certificate", expiryDate: daysFromNow(6), category: "EXPIRING_7_DAYS", verificationStatus: "VERIFICATION_REQUIRED", lastVerified: daysAgo(350), risk: "CRITICAL", region: "Western Region (Mumbai)" },
  { id: "DOC-REC-05", institutionId: "INST-1003", institutionName: "Bengaluru College of Engineering & Research", documentType: "Occupancy Certificate (Form-B)", expiryDate: daysFromNow(450), category: "VALID", verificationStatus: "VERIFIED", lastVerified: daysAgo(15), risk: "LOW", region: "Southern Region (Bengaluru)" }
];

for (let d = 6; d <= 72; d++) {
  const inst = SEED_INSTITUTIONS[(d * 3) % SEED_INSTITUTIONS.length];
  const docTypes = [
    "Fire Safety NOC (Form-5)",
    "Registered Land Lease Deed",
    "Building Stability Certificate",
    "NBA Accreditation Certificate",
    "Barrier-Free Access Compliance Affidavit",
    "Water & Sanitation Health Certificate"
  ];
  const isExpired = d % 14 === 0;
  const isExpiring7 = d % 9 === 0 && !isExpired;
  const isExpiring30 = d % 5 === 0 && !isExpired && !isExpiring7;

  const category = isExpired ? "EXPIRED" : isExpiring7 ? "EXPIRING_7_DAYS" : isExpiring30 ? "EXPIRING_30_DAYS" : "VALID";
  const expiryDate = isExpired ? daysAgo(d % 20 + 1) : isExpiring7 ? daysFromNow((d % 6) + 1) : isExpiring30 ? daysFromNow((d % 22) + 8) : daysFromNow(180 + d * 15);
  const status = isExpired ? "EXPIRED_ACTION_REQUIRED" : isExpiring7 ? "RENEWAL_SUBMITTED" : "VERIFIED";

  SEED_COMPLIANCE_DOCS.push({
    id: `DOC-REC-${String(d).padStart(2, '0')}`,
    institutionId: inst.id,
    institutionName: inst.name,
    documentType: docTypes[d % docTypes.length],
    expiryDate: expiryDate,
    category: category,
    verificationStatus: status,
    lastVerified: daysAgo(30 + (d % 60)),
    risk: isExpired ? "CRITICAL" : (isExpiring7 || isExpiring30) ? "HIGH" : "LOW",
    region: inst.region
  });
}

// 10. CRYPTOGRAPHIC AUDIT LEDGER (50+ SHA-256 Chained Blocks)
function simpleSha256(data) {
  let hash = 0;
  const str = JSON.stringify(data);
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}7f89b${(hex.length * 31).toString(16)}44e1`;
}

export const INITIAL_LEDGER = [
  {
    blockNumber: 1,
    eventId: "EVT-GENESIS-2026",
    applicationId: "AICTE-SYSTEM-GENESIS",
    actor: "SYSTEM_GOV_ROOT",
    role: "System Authority",
    action: "GENESIS_ROOT_INITIALIZATION",
    timestamp: "2026-08-01T00:00:00.000Z",
    payload: { authority: "AICTE New Delhi", standard: "APH 2024-27", chainScope: "NATIONAL_SOVEREIGN" },
    prevHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    currentHash: "0x9f83a42d76e01a9b4412ef88019a32c7104b209e73f0019283eacb11928301fa",
    verified: true
  },
  {
    blockNumber: 2,
    eventId: "EVT-REG-9401",
    applicationId: "AICTE-2026-WZ-9401",
    actor: "MIT Registrar (Dr. V.D. Karad)",
    role: "Institution User",
    action: "APPLICATION_SUBMISSION",
    timestamp: daysAgo(12),
    payload: { type: "Increase in Intake (AI & DS)", paymentId: "PAY-AICTE-99820", dockets: 4 },
    prevHash: "0x9f83a42d76e01a9b4412ef88019a32c7104b209e73f0019283eacb11928301fa",
    currentHash: "0x3b1189ac021ef9a400192ea88231c90021bb490e8201fa99017234810294821a",
    verified: true
  },
  {
    blockNumber: 3,
    eventId: "EVT-SCRUTINY-9401",
    applicationId: "AICTE-2026-WZ-9401",
    actor: "Dr. R.K. Srivastava",
    role: "Scrutiny Officer",
    action: "SCRUTINY_STAGE_ENTERED",
    timestamp: daysAgo(8),
    payload: { scrutinyOfficer: "OFF-101", region: "Western Region", slaDue: daysFromNow(4) },
    prevHash: "0x3b1189ac021ef9a400192ea88231c90021bb490e8201fa99017234810294821a",
    currentHash: "0x7a22cc901928ef0091823ab1104928172901a882039149021820491820938491",
    verified: true
  },
  {
    blockNumber: 4,
    eventId: "EVT-DEFICIENCY-7720",
    applicationId: "AICTE-2026-NZ-7720",
    actor: "Dr. Arvind Joshi",
    role: "Scrutiny Officer",
    action: "DEFICIENCY_NOTICE_ISSUED",
    timestamp: daysAgo(3),
    payload: { clause: "APH 2024-27 Clause 3.4.1", deficiency: "Cadre ratio 1:24 deficient", rectifyWindowDays: 10 },
    prevHash: "0x7a22cc901928ef0091823ab1104928172901a882039149021820491820938491",
    currentHash: "0x4401928abceef019283ab99019283eac091823ab881920391820938491029384",
    verified: true
  }
];

// Dynamically generate remaining 48 ledger blocks
let previousHash = INITIAL_LEDGER[3].currentHash;
for (let b = 5; b <= 52; b++) {
  const app = INITIAL_APPLICATIONS[(b * 3) % INITIAL_APPLICATIONS.length];
  const blockHash = simpleSha256({ block: b, appId: app.id, prev: previousHash });
  INITIAL_LEDGER.push({
    blockNumber: b,
    eventId: `EVT-AUTO-${202600 + b}`,
    applicationId: app.id,
    actor: (b % 3 === 0) ? "Regional Head" : (b % 2 === 0) ? "Scrutiny Officer" : "Committee Lead",
    role: (b % 3 === 0) ? "Regional Head" : "Scrutiny Officer",
    action: (b % 4 === 0) ? "STAGE_ADVANCED" : (b % 3 === 0) ? "DOCUMENT_VERIFIED" : "SLA_HEALTH_CHECK",
    timestamp: daysAgo(Math.max(1, 40 - b)),
    payload: { docketId: app.id, stage: app.currentStage, region: app.region, verificationScore: 98 },
    prevHash: previousHash,
    currentHash: blockHash,
    verified: true
  });
  previousHash = blockHash;
}

// 11. NOTIFICATIONS CENTER FEED
export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    title: "SLA Warning (75% Elapsed)",
    message: "Docket AICTE-2026-WZ-9401 has entered the 75% SLA threshold. 4 days remaining before statutory escalation.",
    channel: "IN_APP",
    priority: "HIGH",
    applicationId: "AICTE-2026-WZ-9401",
    recipient: "Dr. R.K. Srivastava (Western Bureau)",
    timestamp: daysAgo(1),
    read: false,
    deliveryStatus: "DELIVERED (SIMULATED)"
  },
  {
    id: "NOTIF-02",
    title: "SLA Statutory Breach Escalated",
    message: "CRITICAL: Docket AICTE-2026-EZ-6512 has breached statutory review deadline by 4 days. Escalated to Member Secretary.",
    channel: "SMS",
    priority: "CRITICAL",
    applicationId: "AICTE-2026-EZ-6512",
    recipient: "Dr. Alok Chatterjee / Regional Head East",
    timestamp: daysAgo(2),
    read: false,
    deliveryStatus: "SMS_SENT_SIMULATED (Twilio Sandbox)"
  },
  {
    id: "NOTIF-03",
    title: "Deficiency Notice Dispatched",
    message: "Official Deficiency Notice issued for Delhi NCR Technical Campus regarding Faculty Cadre Ratio 1:24.",
    channel: "WHATSAPP",
    priority: "HIGH",
    applicationId: "AICTE-2026-NZ-7720",
    recipient: "+91 98102 99401 (Registrar)",
    timestamp: daysAgo(3),
    read: true,
    deliveryStatus: "WHATSAPP_DELIVERED (Meta Cloud API Demo)"
  },
  {
    id: "NOTIF-04",
    title: "EVC Inspection Scheduled",
    message: "Physical inspection committee confirmed for Maharashtra Institute of Technology & AI on 27 October 2026.",
    channel: "EMAIL",
    priority: "MEDIUM",
    applicationId: "AICTE-2026-WZ-9401",
    recipient: "principal@mit-ai.edu.in",
    timestamp: daysAgo(2),
    read: true,
    deliveryStatus: "EMAIL_SENT_SIMULATED (Nodemailer Relay)"
  },
  {
    id: "NOTIF-05",
    title: "Compliance Expiry Alert: Land Lease",
    message: "Statutory Land Lease for Maharashtra Institute of Technology expires in 18 days. Renewal deed required.",
    channel: "IN_APP",
    priority: "HIGH",
    applicationId: "AICTE-2026-WZ-9401",
    recipient: "MIT Registrar & Regional Head",
    timestamp: daysAgo(1),
    read: false,
    deliveryStatus: "DELIVERED (SIMULATED)"
  }
];

// 12. PREDICTIVE BACKLOG ANALYTICS SERIES (15-Day Regional Forecast)
export const FORECAST_DATA = {
  "Western Region (Mumbai)": [
    { day: "Day 1", historical: 24, forecast: null, lower: null, upper: null },
    { day: "Day 3", historical: 26, forecast: null, lower: null, upper: null },
    { day: "Day 5", historical: 29, forecast: null, lower: null, upper: null },
    { day: "Day 7", historical: 31, forecast: 31, lower: 30, upper: 32 },
    { day: "Day 9", historical: null, forecast: 35, lower: 32, upper: 38 },
    { day: "Day 11", historical: null, forecast: 41, lower: 36, upper: 45 },
    { day: "Day 13", historical: null, forecast: 46, lower: 40, upper: 52 },
    { day: "Day 15", historical: null, forecast: 52, lower: 44, upper: 60 }
  ],
  "Northern Region (New Delhi)": [
    { day: "Day 1", historical: 32, forecast: null, lower: null, upper: null },
    { day: "Day 3", historical: 36, forecast: null, lower: null, upper: null },
    { day: "Day 5", historical: 40, forecast: null, lower: null, upper: null },
    { day: "Day 7", historical: 44, forecast: 44, lower: 42, upper: 46 },
    { day: "Day 9", historical: null, forecast: 50, lower: 46, upper: 55 },
    { day: "Day 11", historical: null, forecast: 58, lower: 51, upper: 64 },
    { day: "Day 13", historical: null, forecast: 65, lower: 57, upper: 73 },
    { day: "Day 15", historical: null, forecast: 74, lower: 63, upper: 84 }
  ],
  "Southern Region (Bengaluru)": [
    { day: "Day 1", historical: 18, forecast: null, lower: null, upper: null },
    { day: "Day 3", historical: 19, forecast: null, lower: null, upper: null },
    { day: "Day 5", historical: 21, forecast: null, lower: null, upper: null },
    { day: "Day 7", historical: 22, forecast: 22, lower: 21, upper: 23 },
    { day: "Day 9", historical: null, forecast: 24, lower: 22, upper: 27 },
    { day: "Day 11", historical: null, forecast: 26, lower: 23, upper: 30 },
    { day: "Day 13", historical: null, forecast: 28, lower: 24, upper: 33 },
    { day: "Day 15", historical: null, forecast: 30, lower: 25, upper: 36 }
  ],
  "Eastern Region (Kolkata)": [
    { day: "Day 1", historical: 15, forecast: null, lower: null, upper: null },
    { day: "Day 3", historical: 16, forecast: null, lower: null, upper: null },
    { day: "Day 5", historical: 18, forecast: null, lower: null, upper: null },
    { day: "Day 7", historical: 20, forecast: 20, lower: 19, upper: 21 },
    { day: "Day 9", historical: null, forecast: 23, lower: 20, upper: 26 },
    { day: "Day 11", historical: null, forecast: 27, lower: 22, upper: 31 },
    { day: "Day 13", historical: null, forecast: 31, lower: 25, upper: 37 },
    { day: "Day 15", historical: null, forecast: 36, lower: 28, upper: 43 }
  ]
};

// 13. APH HANDBOOK SUGGESTED QUESTIONS & CITATIONS
export const APH_QA_DATABASE = [
  {
    q: "What are the mandatory norms for Faculty to Student Cadre Ratio?",
    a: "Under AICTE Approval Process Handbook (APH 2024–27) Chapter III, Clause 3.4.1, Undergraduate Engineering and Technology degree programmes mandate a Faculty-to-Student Ratio (FSR) of 1:20. The cadre distribution must follow 1 Professor : 2 Associate Professors : 6 Assistant Professors. A cadre deficiency exceeding 10% or total FSR deficiency exceeding 20% incurs an automatic 50% punitive reduction of sanctioned intake.",
    chapter: "Chapter III - Norms for Faculty Cadre and Student Ratio",
    clause: "Clause 3.4.1",
    page: "Page 48",
    confidence: "98% (High)"
  },
  {
    q: "What is the policy for Land Lease tenure and upcoming expiry?",
    a: "As per Chapter II, Clause 2.1.3, campus land must be continuous, unencumbered, and owned by the Society/Trust or held under a registered Government lease for a minimum period of 30 years. Any land lease expiring within 30 days triggers an automated statutory alert and freezes positive workflow progression until registered renewal certification is filed.",
    chapter: "Chapter II - Land and Built-up Space Requirements",
    clause: "Clause 2.1.3",
    page: "Page 26",
    confidence: "96% (High)"
  },
  {
    q: "What are the physical audit requirements for an Expert Visit Committee (EVC)?",
    a: "Chapter IV, Clause 4.2.8 stipulates that all physical EVC visits must feature continuous geo-tagged, time-stamped video recording across all computing centers, labs, barrier-free access ramps/lifts for Divyangjan, and active fire safety hydrant systems. Evaluator logs are digitally cryptosealed and archived.",
    chapter: "Chapter IV - Expert Visiting Committee (EVC) Protocols",
    clause: "Clause 4.2.8",
    page: "Page 62",
    confidence: "99% (High)"
  },
  {
    q: "What is the procedure when an application is returned for deficiencies?",
    a: "Under Chapter V, Clause 5.1.2, institutions have a strict 10-calendar-day window to upload rectified proofs to the AICTE portal upon receiving a deficiency notice. If unsatisfied, the case is referred to the Standing Appellate Committee (SAC) chaired by a retired High Court Judge or eminent Academician.",
    chapter: "Chapter V - Standing Hearing Committee (SHC) & SAC",
    clause: "Clause 5.1.2",
    page: "Page 74",
    confidence: "97% (High)"
  },
  {
    q: "What infrastructure is mandatory for introducing AI, ML and Robotics seats?",
    a: "Chapter VII, Clause 7.2.4 mandates: (a) Valid NBA accreditation for at least one eligible UG tier programme, (b) Dedicated High-Performance Computing (HPC) lab with a minimum of 60 GPU workstations, and (c) Industry MoUs for student apprenticeships under NEP 2020.",
    chapter: "Chapter VII - Introduction of Supernumerary & Emerging Tech Seats",
    clause: "Clause 7.2.4",
    page: "Page 112",
    confidence: "95% (High)"
  }
];
