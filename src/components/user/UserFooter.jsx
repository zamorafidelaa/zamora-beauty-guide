import { MessageCircleHeart, Instagram, Facebook } from "lucide-react";

function UserFooter() {
  return (
    <footer className="bg-gradient-to-r from-white to-pink-50 text-gray-700 py-10 mt-auto shadow-inner">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left */}
        <div>
          <h4 className="text-xl font-bold text-pink-600">Zamora Beauty Guide</h4>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Your ultimate guide to skincare and beauty products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-pink-600">Quick Links</h4>
          <ul className="mt-3 space-y-2">
            <li><a href="/home" className="hover:text-pink-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-pink-600 transition">About Us</a></li>
            <li><a href="/consultation" className="hover:text-pink-600 transition">Consultation</a></li>
            <li><a href="/product" className="hover:text-pink-600 transition">Product</a></li>
            <li><a href="/profile" className="hover:text-pink-600 transition">Profile</a></li>
          </ul>
        </div>

        {/* Right / Social */}
        <div>
          <h4 className="text-lg font-semibold text-pink-600">Follow Us</h4>
          <div className="flex space-x-5 mt-3">
            <a
              href="https://www.facebook.com/morafidela?mibextid=ZbWKwL"
              target="_blank"
              className="p-2 rounded-full bg-pink-100 shadow hover:bg-pink-200 transition"
            >
              <Facebook className="w-5 h-5 text-pink-700" />
            </a>
            <a
              href="https://www.instagram.com/fi.moriii/"
              target="_blank"
              className="p-2 rounded-full bg-pink-100 shadow hover:bg-pink-200 transition"
            >
              <Instagram className="w-5 h-5 text-pink-700" />
            </a>
            <a
              href="https://wa.me/087763323044"
              target="_blank"
              className="p-2 rounded-full bg-pink-100 shadow hover:bg-pink-200 transition"
            >
              <MessageCircleHeart className="w-5 h-5 text-pink-700" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-pink-200 mt-10 pt-5 text-center text-sm text-gray-500">
        © 2024 Zamora Beauty Guide. All rights reserved.
      </div>
    </footer>
  );
}

export default UserFooter;
