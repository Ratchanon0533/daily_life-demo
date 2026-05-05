// src/components/MyDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Kanit",
  fonts: [
    { src: "/fonts/Kanit-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Kanit-Bold.ttf", fontWeight: 700 },
  ],
});

export interface SkillItem {
  language?: string | null;
  listening?: string | null;
  speaking?: string | null;
  reading?: string | null;
  writing?: string | null;
}

export interface ActivityItem {
  photos: string[];
  name_project?: string | null;
  date?: string | null;
  description?: string | null;
}

export interface PDFProps {
  introduce: string;
  prefix?: string;
  first_name?: string;
  last_name?: string;
  birth_day?: number | string;
  birth_month?: string;
  birth_year?: number | string;
  nationality?: string;
  id_card?: string;
  phonenumber1?: string;
  phonenumber2?: string;
  email?: string;
  address?: string;
  province?: string;
  district?: string;
  subdistrict?: string;
  postal_code?: string;
  gender?: string;
  height?: string;
  weight?: string;
  personal_image?: string | null;
  skills?: SkillItem[];
  activities?: ActivityItem[];
  university?: string;
  faculty?: string;
  major?: string;
  reason?: string;
  school?: string;
  graduation?: string;
  educational_qualifications?: string;
  study_path?: string;
  grade_average?: string | number;
  study_results: File | string | null;
  province_edu?: string;
  district_edu?: string;
  skills_details?: string;
  others_skills?: string;
}


const C = {
  navy: "#1B2A4A",
  navyLight: "#2C3E6B",
  accent: "#C9A84C",
  white: "#FFFFFF",
  offWhite: "#F7F8FA",
  text: "#2D2D2D",
  muted: "#6B7280",
  line: "#E5E7EB",
  sideText: "#D1D9EC",
  tag: "#EEF2FF",
  tagText: "#3B4E8C",
};

const styles = StyleSheet.create({
  page: { fontFamily: "Kanit", backgroundColor: C.white },
  row: { flexDirection: "row", minHeight: 841 },

  /* ── Sidebar ── */
  sidebar: {
    width: 190,
    backgroundColor: C.navy,
    paddingBottom: 30,
  },
  photoWrap: {
    width: 190,
    height: 200,
    backgroundColor: C.navy,
    marginBottom: 16,
    overflow: "hidden",
  },
  profileImage: { width: 170, height: 200, objectFit: "cover", margin: "0 auto", marginTop: 10 },

  sidePad: { paddingHorizontal: 16 },

  /* ✅ ลบ letterSpacing ออก — ทำให้ภาษาไทยตกหล่น */
  sideHeader: {
    fontSize: 10,
    fontWeight: 700,
    color: C.accent,
    marginTop: 16,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff25",
  },

  sideLabel: { fontSize: 9, color: "#8899BB", marginBottom: 1 },
  sideText: { fontSize: 10.5, color: C.sideText, marginBottom: 5, lineHeight: 1.5 },

  skillBlock: { marginBottom: 8 },
  skillLang: {
    fontSize: 11,
    fontWeight: 700,
    color: C.white,
    marginBottom: 4,
    backgroundColor: "#ffffff18",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  skillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  skillKey: { fontSize: 9.5, color: "#AABBDD" },
  skillVal: { fontSize: 9.5, color: C.white },
  sideDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff15",
    marginVertical: 6,
  },

  /* ── Main ── */
  main: { flex: 1, backgroundColor: C.white },

  headerBand: {
    backgroundColor: C.offWhite,
    borderBottomWidth: 3,
    borderBottomColor: C.accent,
    paddingTop: 26,
    paddingBottom: 16,
    paddingHorizontal: 26,
  },
  name: { fontSize: 24, fontWeight: 700, color: C.navy, lineHeight: 1.3 },
  addressLine: { fontSize: 10, color: C.muted, marginTop: 4 },

  body: { paddingHorizontal: 26, paddingTop: 16, paddingBottom: 24 },

  section: { marginBottom: 14 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  sectionBar: {
    width: 3,
    height: 14,
    backgroundColor: C.accent,
    marginRight: 7,
    borderRadius: 2,
  },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: C.navy },

  para: { fontSize: 11, color: C.text, lineHeight: 1.7 },

  infoGrid: { flexDirection: "row", flexWrap: "wrap" },
  infoCell: { width: "50%", marginBottom: 6 },
  infoLabel: { fontSize: 9, color: C.muted, marginBottom: 1 },
  infoVal: { fontSize: 10.5, color: C.text, fontWeight: 700 },

  gradeBadge: {
    backgroundColor: C.tag,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  gradeText: { fontSize: 11, color: C.tagText, fontWeight: 700 },

  transcriptImg: { width: "100%", marginTop: 6, borderRadius: 4 },

  /* ── Activity card ── */
  actCard: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 6,
    overflow: "hidden",
  },
  actHeader: {
    backgroundColor: C.offWhite,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  actName: { fontSize: 11, fontWeight: 700, color: C.navy, flex: 1 },
  actDate: { fontSize: 9, color: C.muted, marginLeft: 8 },

  /* ✅ คำอธิบายกิจกรรม */
  actDesc: {
    fontSize: 10.5,
    color: C.text,
    lineHeight: 1.6,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 4,
  },

  /* ✅ Photos แยกของแต่ละกิจกรรม */
  actPhotos: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 6,
    backgroundColor: C.white,
  },
  actPhoto: {
    width: "75%",
    height: "75%",
    margin: "3 auto",
    borderRadius: 3,
    objectFit: "cover",


  },
});

/* ── Helpers ── */
const formatThaiDate = (raw?: string) => {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return raw;
  }
};

const SectionTitle = ({ label }: { label: string }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionBar} />
    <Text style={styles.sectionTitle}>{label}</Text>
  </View>
);

const InfoCell = ({ label, value }: { label: string; value?: string | number }) =>
  value ? (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoVal}>{String(value)}</Text>
    </View>
  ) : null;

/* ══════════════ PDF Component ══════════════ */
export const PortfolioPDF: React.FC<PDFProps> = ({
  introduce,
  prefix, first_name, last_name,
  birth_day, birth_month, birth_year,
  nationality, id_card,
  phonenumber1, phonenumber2, email,
  address, province, district, subdistrict, postal_code,
  gender, height, weight,
  personal_image,
  skills = [],
  activities = [],
  university, faculty, major, reason,
  school, graduation, educational_qualifications,
  study_path, grade_average, study_results, province_edu, district_edu, skills_details, others_skills,
}) => {
  const fullName = [prefix, first_name, last_name].filter(Boolean).join(" ");
  const fullAddress = [address, subdistrict, district, province, postal_code]
    .filter(Boolean).join(" ");
  const hasEdu = !!(school || graduation || educational_qualifications ||
    study_path || grade_average || study_results);
  const hasUni = !!(university || faculty || major);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.row}>

          {/* ════════ SIDEBAR ════════ */}
          <View style={styles.sidebar}>

            {/* รูปโปรไฟล์ */}
            <View style={styles.photoWrap}>
              {personal_image
                ? <Image src={personal_image} style={styles.profileImage} />
                : <View style={{ width: 190, height: 200, backgroundColor: C.navyLight }} />
              }
            </View>

            <View style={styles.sidePad}>

              {/* ติดต่อ */}
              {(email || phonenumber1 || phonenumber2) && (
                <>
                  <Text style={styles.sideHeader}>ติดต่อ</Text>
                  {email && <Text style={styles.sideText}>{email}</Text>}
                  {phonenumber1 && <Text style={styles.sideText}>{phonenumber1}</Text>}
                  {phonenumber2 && <Text style={styles.sideText}>{phonenumber2}</Text>}
                </>
              )}

              {/* ข้อมูลส่วนตัว */}
              {(birth_day || nationality || id_card || gender || height || weight) && (
                <>
                  <Text style={styles.sideHeader}>ข้อมูลส่วนตัว</Text>
                  {(birth_day || birth_month || birth_year) && (
                    <>
                      <Text style={styles.sideLabel}>วันเกิด</Text>
                      <Text style={styles.sideText}>
                        {birth_day} {birth_month} {birth_year}
                      </Text>
                    </>
                  )}
                  {nationality && (
                    <>
                      <Text style={styles.sideLabel}>สัญชาติ</Text>
                      <Text style={styles.sideText}>{nationality}</Text>
                    </>
                  )}
                  {id_card && (
                    <>
                      <Text style={styles.sideLabel}>เลขบัตรประชาชน</Text>
                      <Text style={styles.sideText}>{id_card}</Text>
                    </>
                  )}
                  {gender && (
                    <>
                      <Text style={styles.sideLabel}>เพศ</Text>
                      <Text style={styles.sideText}>{gender}</Text>
                    </>
                  )}
                  {(height || weight) && (
                    <Text style={styles.sideText}>
                      {height ? `${height} ซม.` : ""}
                      {height && weight ? "  /  " : ""}
                      {weight ? `${weight} กก.` : ""}
                    </Text>
                  )}
                </>
              )}

              {/* ทักษะภาษา */}
              {skills.length > 0 && (
                <>
                  <Text style={styles.sideHeader}>ทักษะภาษา</Text>
                  {skills.map((sk, i) => (
                    <View key={i} style={styles.skillBlock}>
                      {sk.language && (
                        <Text style={styles.skillLang}>{sk.language}</Text>
                      )}
                      {(
                        [
                          ["การฟัง", sk.listening],
                          ["การพูด", sk.speaking],
                          ["การอ่าน", sk.reading],
                          ["การเขียน", sk.writing],
                        ] as [string, string | undefined][]
                      )
                        .filter(([, v]) => v)
                        .map(([k, v], j) => (
                          <View key={j} style={styles.skillRow}>
                            <Text style={styles.skillKey}>{k}</Text>
                            <Text style={styles.skillVal}>{v}</Text>
                          </View>
                        ))}
                      {i < skills.length - 1 && (
                        <View style={styles.sideDivider} />
                      )}
                    </View>
                  ))}
                </>
              )}

            </View>
          </View>

          {/* ════════ MAIN CONTENT ════════ */}
          <View style={styles.main}>

            {/* Header */}
            <View style={styles.headerBand}>
              <Text style={styles.name}>{fullName}</Text>
              {fullAddress && (
                <Text style={styles.addressLine}>{fullAddress}</Text>
              )}
            </View>

            <View style={styles.body}>

              {/* แนะนำตัว */}
              {introduce && (
                <View style={styles.section}>
                  <SectionTitle label="แนะนำตัวว" />
                  <Text style={styles.para}>{introduce}</Text>
                </View>
              )}
              {/* ✅ ทักษะและความสามารถ (Simple Text Version) */}
              {skills_details && (
                <View style={styles.section}>
                  <SectionTitle label="ทักษะและความสามารถ" />
                  <Text style={styles.para}>{skills_details}</Text>
                </View>
              )}
              {others_skills && (
                <View style={styles.section}>
                  <SectionTitle label="ทักษะอื่นๆ" />
                  <Text style={styles.para}>{others_skills}</Text>
                </View>
              )}
              {/* การศึกษา */}
              {hasEdu && (
                <View style={styles.section}>
                  <SectionTitle label="การศึกษา" />
                  <View style={styles.infoGrid}>
                    <InfoCell label="โรงเรียน/สถาบันการศึกษา" value={school} />
                    <InfoCell label="วุฒิการศึกษา" value={educational_qualifications} />
                    <InfoCell label="สำเร็จการศึกษา" value={graduation} />
                    <InfoCell label="แผนการเรียน" value={study_path} />
                    <InfoCell label="จังหวัด" value={province_edu} />
                    <InfoCell label="เขต/อำเภอ" value={district_edu} />

                  </View>
                  {grade_average && (
                    <View style={styles.gradeBadge}>
                      <Text style={styles.gradeText}>GPA {grade_average}</Text>
                    </View>
                  )}

                </View>
              )}

              {/* ✅ กิจกรรม — แต่ละ card มีรูปของตัวเองแยกกัน */}


            </View>
          </View>
        </View>
      </Page>

      {/* มหาวิทยาลัยที่สนใจ — own page so long reason text never gets clipped by the sidebar row */}
      {hasUni && (
        <Page size="A4" style={styles.page} wrap>
          <View style={[styles.section, { marginTop: 26, paddingHorizontal: 26 }]}>
            <SectionTitle label="มหาวิทยาลัยที่สนใจ" />
            <View style={styles.infoGrid}>
              <InfoCell label="มหาวิทยาลัย" value={university} />
              <InfoCell label="คณะ" value={faculty} />
              <InfoCell label="สาขา" value={major} />
            </View>
            {reason && (
              <Text style={[styles.para, { marginTop: 8 }]}>
                เหตุผล: {reason}
              </Text>
            )}
          </View>
        </Page>
      )}

      <Page size="A4" style={styles.page} wrap>

        {activities.length > 0 && (
          <View style={[styles.section, { marginTop: 26, paddingHorizontal: 26 }]}>
            <SectionTitle label="กิจกรรม / ใบรับรอง" />

            {activities.map((act, i) => (
              <View key={i} style={styles.actCard} wrap={false}>

                {/* Header: ชื่อ + วันที่ */}
                <View style={styles.actHeader}>
                  <Text style={styles.actName}>
                    {act.name_project || `กิจกรรมที่ ${i + 1}`}
                  </Text>
                  {act.date && (
                    <Text style={styles.actDate}>
                      {formatThaiDate(act.date)}
                    </Text>
                  )}
                </View>

                {/* ✅ คำอธิบายกิจกรรม */}
                {act.description && (
                  <Text style={styles.actDesc}>{act.description}</Text>
                )}

                {/* ✅ รูปของกิจกรรมนี้เท่านั้น */}
                {act.photos.length > 0 && (
                  <View style={styles.actPhotos}>
                    {act.photos.map((url, j) => (
                      <Image
                        key={`act-${i}-photo-${j}`}
                        src={url}
                        style={styles.actPhoto}
                        cache={true}
                      />
                    ))}
                  </View>
                )}

              </View>
            ))}
          </View>
        )}

      </Page>

      {study_results && (
        <Page size="A4" style={styles.page}>
          <View style={{ flex: 1, marginTop: 26, paddingHorizontal: 26, paddingBottom: 26 }}>
            <SectionTitle label="เอกสารผลการเรียน" />
            <View style={{ flex: 1, marginTop: 6 }}>
              <Image
                src={study_results}
                style={{
                  flex: 1,
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: 4,
                  border: '1pt solid #eeeeee'
                }}
              />
            </View>
          </View>
        </Page>
      )}

    </Document>
  );
};

// ===========================================================================
// Template 2: Classic — Formal/minimal, government-document style
// ===========================================================================

const CL = {
  ink: "#111",
  text: "#222",
  muted: "#6B6B6B",
  rule: "#1F1F1F",
  faint: "#D9D9D9",
  zebra: "#F4F4F4",
  band: "#FAFAFA",
};

const classicStyles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 56,
    fontFamily: "Kanit",
    fontSize: 10.5,
    color: CL.text,
    backgroundColor: "#fff",
  },

  /* Header band */
  header: {
    alignItems: "center",
    marginBottom: 22,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: CL.rule,
  },
  headerEyebrow: {
    fontSize: 8.5,
    color: CL.muted,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: CL.ink,
    letterSpacing: 0.5,
  },
  headerRuleThin: {
    height: 0.5,
    width: 60,
    backgroundColor: CL.rule,
    marginTop: 8,
  },
  headerSub: {
    fontSize: 10.5,
    color: CL.muted,
    marginTop: 8,
  },

  /* Profile block */
  topRow: {
    flexDirection: "row",
    marginBottom: 22,
  },
  photoBox: {
    width: 96,
    height: 120,
    borderWidth: 0.75,
    borderColor: CL.rule,
    marginRight: 22,
    backgroundColor: CL.band,
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 9,
    color: CL.muted,
  },
  infoCol: {
    flex: 1,
    paddingTop: 2,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  infoLabel: {
    width: 110,
    fontSize: 10,
    color: CL.muted,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  infoValue: {
    flex: 1,
    fontSize: 10.5,
    color: CL.ink,
  },

  /* Sections */
  section: {
    marginBottom: 14,
  },
  sectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionNum: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: CL.rule,
    fontSize: 10,
    fontWeight: 700,
    color: CL.ink,
    textAlign: "center",
    paddingTop: 4,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: CL.ink,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    flex: 1,
    paddingBottom: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: CL.rule,
  },

  para: {
    fontSize: 10.5,
    lineHeight: 1.55,
    marginBottom: 4,
    color: CL.text,
  },

  /* Two-column education grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridCell: {
    width: "50%",
    paddingRight: 8,
    marginBottom: 6,
    flexDirection: "row",
  },
  gridLabel: {
    fontSize: 9.5,
    color: CL.muted,
    fontWeight: 700,
    letterSpacing: 0.3,
    width: 92,
  },
  gridValue: {
    flex: 1,
    fontSize: 10.5,
    color: CL.ink,
  },

  /* Skills table */
  table: {
    borderTopWidth: 0.75,
    borderBottomWidth: 0.75,
    borderColor: CL.rule,
    marginTop: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeadRow: {
    backgroundColor: CL.band,
    borderBottomWidth: 0.75,
    borderBottomColor: CL.rule,
  },
  tableZebra: {
    backgroundColor: CL.zebra,
  },
  tableHead: {
    fontWeight: 700,
    padding: 6,
    fontSize: 9.5,
    color: CL.ink,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  tableCell: {
    padding: 6,
    fontSize: 10,
    color: CL.text,
  },

  /* Activities */
  activityCard: {
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 0.5,
    borderTopColor: CL.faint,
  },
  activityCardFirst: {
    borderTopWidth: 0,
    paddingTop: 2,
  },
  activityImg: {
    width: "100%",
    objectFit: "contain",
    marginBottom: 6,
  },
  activityImgPlaceholder: {
    width: "100%",
    height: 120,
    borderWidth: 0.5,
    borderColor: CL.faint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  activityImgPlaceholderText: {
    fontSize: 9,
    color: CL.muted,
    letterSpacing: 1,
  },
  activityDetails: {
    paddingTop: 0,
  },
  activityTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 3,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: CL.faint,
  },
  activityName: {
    fontSize: 11.5,
    fontWeight: 700,
    color: CL.ink,
    flex: 1,
    paddingRight: 8,
  },
  activityDate: {
    fontSize: 9.5,
    color: CL.muted,
    letterSpacing: 0.4,
  },
  activityDesc: {
    fontSize: 10,
    lineHeight: 1.45,
    color: CL.text,
    marginTop: 2,
  },

  /* Footer */
  footer: {
    position: "absolute",
    bottom: 24,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8.5,
    color: CL.muted,
    borderTopWidth: 0.5,
    borderTopColor: CL.faint,
    paddingTop: 6,
  },
});

export const PortfolioPDFClassic: React.FC<PDFProps> = (props) => {
  const fullName = [props.prefix, props.first_name, props.last_name]
    .filter(Boolean).join(" ");
  const fullAddress = [
    props.address, props.subdistrict, props.district, props.province, props.postal_code,
  ].filter(Boolean).join(" ");
  const birth = [props.birth_day, props.birth_month, props.birth_year]
    .filter(Boolean).join(" ");

  const hasIdentity = !!(birth || props.nationality || props.id_card || props.gender
    || props.height || props.weight || props.phonenumber1 || props.phonenumber2
    || props.email || fullAddress);
  const hasEdu = !!(props.school || props.educational_qualifications || props.graduation
    || props.study_path || props.grade_average || props.province_edu || props.district_edu);
  const hasSkills = !!(props.skills_details || (props.skills && props.skills.length > 0) || props.others_skills);
  const hasUni = !!(props.university || props.faculty || props.major || props.reason);
  const hasActivities = !!(props.activities && props.activities.length > 0);
  const hasStudyResults = !!(props.study_results && typeof props.study_results === "string");

  const InfoRow = ({ label, value }: { label: string; value?: React.ReactNode }) =>
    value ? (
      <View style={classicStyles.infoRow}>
        <Text style={classicStyles.infoLabel}>{label}</Text>
        <Text style={classicStyles.infoValue}>{value}</Text>
      </View>
    ) : null;

  const GridCell = ({ label, value }: { label: string; value?: React.ReactNode }) =>
    value ? (
      <View style={classicStyles.gridCell}>
        <Text style={classicStyles.gridLabel}>{label}</Text>
        <Text style={classicStyles.gridValue}>{value}</Text>
      </View>
    ) : null;

  const SectionTitleC = ({ num, label }: { num: string; label: string }) => (
    <View style={classicStyles.sectionTitleWrap}>
      <Text style={classicStyles.sectionNum}>{num}</Text>
      <Text style={classicStyles.sectionTitle}>{label}</Text>
    </View>
  );

  const Footer = () => (
    <View style={classicStyles.footer} fixed>
      <Text>{fullName || "Portfolio"}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );

  let sec = 0;
  const next = () => String(++sec).padStart(2, "0");

  return (
    <Document>
      <Page size="A4" style={classicStyles.page} wrap>
        {/* HEADER */}
        <View style={classicStyles.header}>
          <Text style={classicStyles.headerEyebrow}>P O R T F O L I O</Text>
          <Text style={classicStyles.headerTitle}>{fullName || "แฟ้มสะสมผลงาน"}</Text>
          <View style={classicStyles.headerRuleThin} />
          {props.introduce && (
            <Text style={classicStyles.headerSub}>แฟ้มสะสมผลงาน · Portfolio</Text>
          )}
        </View>

        {/* PROFILE */}
        <View style={classicStyles.topRow}>
          <View style={classicStyles.photoBox}>
            {props.personal_image ? (
              <Image src={props.personal_image} style={classicStyles.photoImg} />
            ) : (
              <View style={classicStyles.photoPlaceholder}>
                <Text>รูปถ่าย</Text>
              </View>
            )}
          </View>

          <View style={classicStyles.infoCol}>
            <InfoRow label="ชื่อ-นามสกุล" value={fullName} />
            <InfoRow label="วันเกิด" value={birth} />
            <InfoRow label="สัญชาติ" value={props.nationality} />
            <InfoRow label="บัตรประชาชน" value={props.id_card} />
            <InfoRow label="เพศ" value={props.gender} />
            {(props.height || props.weight) && (
              <InfoRow
                label="ส่วนสูง / น้ำหนัก"
                value={[
                  props.height ? `${props.height} ซม.` : null,
                  props.weight ? `${props.weight} กก.` : null,
                ].filter(Boolean).join(" / ")}
              />
            )}
            <InfoRow
              label="เบอร์ติดต่อ"
              value={[props.phonenumber1, props.phonenumber2].filter(Boolean).join(", ")}
            />
            <InfoRow label="อีเมล" value={props.email} />
            <InfoRow label="ที่อยู่" value={fullAddress} />
          </View>
        </View>

        {/* INTRODUCE */}
        {props.introduce && (
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="ประวัติแนะนำตัว" />
            <Text style={classicStyles.para}>{props.introduce}</Text>
          </View>
        )}

        {/* EDUCATION */}
        {hasEdu && (
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="ประวัติการศึกษา" />
            <View style={classicStyles.grid}>
              <GridCell label="โรงเรียน" value={props.school} />
              <GridCell label="วุฒิการศึกษา" value={props.educational_qualifications} />
              <GridCell label="แผนการเรียน" value={props.study_path} />
              <GridCell label="ปีที่จบ" value={props.graduation} />
              <GridCell label="เกรดเฉลี่ย" value={props.grade_average} />
              <GridCell label="จังหวัด" value={props.province_edu} />
              <GridCell label="เขต/อำเภอ" value={props.district_edu} />
            </View>
          </View>
        )}

        {/* SKILLS */}
        {hasSkills && (
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="ทักษะ / ความสามารถ" />
            {props.skills_details && (
              <Text style={classicStyles.para}>{props.skills_details}</Text>
            )}
            {props.skills && props.skills.length > 0 && (
              <View style={classicStyles.table}>
                <View style={[classicStyles.tableRow, classicStyles.tableHeadRow]} wrap={false}>
                  <Text style={[classicStyles.tableHead, { width: "20%" }]}>ภาษา</Text>
                  <Text style={[classicStyles.tableHead, { width: "20%" }]}>ฟัง</Text>
                  <Text style={[classicStyles.tableHead, { width: "20%" }]}>พูด</Text>
                  <Text style={[classicStyles.tableHead, { width: "20%" }]}>อ่าน</Text>
                  <Text style={[classicStyles.tableHead, { width: "20%" }]}>เขียน</Text>
                </View>
                {props.skills.map((s, i) => (
                  <View
                    key={i}
                    style={i % 2 === 1
                      ? [classicStyles.tableRow, classicStyles.tableZebra]
                      : classicStyles.tableRow}
                    wrap={false}
                  >
                    <Text style={[classicStyles.tableCell, { width: "20%" }]}>{s.language || "—"}</Text>
                    <Text style={[classicStyles.tableCell, { width: "20%" }]}>{s.listening || "—"}</Text>
                    <Text style={[classicStyles.tableCell, { width: "20%" }]}>{s.speaking || "—"}</Text>
                    <Text style={[classicStyles.tableCell, { width: "20%" }]}>{s.reading || "—"}</Text>
                    <Text style={[classicStyles.tableCell, { width: "20%" }]}>{s.writing || "—"}</Text>
                  </View>
                ))}
              </View>
            )}
            {props.others_skills && (
              <Text style={[classicStyles.para, { marginTop: 4 }]}>
                <Text style={{ fontWeight: 700, color: CL.muted }}>ทักษะอื่นๆ · </Text>
                {props.others_skills}
              </Text>
            )}
          </View>
        )}

        {!hasIdentity && !props.introduce && !hasEdu && !hasSkills && !hasUni && (
          <Text style={[classicStyles.para, { textAlign: "center", color: CL.muted, marginTop: 40 }]}>
            ยังไม่มีข้อมูล
          </Text>
        )}
        <Footer />
      </Page>

      {/* UNIVERSITY — own page so long reason text never splits across pages */}
      {hasUni && (
        <Page size="A4" style={classicStyles.page} wrap>
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="มหาวิทยาลัยที่สนใจ" />
            <View style={classicStyles.grid}>
              <GridCell label="มหาวิทยาลัย" value={props.university} />
              <GridCell label="คณะ" value={props.faculty} />
              <GridCell label="สาขา" value={props.major} />
            </View>
            {props.reason && (
              <View style={{ marginTop: 8 }}>
                <Text style={[classicStyles.gridLabel, { width: "auto", marginBottom: 4 }]}>
                  เหตุผล
                </Text>
                <Text style={classicStyles.para}>{props.reason}</Text>
              </View>
            )}
          </View>
          <Footer />
        </Page>
      )}

      {/* ACTIVITIES — own page so cards never split */}
      {hasActivities && (
        <Page size="A4" style={classicStyles.page} wrap>
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="กิจกรรม / เกียรติบัตร" />
            {props.activities!.map((a, idx) => (
              <View
                key={idx}
                style={idx === 0
                  ? [classicStyles.activityCard, classicStyles.activityCardFirst]
                  : classicStyles.activityCard}
                wrap={false}
              >
                {/* Image */}
                {a.photos && a.photos[0] ? (
                  <Image src={a.photos[0]} style={classicStyles.activityImg} />
                ) : (
                  <View style={classicStyles.activityImgPlaceholder}>
                    <Text style={classicStyles.activityImgPlaceholderText}>NO IMAGE</Text>
                  </View>
                )}

                {/* Details below image */}
                <View style={classicStyles.activityDetails}>
                  <View style={classicStyles.activityTitleRow}>
                    <Text style={classicStyles.activityName}>
                      {a.name_project || `กิจกรรมที่ ${idx + 1}`}
                    </Text>
                    {a.date && (
                      <Text style={classicStyles.activityDate}>{formatThaiDate(a.date)}</Text>
                    )}
                  </View>
                  {a.description && (
                    <Text style={classicStyles.activityDesc}>{a.description}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          <Footer />
        </Page>
      )}

      {/* STUDY RESULTS — own page, image fits within remaining space */}
      {hasStudyResults && (
        <Page size="A4" style={classicStyles.page}>
          <View style={classicStyles.section}>
            <SectionTitleC num={next()} label="เอกสารผลการเรียน" />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              src={props.study_results as string}
              style={{
                flex: 1,
                width: "100%",
                objectFit: "contain",
                borderWidth: 0.5,
                borderColor: CL.faint,
              }}
            />
          </View>
          <Footer />
        </Page>
      )}
    </Document>
  );
};


// ===========================================================================
// Template 3: Modern — Stylish/colorful with sidebar accent
// ===========================================================================

const M = {
  primary: "#0F4C75",
  accent: "#E94560",
  light: "#F5F5F7",
  text: "#222",
  muted: "#666",
};

const modernStyles = StyleSheet.create({
  page: {
    fontFamily: "Kanit",
    fontSize: 10,
    color: M.text,
    flexDirection: "row",
    backgroundColor: M.light,
  },
  sidebar: {
    width: "35%",
    backgroundColor: M.primary,
    color: "#fff",
    padding: 20,
  },
  main: {
    width: "65%",
    padding: 24,
    backgroundColor: "#fff",
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: M.accent,
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  nameBig: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  roleSmall: {
    fontSize: 9,
    color: "#cfd9e3",
    textAlign: "center",
    marginBottom: 14,
  },
  sideTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: M.accent,
    marginTop: 12,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sideText: {
    fontSize: 9,
    color: "#fff",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  sideLabel: {
    fontWeight: 700,
    color: "#cfd9e3",
  },
  mainHeader: {
    borderBottomWidth: 3,
    borderBottomColor: M.accent,
    paddingBottom: 6,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: M.primary,
  },
  para: {
    fontSize: 10,
    lineHeight: 1.5,
    color: M.text,
    marginBottom: 4,
  },
  block: {
    marginBottom: 14,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  pill: {
    backgroundColor: M.accent,
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 9,
  },
  activityCard: {
    backgroundColor: M.light,
    padding: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: M.accent,
  },
  activityImg: {
    width: 60,
    height: 45,
    objectFit: "cover",
    marginRight: 6,
  },
});

export const PortfolioPDFModern: React.FC<PDFProps> = (props) => {
  const fullName = `${props.prefix ?? ""} ${props.first_name ?? ""} ${props.last_name ?? ""}`.trim();

  return (
    <Document>
      <Page size="A4" style={modernStyles.page}>
        {/* SIDEBAR */}
        <View style={modernStyles.sidebar}>
          <View style={modernStyles.photoCircle}>
            {props.personal_image ? (
              <Image src={props.personal_image} style={modernStyles.photoImg} />
            ) : (
              <Text style={{ textAlign: "center", marginTop: 40, fontSize: 9, color: "#fff" }}>
                Photo
              </Text>
            )}
          </View>

          <Text style={modernStyles.nameBig}>{fullName || "—"}</Text>
          <Text style={modernStyles.roleSmall}>นักเรียน</Text>

          <Text style={modernStyles.sideTitle}>ข้อมูลส่วนตัว</Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>วันเกิด: </Text>
            {props.birth_day ?? "—"} {props.birth_month ?? ""} {props.birth_year ?? ""}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>สัญชาติ: </Text>
            {props.nationality || "—"}
          </Text>

          <Text style={modernStyles.sideTitle}>ติดต่อ</Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>โทร: </Text>
            {props.phonenumber1 || "—"}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>อีเมล: </Text>
            {props.email || "—"}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>ที่อยู่: </Text>
            {[props.address, props.subdistrict, props.district, props.province, props.postal_code]
              .filter(Boolean)
              .join(" ") || "—"}
          </Text>

          <Text style={modernStyles.sideTitle}>การศึกษา</Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>โรงเรียน: </Text>
            {props.school || "—"}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>วุฒิ: </Text>
            {props.educational_qualifications || "—"}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>สาย: </Text>
            {props.study_path || "—"}
          </Text>
          <Text style={modernStyles.sideText}>
            <Text style={modernStyles.sideLabel}>เกรด: </Text>
            {props.grade_average ?? "—"}
          </Text>
        </View>

        {/* MAIN */}
        <View style={modernStyles.main}>
          {/* About */}
          <View style={modernStyles.block}>
            <View style={modernStyles.mainHeader}>
              <Text style={modernStyles.mainTitle}>เกี่ยวกับฉัน</Text>
            </View>
            <Text style={modernStyles.para}>{props.introduce || "—"}</Text>
          </View>

          {/* Skills */}
          <View style={modernStyles.block}>
            <View style={modernStyles.mainHeader}>
              <Text style={modernStyles.mainTitle}>ทักษะ / ความสามารถ</Text>
            </View>
            {props.skills_details ? (
              <Text style={modernStyles.para}>{props.skills_details}</Text>
            ) : null}
            {props.skills && props.skills.length > 0 && (
              <View style={modernStyles.pillRow}>
                {props.skills.map((s, i) =>
                  s.language ? (
                    <Text key={i} style={modernStyles.pill}>
                      {s.language}
                    </Text>
                  ) : null
                )}
              </View>
            )}
            {props.others_skills && (
              <Text style={[modernStyles.para, { marginTop: 4 }]}>
                <Text style={{ fontWeight: 700 }}>อื่นๆ: </Text>
                {props.others_skills}
              </Text>
            )}
          </View>

          {/* Activities */}
          {props.activities && props.activities.length > 0 && (
            <View style={modernStyles.block}>
              <View style={modernStyles.mainHeader}>
                <Text style={modernStyles.mainTitle}>กิจกรรม / เกียรติบัตร</Text>
              </View>
              {props.activities.map((a, idx) => (
                <View key={idx} style={modernStyles.activityCard}>
                  <View style={{ flexDirection: "row" }}>
                    {a.photos && a.photos[0] ? (
                      <Image src={a.photos[0]} style={modernStyles.activityImg} />
                    ) : null}
                    <View style={{ flex: 1 }}>
                      <Text style={[modernStyles.para, { fontWeight: 700, color: M.primary }]}>
                        {a.name_project || "—"}
                      </Text>
                      <Text style={[modernStyles.para, { color: M.muted, fontSize: 9 }]}>
                        {a.date || "—"}
                      </Text>
                      {a.description ? (
                        <Text style={modernStyles.para}>{a.description}</Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* University */}
          <View style={modernStyles.block}>
            <View style={modernStyles.mainHeader}>
              <Text style={modernStyles.mainTitle}>มหาวิทยาลัยที่ต้องการ</Text>
            </View>
            <Text style={modernStyles.para}>
              <Text style={{ fontWeight: 700 }}>มหาวิทยาลัย: </Text>
              {props.university || "—"}
            </Text>
            <Text style={modernStyles.para}>
              <Text style={{ fontWeight: 700 }}>คณะ: </Text>
              {props.faculty || "—"}
            </Text>
            <Text style={modernStyles.para}>
              <Text style={{ fontWeight: 700 }}>สาขา: </Text>
              {props.major || "—"}
            </Text>
            {props.reason && (
              <Text style={modernStyles.para}>
                <Text style={{ fontWeight: 700 }}>เหตุผล: </Text>
                {props.reason}
              </Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};