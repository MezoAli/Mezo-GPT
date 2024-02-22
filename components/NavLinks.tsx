"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { name: "Chat", path: "/chat" },
  { name: "Tours", path: "/tours" },
  { name: "New Tour", path: "/tours/new-tour" },
  { name: "Profile", path: "/profile" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="menu text-base-content gap-4">
      {LINKS.map((link) => {
        const active = pathname === link.path || pathname.includes(link.path);
        return (
          <li key={link.name}>
            <Link
              href={link.path}
              className={`btn btn-ghost w-full ${
                active ? "btn-active font-bold" : undefined
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
