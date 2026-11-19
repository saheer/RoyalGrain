// Shared between components/ContactForm.tsx (client) and app/actions/enquiry.ts (server).

// The options of the "Type of Enquiry" dropdown. To add one, add a line here: the form,
// the validation and the email subject all read from this list. `value` is a short,
// stable ID (never change it once in use); `label` is what visitors see.
export const ENQUIRY_TYPES = [
  { value: "main-doors-entrance", label: "Main Doors & Entrance" },
  { value: "custom-furniture", label: "Custom Teakwood Furniture (Beds, Tables)" },
  { value: "wooden-unjal", label: "Traditional Wooden Unjal (Swing)" },
  { value: "full-home-interiors", label: "Full Home Interiors" },
  { value: "general-enquiry", label: "General Enquiry" },
] as const;

// Selected when the form first opens
export const DEFAULT_ENQUIRY_TYPE = "general-enquiry";

export type EnquiryValues = {
  name: string;
  location: string; // city / town of the project, e.g. Kochi
  email: string;
  phone: string;
  type: string;
  message: string;
};

export type EnquiryField = keyof EnquiryValues | "captcha";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<EnquiryField, string>>;
  // Sent back so the form keeps what the visitor typed after an error
  values: EnquiryValues;
};

export const EMPTY_VALUES: EnquiryValues = {
  name: "",
  location: "",
  email: "",
  phone: "",
  type: DEFAULT_ENQUIRY_TYPE,
  message: "",
};

export const INITIAL_ENQUIRY_STATE: EnquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_VALUES,
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: 100,
  location: 100,
  email: 254,
  message: 5000,
} as const;

// Shown until the fields are filled in Sanity
export const DEFAULT_CONTACT_HEADING = "Have an Enquiry?";
export const DEFAULT_CONTACT_DESCRIPTION =
  "Planning a custom piece or a complete interior? Tell us about your space and we will get back to you shortly.";
export const DEFAULT_GENERAL_EMAIL = "hello@royalgrain.com";
export const DEFAULT_BOOKING_EMAIL = "bookings@royalgrain.com";
// Placeholders until the real numbers are entered in Studio (Contact Us > Phone / WhatsApp).
// While a number is a placeholder it is shown as plain text, not as a link.
export const DEFAULT_PHONE = "+91 XXXXX XXXXX";
export const DEFAULT_WHATSAPP = "+91 XXXXX XXXXX";
// One line per row; editable in Studio (Contact Us > Address).
export const DEFAULT_ADDRESS = [
  "Royal Grain Woodcraft & Interiors",
  "Puthentheru, Tanur",
  "Malappuram, Kerala, India - 676302",
].join("\n");