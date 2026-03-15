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

/* ---------- Font (Thai) — ใช้ไฟล์ local เท่านั้น ---------- */
Font.register({
  family: "Kanit",
  fonts: [
    {
      src: "/fonts/Kanit-Regular.ttf",   // ✅ local file
      fontWeight: 400,
    },
    {
      src: "/fonts/Kanit-Bold.ttf",      // ✅ local file
      fontWeight: 700,
    },
  ],
});

/* ---------- PDF Props ---------- */
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

  language_skill?: string;
  listening_skill?: string;
  speaking_skill?: string;
  reading_skill?: string;
  writing_skill?: string;

  university?: string;
  faculty?: string;
  major?: string;
  reason?: string;

  school?: string;
  graduation?: string;
  educational_qualifications?: string;
  study_path?: string;
  grade_average?: string | number;

  activity_photos?: string[];
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  page: { fontFamily: "Kanit" },

  container: { flexDirection: "row", height: "100%" },

  sidebar: {
    width: "35%",
    backgroundColor: "#2f3e75",
    padding: 20,
    color: "#fff",
  },
  profileImage: {
    width: 120,
    height: 140,
    marginBottom: 20,
    alignSelf: "center",
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 15,
    marginBottom: 8,
    color: "#fff",
  },
  sidebarText: { fontSize: 12, marginBottom: 4, color: "#fff" },

  mainContent: { width: "65%", padding: 30 },
  name: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  address: { fontSize: 12, marginBottom: 20, color: "#666" },

  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  paragraph: { fontSize: 14, lineHeight: 1.8 },

  photoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  photoItem: {
    width: 120,
    height: 80,
    margin: 2,
    objectFit: "cover" as any,
  },
});

/* ---------- PDF Component ---------- */
export const PortfolioPDF: React.FC<PDFProps> = ({
  introduce,
  prefix,
  first_name,
  last_name,
  birth_day,
  birth_month,
  birth_year,
  nationality,
  id_card,
  phonenumber1,
  phonenumber2,
  email,
  address,
  province,
  district,
  subdistrict,
  postal_code,
  gender,
  height,
  weight,
  personal_image,
  language_skill,
  listening_skill,
  speaking_skill,
  reading_skill,
  writing_skill,
  university,
  faculty,
  major,
  reason,
  school,
  graduation,
  educational_qualifications,
  study_path,
  grade_average,
  activity_photos,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>

        {/* ---------- LEFT SIDEBAR ---------- */}
        <View style={styles.sidebar}>
          {personal_image && (
            <Image src={personal_image} style={styles.profileImage} />
          )}

          <Text style={styles.sidebarTitle}>ข้อมูลติดต่อ</Text>
          {email && <Text style={styles.sidebarText}>{email}</Text>}
          {phonenumber1 && (
            <Text style={styles.sidebarText}>{phonenumber1}</Text>
          )}
          {phonenumber2 && (
            <Text style={styles.sidebarText}>{phonenumber2}</Text>
          )}

          <Text style={styles.sidebarTitle}>ข้อมูลส่วนตัว</Text>
          {(birth_day || birth_month || birth_year) && (
            <Text style={styles.sidebarText}>
              วันเกิด: {birth_day} {birth_month} {birth_year}
            </Text>
          )}
          {nationality && (
            <Text style={styles.sidebarText}>สัญชาติ: {nationality}</Text>
          )}
          {id_card && (
            <Text style={styles.sidebarText}>เลขบัตร: {id_card}</Text>
          )}
          {gender && (
            <Text style={styles.sidebarText}>เพศ: {gender}</Text>
          )}
          {height && (
            <Text style={styles.sidebarText}>ส่วนสูง: {height} ซม.</Text>
          )}
          {weight && (
            <Text style={styles.sidebarText}>น้ำหนัก: {weight} กก.</Text>
          )}

          {(language_skill ||
            listening_skill ||
            speaking_skill ||
            reading_skill ||
            writing_skill) && (
            <>
              <Text style={styles.sidebarTitle}>ทักษะภาษา</Text>
              {language_skill && (
                <Text style={styles.sidebarText}>ภาษา: {language_skill}</Text>
              )}
              {listening_skill && (
                <Text style={styles.sidebarText}>การฟัง: {listening_skill}</Text>
              )}
              {speaking_skill && (
                <Text style={styles.sidebarText}>การพูด: {speaking_skill}</Text>
              )}
              {reading_skill && (
                <Text style={styles.sidebarText}>การอ่าน: {reading_skill}</Text>
              )}
              {writing_skill && (
                <Text style={styles.sidebarText}>การเขียน: {writing_skill}</Text>
              )}
            </>
          )}
        </View>

        {/* ---------- RIGHT MAIN CONTENT ---------- */}
        <View style={styles.mainContent}>
          <Text style={styles.name}>
            {prefix} {first_name} {last_name}
          </Text>

          <Text style={styles.address}>
            {address} {subdistrict} {district} {province} {postal_code}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.paragraph}>{introduce}</Text>
          </View>

          {(school ||
            graduation ||
            educational_qualifications ||
            study_path ||
            grade_average) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>การศึกษา</Text>
              {school && (
                <Text style={styles.paragraph}>สถาบัน: {school}</Text>
              )}
              {graduation && (
                <Text style={styles.paragraph}>
                  สำเร็จการศึกษา: {graduation}
                </Text>
              )}
              {educational_qualifications && (
                <Text style={styles.paragraph}>
                  วุฒิการศึกษา: {educational_qualifications}
                </Text>
              )}
              {study_path && (
                <Text style={styles.paragraph}>เส้นทาง: {study_path}</Text>
              )}
              {grade_average && (
                <Text style={styles.paragraph}>
                  เกรดเฉลี่ย: {grade_average}
                </Text>
              )}
            </View>
          )}

          {(university || faculty || major) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>มหาวิทยาลัยที่สนใจ</Text>
              {university && (
                <Text style={styles.paragraph}>
                  มหาวิทยาลัย: {university}
                </Text>
              )}
              {faculty && (
                <Text style={styles.paragraph}>คณะ: {faculty}</Text>
              )}
              {major && (
                <Text style={styles.paragraph}>สาขา: {major}</Text>
              )}
              {reason && (
                <Text style={styles.paragraph}>เหตุผล: {reason}</Text>
              )}
            </View>
          )}

          {activity_photos && activity_photos.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>กิจกรรม / ใบรับรอง</Text>
              <View style={styles.photoGrid}>
                {activity_photos.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    style={styles.photoItem}
                    cache={true}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);
