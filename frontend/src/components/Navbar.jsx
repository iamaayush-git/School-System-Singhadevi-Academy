import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin-login");
  };

  const toggleMenu = () => setOpen(!open);


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      {/* Top bar */}
      <div className="px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">My School</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">

          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem to="/about" label="About" active={location.pathname === "/about"} />
          <NavItem to="/admission" label="Admission" active={location.pathname === "/admission"} />
          <NavItem to="/contact" label="Contact" active={location.pathname === "/contact"} />
          {token && <NavItem to="/admin-dashboard" label="Admin Dashboard" active={location.pathname === "/admin-dashboard"} />}

        </ul>

        {/* Login Button */}
        {token ? (
          <button onClick={handleLogout} className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-800 transition">
            Logout
          </button>
        ) : (<Link to={"/admin-login"}>
          <button className="cursor-pointer hidden md:block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-800 transition">
            Admin Login
          </button>
        </Link>)}

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden z-50 w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xl leading-none"
          >
            {open ? "✕" : "☰"}
          </motion.div>
        </button>
      </div>

      {/* Yellow top line */}
      <motion.div
        className="h-[3px] bg-yellow-400 w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        style={{ originX: 0 }}
      />

      {/* MOBILE MENU */}
      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 w-[80%] max-w-xs h-full bg-white shadow-2xl p-6 flex flex-col md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* Logo */}
              <h2 className="text-xl font-bold mb-8">My School</h2>

              {/* Menu Items */}
              <div className="flex flex-col gap-5 text-lg">
                <MobileItem to="/" label="Home" setOpen={setOpen} />
                <MobileItem to="/about" label="About" setOpen={setOpen} />
                <MobileItem to="/admission" label="Admission" setOpen={setOpen} />
                <MobileItem to="/contact" label="Contact" setOpen={setOpen} />
                {token && (
                  <MobileItem to="/admin-dashboard" label="Admin Dashboard" setOpen={setOpen} />
                )}
              </div>

              {/* Bottom Button */}
              <div className="mt-auto">
                {token ? (
                  <button
                    onClick={() => (setOpen(false), handleLogout())}
                    className="w-full py-2 bg-red-500 text-white rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/admin-login" onClick={() => setOpen(false)}>
                    <button className="w-full py-2 bg-orange-500 text-white rounded-lg">
                      Admin Login
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
// desktop
function NavItem({ to, label, active }) {
  return (
    <li className="relative group">
      <Link
        to={to}
        className={`transition ${active ? "text-yellow-500" : "hover:text-yellow-500"
          }`}
      >
        {label}
      </Link>

      {/* underline */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-400 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />
    </li>
  );
}

//mobile
function MobileItem({ to, label, setOpen }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className="block py-2 border-b border-gray-200 hover:text-yellow-500 transition"
      >
        {label}
      </Link>
    </motion.div>
  );
}