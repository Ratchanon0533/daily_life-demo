import styles from "./css/contact.module.css";

const Contact = () => {
    return (
        <div className={styles["contact-box"]}>
            <div className={styles["contact-content"]}>

                {/* Three-column main section */}
                <div className={styles["contact-columns"]}>
                    {/* Column 1 */}
                    <div className={styles["contact-column"]}>
                        <h3>Contact Us</h3>
                        <p>If you have any questions or need assistance, please reach out to us at:</p>
                        <ul>
                            <li>Email: support@example.com</li>
                            <li>Phone: (123) 456-7890</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className={styles["contact-column"]}>
                        <h3>ข่าวสาร (News)</h3>
                        <p>ติดตามข่าวสารล่าสุดและอัปเดตจากเราได้ที่ช่องทางโซเชียลมีเดียของเรา:</p>
                        <ul>
                            <li>Facebook: facebook.com/ourpage</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className={styles["contact-column"]}>
                        <h3>ร่วมงานกับเรา (Join Us)</h3>
                        <p>หากคุณสนใจที่จะร่วมงานกับเรา กรุณาส่งประวัติย่อของคุณมาที่:</p>
                        <ul>
                            <li>Email: careers@example.com</li>
                        </ul>
                    </div>
                </div>

                {/* Footer section */}
                <div className={styles["contact-footer"]}>
                    <p>Help Center</p>
                    <p>Partner with Us</p>
                    <p>Pricing</p>
                    <p>Terms of Service</p>
                    <p>Privacy Policy</p>
                    <p>© 2024 Our Company. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
};

export default Contact;
