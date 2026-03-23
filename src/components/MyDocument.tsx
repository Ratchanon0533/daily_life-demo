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
  profileImage: { width: 170, height: 200, objectFit: "cover" as any, margin: "0 auto", marginTop: 10 },

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
    objectFit: "cover" as any,


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

              {/* มหาวิทยาลัย */}
              {hasUni && (
                <View style={styles.section}>
                  <SectionTitle label="มหาวิทยาลัยที่สนใจ" />
                  <View style={styles.infoGrid}>
                    <InfoCell label="มหาวิทยาลัย" value={university} />
                    <InfoCell label="คณะ" value={faculty} />
                    <InfoCell label="สาขา" value={major} />
                  </View>
                  {reason && (
                    <Text style={[styles.para, { marginTop: 4 }]}>
                      เหตุผล: {reason}
                    </Text>
                  )}
                </View>
              )}

              {/* ✅ กิจกรรม — แต่ละ card มีรูปของตัวเองแยกกัน */}


            </View>
          </View>
        </View>
      </Page>

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

      <Page size="A4" style={styles.page} wrap>
        {study_results && (
          <View style={[styles.section, { marginTop: 26, paddingHorizontal: 26 }]}>
            <SectionTitle label="เอกสารผลการเรียน" />

            <Image
              src={study_results} 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                border: '1pt solid #eeeeee'
              }}
            />

          </View>
        )}
      </Page>

    </Document>
  );
};