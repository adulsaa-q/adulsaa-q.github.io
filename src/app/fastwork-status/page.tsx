import type { Metadata } from "next";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fastwork Rebuild Status",
  description: "Read-only progress summary for the Fastwork listing rebuild.",
  robots: { index: false, follow: false },
};

const workPackets = [
  ["Excel Sales Dashboard", "Dashboard ยอดขาย 1 หน้า", "Draft + Preview verified", "active"],
  ["PDF → Excel", "แปลงตาราง PDF ให้ตรวจทานต่อได้", "Copy + cover ready", "ready"],
  ["Excel Cleaning + Pivot", "จัดข้อมูลและ PivotTable ให้ทีมใช้ต่อ", "Copy + cover ready", "ready"],
  ["Power BI", "รายงานเพื่อเห็นตัวเลขและจุดต้องตรวจ", "Copy + cover ready", "ready"],
  ["Automation Script", "สคริปต์งานซ้ำหนึ่งงานที่ขอบเขตชัด", "Copy + cover ready", "ready"],
  ["Automation Workflow", "Workflow + จุด automation ที่ส่งต่อได้", "Copy + cover ready", "ready"],
  ["Executive KPI Deck", "สไลด์ KPI สำหรับประชุมผู้บริหาร", "Scope economics repaired", "review"],
  ["Data / AI Architecture Deck", "สไลด์อธิบายระบบสำหรับประชุม", "Scope economics repaired", "review"],
  ["B2B Proposal", "Proposal เสนอขายบริการ B2B", "Scope economics repaired", "review"],
] as const;

export default function FastworkStatusPage() {
  return (
    <main className={styles.page} lang="th">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>READ-ONLY · UNLISTED STATUS PAGE</p>
            <h1>Fastwork Rebuild Status</h1>
            <p className={styles.lead}>ติดตามการปรับบริการให้ scope ชัด ภาพสื่อสารได้ และตรวจคุณภาพก่อนส่งตรวจ</p>
          </div>
          <p className={styles.stamp}>UPDATED · 01 SEP 2026</p>
        </header>

        <section className={styles.metrics} aria-label="ภาพรวมสถานะ">
          <Metric number="9" label="รายการในแผน Rebuild" />
          <Metric number="8" label="cover ใหม่ 1280×720 ผ่าน QA" />
          <Metric number="1" label="Draft ที่เปิด Preview แล้ว" />
          <Metric number="0" label="รายการส่งตรวจในรอบนี้" />
        </section>

        <section className={styles.section} aria-labelledby="packets-title">
          <div className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>WORK PACKETS</p><h2 id="packets-title">งานกำลังเดินตามสายผลิต</h2></div>
            <p>Research → Offer → Copy → Visual → QA → Draft → Preview → Submit</p>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead><tr><th>บริการ</th><th>Buyer job</th><th>สถานะปัจจุบัน</th><th>ความคืบหน้า</th></tr></thead>
              <tbody>{workPackets.map(([name, job, status, type], index) => <tr key={name}>
                <td><strong>{name}</strong><span>Packet {String(index + 1).padStart(2, "0")}</span></td>
                <td>{job}</td>
                <td><span className={`${styles.status} ${styles[type]}`}>{status}</span></td>
                <td><Progress state={type} /></td>
              </tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className={styles.grid}>
          <article><p className={styles.eyebrow}>CURRENT GATE</p><h2>Draft-first</h2><p>ไม่มีรายการถูกส่งตรวจจนกว่า title, package, ระยะเวลา, รอบแก้, ราคา และภาพจะตรงกันใน Preview</p></article>
          <article><p className={styles.eyebrow}>QUALITY STANDARD</p><h2>Visual QA ก่อนใช้งาน</h2><p>cover ทุกชิ้นเป็น 1280×720 และตรวจ Thai glyph, safe margin, card scale และ disclosure จาก render จริง</p></article>
          <article><p className={styles.eyebrow}>SCOPE ECONOMICS</p><h2>ไม่ขายงานเกินกำลัง</h2><p>บริการ Presentation ใช้ขอบเขต 4 / 7 / 10 หน้า เพื่อคุมคุณภาพ เวลา และความคุ้มค่าของงาน</p></article>
        </section>
      </div>
    </main>
  );
}

function Metric({ number, label }: { number: string; label: string }) {
  return <article className={styles.metric}><strong>{number}</strong><span>{label}</span></article>;
}

function Progress({ state }: { state: "active" | "ready" | "review" }) {
  const complete = state === "active" ? 5 : state === "ready" ? 6 : 6;
  const current = state === "active" ? 5 : state === "ready" ? 6 : 6;
  return <div className={styles.progress} aria-label={`${complete} ขั้นเสร็จ`}>
    {Array.from({ length: 8 }, (_, i) => <i key={i} className={i < complete ? styles.done : i === current ? styles.now : ""} />)}
  </div>;
}
