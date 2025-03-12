"use client";
import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }) => {
  const pathname = usePathname();
  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
};

export default NavLink;
