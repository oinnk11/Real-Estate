import { useEffect, useRef, useState } from "react";

const DropdownMenu = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button onClick={() => setOpen((prev) => !prev)}>{trigger}</button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md p-1 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
