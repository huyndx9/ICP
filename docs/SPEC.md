# PROMPT CHO CLAUDE CODE - ICP QUALIFICATION BD WORKING KIT

Bạn là senior frontend engineer chuyên về iOS design system. Hãy build cho tôi 1 web app premium thay thế Excel, tên là "ICP QUALIFICATION – BD WORKING KIT"

## YÊU CẦU THIẾT KẾ:
- Phong cách iOS 18 / Apple Numbers / Linear: SF Pro font, bo tròn 20px, backdrop-blur, shadow-sm, màu nền #FBFBFD
- Workflow pills ở header với 6 màu: A blue #2B5CFF, B green #2ECC8F, C orange #FF8C21, D purple #7C5CFF, E teal #00B8D9, F darkblue #1A2B6B
- Responsive, animation mượt (framer-motion nếu có)

## CHỨC NĂNG BẮT BUỘC:

### 1. HEADER:
Title: "ICP QUALIFICATION – BD WORKING KIT (EXCEL TEMPLATE DEMO)" + subtitle "Capture Correctly. Compare Clearly. Improve Continuously."
Right: Search input + Button "+ Add Account" (iOS pill)
Dưới header: Workflow bar: A. STRATEGY ASSIGNMENT → B. COMPANY INFORMATION → C. GTM HYPOTHESIS → D. STRATEGY ALIGNMENT → E. EVIDENCE & CONFIDENCE → F. LEADERSHIP DECISION

### 2. TABS (segmented control iOS):
- Dashboard | Qualification Sheet | GTM Framework | Library

### 3. DASHBOARD TAB:
KPIs: Total Accounts, Tier 1, Avg Confidence (tính trung bình L1=1...L5=5), Perfect Match Rate (% Match = Perfect/Heavily)
Charts (dùng recharts):
- Donut Tier Distribution
- Bar Chart Market Distribution (SEA, JP, US, EU, AU, SG...)
- Bar Confidence Level L1-L5
- Pie Strategic Intent (Grow, Optimize, Transform, Protect, Innovate)
Recent accounts table

### 4. QUALIFICATION SHEET TAB (QUAN TRỌNG NHẤT - thay Excel):
Data model cho mỗi row:
No, Project, Market, TargetDomain, ICPModel, Tier, CompanyName, Industry, CompanyType, Employee, RevenueBand, PrimaryBuyingScenario, SecondaryBuyingScenario, StrategicIntent, ExpectedBuyer, ExpectedOffering, MatchWithStrategy, EvidenceSource, ConfidenceLevel, LeadershipDecision, Notes

Demo data 4 rows:
1: Project A, SG, Logistics, Traditional Extension, Tier 1, Company K, Logistics, Traditional, 5000+, >$500M, Expansion, Digital Transformation Cost Optimization, Grow, COO, Custom Solution, Heavily Match, News Hiring, L2, Observe
2: Project B, JP, Manufacturing, Traditional Extension, Tier 2, Company Y, Manufacturing, Traditional, 2000+, $100M-$500M, Operational Excellence, Automation Cost Optimization, Optimize, Head of Operations, Team-based Service, Perfect Match, Website Report, L3, Approach
3: Project C, US, Banking, Traditional Extension, Tier 1, Company Z, Banking, Traditional, 10000+, >$1B, Digital Transformation, Cloud Migration Data Modernization, Transform, CIO, Consulting+Solution, Partial Match, Referral News, L2, Need More Evidence
4: Project D, AU, Healthcare, Traditional Extension, Tier 2, Company W, Healthcare, Traditional, 1000+, $50M-$100M, Compliance, System Modernization Data Security, Protect, Head of IT, Managed Service, New Opportunity, Website Report, L3, Observe

Features:
- Inline editing: click vào cell để edit, dùng <select> cho Market, Tier, Confidence, Intent, Decision, Match
- Toolbar: Filter theo Market/Tier/Confidence + Search + Export CSV
- Add/Delete/Duplicate row
- Sticky header với group colors (A blue, B green, C orange, D purple, E teal, F darkblue)
- Zebra rows, hover highlight, badge màu cho Confidence L1 đỏ #FEE2E2, L2 cam #FFEDD5, L3 vàng #FEF9C3, L4 xanh nhạt #DCFCE7, L5 xanh đậm #16A34A text white
- Freeze first 2 columns giống Excel

### 5. GTM FRAMEWORK TAB:
5 cards pastel:
1. GROWTH #E8F5E9: Market Expansion, New Country, New Business Line, M&A, Funding, IPO, Hiring Scale
2. TRANSFORMATION #E3F2FD: Digital Transformation, Process Automation, Customer Experience, Supply Chain, Organizational, ESG, Operational Excellence
3. TECHNOLOGY #F3E5F5: Cloud Adoption, AI/Analytics, Data Modernization, Legacy Modernization, ERP, Integration/API, Cybersecurity
4. RISK & COMPLIANCE #FFF8E1: Regulatory Compliance, Data Privacy, Cybersecurity, Business Continuity, Audit/Governance, Risk Management
5. COMMERCIAL #FFF3E0: Cost Optimization, Vendor Replacement, Bulk Improvement, Outsourcing, Team Augmentation, Faster Time to Market
Concept flow: OBSERVE SIGNAL → FORM HYPOTHESIS → TEST WITH CUSTOMER → VALIDATE & LEARN
Status: Pending #FFE4B5, Validated #C6F6D5, Rejected #FED7D7, Evolved #E9D8FD

### 6. LIBRARY TAB:
Reference tables cho Confidence Level, Strategic Intent, Expected Offering, Tier, Rule of Thumb: "Capture Facts → Choose from Library → Update After Discovery → Leadership Turns Data into Strategy"

## TECH STACK:
- Vite + React + TypeScript
- TailwindCSS
- Recharts
- Lucide-react icons
- No backend, useState + localStorage

## OUTPUT:
- Code sạch, component chia nhỏ
- Đẹp như app iOS thật, không như web admin thường

Hãy bắt đầu bằng cách tạo project và build luôn.
