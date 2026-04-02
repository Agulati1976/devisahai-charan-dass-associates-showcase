import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919217585619"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
