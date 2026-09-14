import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "2348032461305"; // Remove + for WhatsApp API
  const message = "Hello Friscon Tech, I'd like to inquire about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
