import { FaFacebook, FaTwitter, FaLinkedin, FaHeartbeat } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FaHeartbeat className="text-red-500 text-2xl" />
            <span className="text-xl font-bold text-white">MediCall</span>
          </div>
          <p className="text-sm">
            Your trusted platform for booking doctor appointments anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-red-500">Home</a></li>
            <li><a href="/doctors" className="hover:text-red-500">Doctors</a></li>
            <li><a href="/appointments" className="hover:text-red-500">Appointments</a></li>
            <li><a href="/about" className="hover:text-red-500">About</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📞 +880 123 456 789</p>
          <p className="text-sm">📧 support@medicall.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-red-500"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-red-500"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-red-500"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MediCall. All rights reserved.
      </div>
    </footer>
  )
}
