export type NavItem = {
    label: string;
    path: string;
  };
  
  export const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Browse", path: "/motorcycles" },
    { label: "Compare", path: "/compare" },
    { label: "Submit Request", path: "/submit" },
    { label: "About", path: "/about" }
  ];
  