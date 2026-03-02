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

}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Kanit'
  },

  container: {
    flexDirection: 'row',
    height: '100%'
  },

  /* Sidebar */
  sidebar: {
    width: '35%',
    backgroundColor: '#2f3e75',
    padding: 20,
    color: 'white'
  },

  profileImage: {
    width: 120,
    height: 140,
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
    fontSize: 14,
    lineHeight: 1.8
  }
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
  personal_image
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
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.paragraph}>{introduce}</Text>
          </View>

        </View>

      </View>

    </Page>
  </Document>
);