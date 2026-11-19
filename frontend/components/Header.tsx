import HeaderClient from "@/components/HeaderClient";

// Pages keep using <Header /> exactly as before. The navigation is a plain list
// of direct links (no dropdowns), so there is nothing to fetch from Sanity here.
export default function Header() {
  return <HeaderClient />;
}
