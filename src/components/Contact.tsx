// Contact.tsx — Reusable footer used across multiple pages.
// Imports its own stylesheet so any page can drop it in without extra setup.

import "./css/contact.css";

const Contact = () => (
    <footer className="dl-footer">
        <div className="dl-footer-inner">
            <div className="dl-footer-grid">
                <div>
                    <h3>Contact Us</h3>
                    <p>If you have any questions or need assistance, please reach out:</p>
                    <ul className="dl-footer-links">
                        <li>📧 support@example.com</li>
                        <li>📞 (123) 456-7890</li>
                    </ul>
                </div>
                <div>
                    <h3>ข่าวสาร (News)</h3>
                    <p>ติดตามข่าวสารล่าสุดและอัปเดตจากเราได้ที่ช่องทางโซเชียลมีเดียของเรา:</p>
                    <ul className="dl-footer-links">
                        <li>Facebook: facebook.com/ourpage</li>
                    </ul>
                </div>
                <div>
                    <h3>ร่วมงานกับเรา (Join Us)</h3>
                    <p>หากคุณสนใจที่จะร่วมงานกับเรา กรุณาส่งประวัติย่อของคุณมาที่:</p>
                    <ul className="dl-footer-links">
                        <li>📧 careers@example.com</li>
                    </ul>
                </div>
            </div>
            <div className="dl-footer-bottom">
                <span>© 2024 Daily Life. All rights reserved.</span>
                <div className="dl-footer-bottom-links">
                    <span>Help Center</span>
                    <span>Partner with Us</span>
                    <span>Pricing</span>
                    <span>Terms of Service</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    </footer>
);

export default Contact;
