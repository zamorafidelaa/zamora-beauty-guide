function UserFooter() {
  return (
    <footer className="user-footer">
      <div className="footer-container">
        <div className="footer-left">
          <h4>Zamora Beauty Guide</h4>
          <p>Your ultimate guide to skincare and beauty products.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/consultation">Consultation</a></li>
            <li><a href="/product">Product</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/morafidela?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/fi.moriii/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/087763323044" target="_blank" rel="noopener noreferrer">Whatsapp</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Zamora Beauty Guide. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default UserFooter;
