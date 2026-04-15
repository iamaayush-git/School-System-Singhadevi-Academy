import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md overflow-x-hidden">

      {/* TOP BAR (3 COLUMN LAYOUT) */}
      <div className="px-4 sm:px-6 py-5 md:py-7 flex items-center">

        {/* LEFT - LOGO */}
        <div className="flex md:flex-col md:items-start items-center gap-3 flex-1 min-w-0">
          <img
            src={logo}
            alt="Logo"
            className="h-11 w-11 md:h-14 md:w-14 rounded-full object-cover flex-shrink-0"
          />

          <h1 className="text-sm md:text-base font-bold text-wrap">
            Shree Singhadevi Academy
          </h1>
        </div>

        {/* CENTER - NAV ITEMS */}
        <ul className="hidden md:flex flex-1 justify-center gap-6 lg:gap-7 font-sm">
          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem to="/about" label="About" active={location.pathname === "/about"} />
          <NavItem to="/admission" label="Admission" active={location.pathname === "/admission"} />
          <NavItem to="/gallery" label="Gallery" active={location.pathname === "/gallery"} />
          <NavItem to="/contact" label="Contact" active={location.pathname === "/contact"} />
          {token && (
            <NavItem
              to="/admin-dashboard"
              label="Dashboard"
              active={location.pathname === "/admin-dashboard"}
            />
          )}
        </ul>

        {/* RIGHT - LOGIN */}
        <div className="hidden md:flex flex-1 justify-end">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 lg:px-4 py-2 text-sm lg:text-base bg-red-500 text-white rounded-lg hover:bg-gray-800 transition whitespace-nowrap"
            >
              Logout
            </button>
          ) : (
            <Link to="/admin-login">
              <button className="cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base bg-orange-500 text-white rounded-lg hover:bg-orange-800 transition whitespace-nowrap">
                Admin Login
              </button>
            </Link>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xl"
          >
            {open ? "✕" : "☰"}
          </motion.div>
        </button>
      </div>

      {/* TOP LINE */}
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
            <motion.div
              className="fixed inset-0 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 w-[80%] max-w-xs h-full bg-white shadow-2xl p-6 flex flex-col md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* LOGO */}
              <div className="flex items-center gap-2 mb-6">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h1 className="text-sm font-medium">
                  Shree Singhadevi Academy
                </h1>
              </div>

              {/* MENU */}
              <div className="flex flex-col gap-5 text-lg">
                <MobileItem to="/" label="Home" setOpen={setOpen} />
                <MobileItem to="/about" label="About" setOpen={setOpen} />
                <MobileItem to="/admission" label="Admission" setOpen={setOpen} />
                <MobileItem to="/gallery" label="Gallery" setOpen={setOpen} />
                <MobileItem to="/contact" label="Contact" setOpen={setOpen} />
                {token && (
                  <MobileItem
                    to="/admin-dashboard"
                    label="Dashboard"
                    setOpen={setOpen}
                  />
                )}
                {/* {token && (
                  <MobileItem
                    to="/admin-gallery"
                    label="Admin Gallery"
                    setOpen={setOpen}
                  />
                )} */}
              </div>

              {/* BUTTON */}
              <div className="mt-auto">
                {token ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
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

/* NAV ITEM */
function NavItem({ to, label, active }) {
  return (
    <li className="text-sm md:text-lg lg:text-xl relative group whitespace-nowrap">
      <Link
        to={to}
        className={`transition ${active ? "text-yellow-500" : "hover:text-yellow-500"
          }`}
      >
        {label}
      </Link>

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-400 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />
    </li>
  );
}

/* MOBILE ITEM */
function MobileItem({ to, label, setOpen }) {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
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