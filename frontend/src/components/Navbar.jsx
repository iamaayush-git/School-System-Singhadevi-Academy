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
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Side menu */}
            <motion.div
              className="fixed top-0 right-0 w-3/4 h-full bg-white/80 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center gap-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <MobileItem to="/" label="Home" setOpen={setOpen} />
              <MobileItem to="/about" label="About" setOpen={setOpen} />
              <MobileItem to="/admission" label="Admission" setOpen={setOpen} />
              <MobileItem to="/contact" label="Contact" setOpen={setOpen} />
              {token && <MobileItem to="/admin-dashboard" label="Admin Dashboard" setOpen={setOpen} />}


              {/* Login Button */}
              {token ? (
                <button onClick={() => (setOpen(false), handleLogout())} className="px-6 py-2 bg-red-500 text-white rounded-lg">
                  Logout
                </button>
              ) : (<Link onClick={() => (setOpen(false))} to={"/admin-login"}>
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg">
                  Admin Login
                </button>
              </Link>)}
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
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className="border-b border-yellow-800 px-3 py-1 text-xl font-medium hover:text-yellow-500 transition"
      >
        {label}
      </Link>
    </motion.div>
  );
}