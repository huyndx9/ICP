# ICP QUALIFICATION – BD WORKING KIT

> Capture Correctly. Compare Clearly. Improve Continuously.

Công cụ web thay thế file Excel qualification của team BD: nhập liệu trực tiếp
trên lưới giống Excel, xem dashboard tự động, và tra thư viện chuẩn hoá giá trị
để các dòng dữ liệu so sánh được với nhau.

Giao diện theo phong cách iOS 18 / Apple Numbers: nền `#FBFBFD`, thẻ bo 20px,
backdrop-blur, và thanh workflow 6 màu A→F.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # typecheck + build vào dist/
npm run preview  # xem bản build
npm run typecheck
```

## 4 tab chính

| Tab | Nội dung |
| --- | --- |
| **Dashboard** | 4 KPI (Total Accounts, Tier 1, Avg Confidence L1–L5, Match Rate) + 4 biểu đồ Recharts (Tier donut, Market bar, Confidence bar, Strategic Intent pie) + bảng Recent Accounts. |
| **Qualification Sheet** | Lưới thay Excel: 20 cột, sửa trực tiếp trên ô, filter Market/Tier/Confidence, search, export CSV, thêm/nhân bản/xoá dòng. |
| **GTM Framework** | 5 nhóm buying scenario (Growth, Transformation, Technology, Risk & Compliance, Commercial), concept flow và trạng thái hypothesis. |
| **Library** | Bảng tham chiếu cho Confidence Level, Strategic Intent, Expected Offering, Tier, Leadership Decision + rule of thumb. |

## Qualification Sheet

- **Sửa tại chỗ**: click vào ô text để sửa (`Enter` lưu, `Esc` huỷ); các cột có
  danh sách chuẩn (Market, Tier, Confidence, Intent, Match, Decision…) dùng
  `<select>`.
- **Đóng băng cột**: cột `No` và `Project` luôn hiển thị khi cuộn ngang, đúng
  kiểu freeze pane của Excel.
- **Header dính theo nhóm A→F**: mỗi nhóm cột mang màu workflow riêng
  (A `#2B5CFF`, B `#2ECC8F`, C `#FF8C21`, D `#7C5CFF`, E `#00B8D9`,
  F `#1A2B6B`) và nhãn nhóm bám trái khi cuộn.
- **Badge màu**: Confidence L1→L5 đi từ đỏ sang xanh đậm; Tier, Match và
  Decision cũng có màu riêng.
- **Export CSV**: xuất đúng các dòng đang hiển thị sau filter/search, có BOM để
  Excel mở không lỗi font.
- **Reset**: khôi phục 4 dòng demo.

## Dữ liệu

Không có backend. Dữ liệu nằm trong `useState` và được lưu vào `localStorage`
(khoá `icp-bd-working-kit/rows`), nên mỗi trình duyệt giữ bản làm việc riêng.
Lần mở đầu tiên app nạp 4 dòng demo trong `src/data/demo.ts`.

## Cấu trúc

```
src/
  App.tsx                    # state dòng dữ liệu, filter, search, điều hướng tab
  types.ts                   # ICPRow và các kiểu dùng chung
  data/
    columns.ts               # 20 cột của sheet + cách gom nhóm A→F
    demo.ts                  # 4 dòng demo
    gtm.ts                   # dữ liệu tab GTM Framework
    options.ts               # danh sách giá trị chuẩn + bảng màu badge
    reference.ts             # bảng tham chiếu tab Library
    workflow.ts              # 6 stage A→F và màu tương ứng
  lib/
    csv.ts                   # xuất CSV
    metrics.ts               # KPI và số liệu biểu đồ
    storage.ts               # hook localStorage
  components/
    Header.tsx, WorkflowBar.tsx
    ui/                      # Card, Badge, SegmentedControl
    dashboard/  sheet/  gtm/  library/
```

## Tech stack

Vite · React 18 · TypeScript · TailwindCSS · Recharts · lucide-react

Yêu cầu gốc của công cụ được giữ trong [`docs/SPEC.md`](docs/SPEC.md).
