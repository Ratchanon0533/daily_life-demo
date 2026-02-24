import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Required for Thai language support
Font.register({
  family: 'Kanit',
  src: 'https://cdn.jsdelivr.net/gh/google/fonts@master/ofl/kanit/Kanit-Regular.ttf',
});

interface PDFProps {
  introduce: string;
  first_name?: string;
  last_name?: string;
  prefix?: string;
  birth_day?: number;
  birth_month?: string;
  birth_year?: number;
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
  height?: string;
  weight?: string;
  gender?: string;
  marital_status?: string;
  disability?: string;
  military_status?: string;
  personal_image?: string | null;

  skills_details?: string | null;
  language_skill?: string;
  listening_skill?: string;
  speaking_skill?: string;
  reading_skill?: string;
  writing_skill?: string;
  others_skills?: string | null;

  university?: string;
  faculty?: string;
  major?: string;
  reason?: string | null;

  school?: string;
  graduation?: string;
  educational_qualifications?: string;
  province_edu?: string;
  district_edu?: string;
  study_path?: string;
  grade_average?: string | number;
  study_results?: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Kanit'
  },

  container: {
    flexDirection: 'row',
    height: '100%'
  },

  sidebar: {
    width: '35%',
    backgroundColor: '#2f3e75',
    padding: 20,
    color: 'white'
  },

  profileImage: {
    width: 160,
    height: 180,
    marginBottom: 20,
    alignSelf: 'center'
  },

  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#ffffff'
  },

  sidebarText: {
    fontSize: 12,
    marginBottom: 4,
    color: '#ffffff'
  },

  /* Main Content */
  mainContent: {
    width: '65%',
    padding: 30
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10
  },

  address: {
    fontSize: 12,
    marginBottom: 20,
    color: '#666'
  },

  section: {
    marginTop: 10
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.8
  },

  // education
  modernHeader: {
    marginBottom: 10,
  },

  divider: {
    height: 2,
    backgroundColor: "#222",
    marginTop: 4,
    width: "40%",
  },

  educationCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },

  schoolName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  educationLevel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
  },

  studyPath: {
    fontSize: 11,
    marginBottom: 4,
  },

  location: {
    fontSize: 11,
    color: "#777",
    marginBottom: 10,
  },

  gpaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  gpaLabel: {
    fontSize: 11,
    marginRight: 6,
    color: "#444",
  },

  gpaValue: {
    fontSize: 14,
    fontWeight: "bold",
  },

  highlightBox: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 5,
    marginTop: 6,
  },

  highlightText: {
    fontSize: 11,
  },
});

export const PortfolioPDF: React.FC<PDFProps> = ({
  introduce,
  first_name,
  last_name,
  prefix,
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
  height,
  weight,
  gender,
  marital_status,
  disability,
  military_status,
  personal_image,

  skills_details,
  language_skill,
  listening_skill,
  speaking_skill,
  reading_skill,
  writing_skill,
  others_skills,

  university,
  faculty,
  major,
  reason,

  school,
  graduation,
  educational_qualifications,
  province_edu,
  district_edu,
  study_path,
  grade_average,
  study_results

}) => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={styles.container}>

        {/*  LEFT SIDEBAR */}
        <View style={styles.sidebar}>

          {personal_image && (
            <Image src={personal_image} style={styles.profileImage} />
          )}

          <Text style={styles.sidebarTitle}>ข้อมูลติดต่อ</Text>
          <Text style={styles.sidebarText}>{email}</Text>
          <Text style={styles.sidebarText}>{phonenumber1}</Text>
          <Text style={styles.sidebarText}>{phonenumber2}</Text>

          <Text style={styles.sidebarTitle}>ข้อมูลส่วนตัว</Text>
          <Text style={styles.sidebarText}>
            วันเกิด: {birth_day} {birth_month} {birth_year}
          </Text>
          <Text style={styles.sidebarText}>สัญชาติ: {nationality}</Text>
          <Text style={styles.sidebarText}>เลขบัตร: {id_card}</Text>
          <Text style={styles.sidebarText}>เพศ: {gender}</Text>
          <Text style={styles.sidebarText}>ส่วนสูง: {height} ซม.</Text>
          <Text style={styles.sidebarText}>น้ำหนัก: {weight} กก.</Text>
          <Text style={styles.sidebarText}>สถานภาพ: {marital_status}</Text>
          <Text style={styles.sidebarText}>ความพิการ: {disability}</Text>
          <Text style={styles.sidebarText}>สถานะทหาร: {military_status}</Text>

        </View>

        {/*  RIGHT CONTENT */}
        <View style={styles.mainContent}>

          <Text style={styles.name}>
            {prefix} {first_name} {last_name}
          </Text>

          <Text style={styles.address}>
            {address} {subdistrict} {district} {province} {postal_code}
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>แนะนำตัวว</Text>
            <Text style={styles.paragraph}>{introduce}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ทักษะความรู้ตามสาขาวิชา</Text>
            <Text style={styles.paragraph}>{skills_details}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ทักษะด้านภาษา</Text>
            <Text style={styles.paragraph}>ภาษา{language_skill}</Text>
            <Text style={styles.paragraph}>การฟัง (Listening): {listening_skill}</Text>
            <Text style={styles.paragraph}>การพูด (Speaking): {speaking_skill}</Text>
            <Text style={styles.paragraph}>การอ่าน (Reading): {reading_skill}</Text>
            <Text style={styles.paragraph}>การเขียน (Writing): {writing_skill}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ทักษะอื่นๆ</Text>
            <Text style={styles.paragraph}>{others_skills}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>อยากเรียนต่อที่ไหน</Text>
            <Text style={styles.paragraph}>มหาวิทยาลัย: {university}</Text>
            <Text style={styles.paragraph}>คณะ: {faculty}</Text>
            <Text style={styles.paragraph}>สาขา: {major}</Text>
            <Text style={styles.paragraph}>{reason}</Text>
          </View>

        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.mainContent}>

        {/* SECTION TITLE */}
        <View style={styles.modernHeader}>
          <Text style={styles.sectionTitle}>ประวัติการศึกษา</Text>
          <View style={styles.divider} />
        </View>

        {/* EDUCATION CARD */}
        <View style={styles.educationCard}>

          <Text style={styles.schoolName}>{school}</Text>

          <Text style={styles.educationLevel}>
            {educational_qualifications} • {graduation}
          </Text>

          <Text style={styles.studyPath}>
            แผนการเรียน: {study_path}
          </Text>

          <Text style={styles.location}>
            {district_edu}, {province_edu}
          </Text>

          <View style={styles.gpaContainer}>
            <Text style={styles.gpaLabel}>GPA</Text>
            <Text style={styles.gpaValue}>{grade_average}</Text>
          </View>

          {study_results && (
            <View style={styles.highlightBox}>
              <Text style={styles.highlightText}>
                {study_results}
              </Text>
            </View>
          )}

        </View>

      </View>
    </Page>
  </Document>
);