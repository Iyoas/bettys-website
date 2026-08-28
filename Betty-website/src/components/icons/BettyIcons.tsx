import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Icon = ({ size = 24, children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const BridgeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 17h18" />
    <path d="M5 17c1-6 3.5-9 7-9s6 3 7 9" />
    <path d="M8 17v-3M16 17v-3" />
  </Icon>
);
export const ContextIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M4.5 12h15M12 4c2.2 2.1 3.3 4.8 3.3 8S14.2 17.9 12 20c-2.2-2.1-3.3-4.8-3.3-8S9.8 6.1 12 4" />
  </Icon>
);
export const LanguageIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 5h8M8 3v2c0 4-1.8 6.8-4 8" />
    <path d="M5 10c1.2 1.3 2.6 2.3 4.2 3" />
    <path d="M14 8h6M17 5v3c0 4 1.5 7 3 9" />
    <path d="M14 17h6M15.5 13h3" />
  </Icon>
);
export const TrustIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3 19 6v5c0 4.3-3 7.7-7 10-4-2.3-7-5.7-7-10V6l7-3Z" />
    <path d="m8.5 12 2.2 2.2 4.8-5" />
  </Icon>
);
export const GuidanceIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 19c1.2-3.8 3.9-5.7 8-5.7s6.8 1.9 8 5.7" />
    <circle cx="12" cy="7" r="3.5" />
    <path d="M3 11.5h3M18 11.5h3" />
  </Icon>
);
export const TrainingIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 5h16v11H4z" />
    <path d="m9 20 3-4 3 4M8 9h8M8 12h5" />
  </Icon>
);
export const FamilyIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="9" cy="7" r="2.3" />
    <circle cx="16.5" cy="9" r="1.8" />
    <path d="M4.5 19c.5-4 2-6 4.5-6s4 2 4.5 6M14 19c.2-2.7 1.1-4.3 2.8-4.8 1.6.5 2.5 2.1 2.7 4.8" />
  </Icon>
);
export const ResearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 4h14v16H5z" />
    <path d="M8 8h5M8 12h3M14.5 15.5l3 3M15.5 13.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  </Icon>
);
export const EmailIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);
export const WhatsAppIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4A8 8 0 1 1 20 11.5Z" />
    <path d="M9 8.5c.4 2.4 1.9 4 4.4 4.6l1.1-1.1 1.5.7c-.5 1.2-1.2 1.7-2.2 1.5-3.7-.8-5.8-3-6.6-6.6-.2-1 .3-1.8 1.5-2.2l.7 1.5L9 8.5Z" />
  </Icon>
);
export const LinkedInIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 10v6M8 7.5v.1M12 16v-3.4c0-1.7 1-2.6 2.2-2.6s1.8.9 1.8 2.6V16" />
  </Icon>
);
