import { cn } from "@/lib/utils";

interface SocialIconProps {
  platform: string;
  className?: string;
}

export function SocialIcons({ platform, className }: SocialIconProps) {
  const base = cn("rounded", className);

  if (platform === "facebook") {
    return (
      <svg className={base} viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg className={base} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5" fill="url(#ig-gradient)" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }

  if (platform === "twitter") {
    return (
      <svg className={base} viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  return <div className={cn("bg-gray-400 rounded", className)} />;
}
