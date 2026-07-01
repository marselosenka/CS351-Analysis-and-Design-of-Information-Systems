import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { clearAuthUser, readAuthUser, AuthUser } from "../../lib/auth";
import navstyles from "../../styles/navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const links = [
    { href: "/home", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/create", label: "Create" },
  ];

  useEffect(() => {
    const syncAuth = () => setAuthUser(readAuthUser());
    syncAuth();

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const displayName = useMemo(
    () => authUser?.name || authUser?.username || authUser?.email || "Guest",
    [authUser]
  );

  const handleLogout = () => {
    clearAuthUser();
    setAuthUser(null);
    router.push("/home");
  };

  return (
    <nav className={navstyles.navbar}>
      <div className={navstyles.navInner}>
        <Link href="/home" className={navstyles.navLogo}>
          eSports System
        </Link>
        <div className={navstyles.navLinks}>
          {links.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${navstyles.navLink} ${
                  isActive ? navstyles.navLinkActive : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className={navstyles.navActions}>
          <button type="button" className={navstyles.iconButton} aria-label="Notifications">
            <Image src="/img/notification.png" alt="" width={22} height={22} />
          </button>
          {authUser ? (
            <>
              <span className={navstyles.userChip}>{displayName}</span>
              <button type="button" className={navstyles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" className={navstyles.iconButton} aria-label="Profile">
              <Image src="/img/profile.png" alt="" width={22} height={22} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
