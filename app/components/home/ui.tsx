import Image from "next/image";
import logo from "@/app/logo/logo.png";

export function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
    >
      {children}
    </svg>
  );
}

export function Eyebrow({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[12px] font-bold tracking-[3px] uppercase mb-4 ${className}`}
    >
      {children}
    </p>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="David Piano Academy"
      width={220}
      height={56}
      priority
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}