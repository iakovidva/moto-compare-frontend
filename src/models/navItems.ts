export type NavItem = {
    label: string;
    path: string;
  };
  
  export const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Compare", path: "/compare" },
    { label: "Motorcycles", path: "/motorcycles" },
    { label: "About", path: "/about" },
    { label: "Submit Request", path: "/submit" },
    { label: "Open Requests", path: "/requests"},
    { label: "Create motorcycle", path: "/motorcycles/create" },
  ];
  