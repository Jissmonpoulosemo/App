import { WHATSAPP_NUMBER } from "./constants";

export const sendWhatsAppEnquiry = (packageName, patientName, enquiryType = "package") => {
  const name = patientName && patientName.trim() !== "" ? patientName.trim() : "Guest Patient";
  
  let message = "";
  
  if (enquiryType === "package") {
    message = `Hi! 👋 I'm interested in the ${packageName} package.\n\nMy name: ${name}\n\nCan you please provide more details about the features and pricing?`;
  } else if (enquiryType === "appointment") {
    message = `Hi! 👋 I'd like to book an appointment.\n\nMy name: ${name}\n\nPlease let me know the available slots.`;
  } else if (enquiryType === "consultation") {
    message = `Hi! 👋 I need a medical consultation.\n\nMy name: ${name}\n\nI'm experiencing some symptoms and need medical advice.`;
  } else {
    message = `Hi! 👋 I need assistance with Symptra.\n\nMy name: ${name}`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};