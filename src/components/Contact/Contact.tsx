"use client";

import { SectionWrapper } from "@/hoc";
import { slideIn } from "@/utils/motion";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Contact.module.scss";

const Contact = () => {
  const t = useTranslations("Contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Enlaces a redes sociales
  const socialLinks = [
    { id: 'linkedin', icon: <Linkedin size={22} />, label: 'LinkedIn', url: 'https://linkedin.com/in/andrés-torres-sánchez-3ba367353', color: '#0077B5' },
    { id: 'github', icon: <Github size={22} />, label: 'GitHub', url: 'https://github.com/atorress91', color: '#333' },
    { id: 'instagram', icon: <Instagram size={22} />, label: 'Instagram', url: 'https://instagram.com/axts78', color: '#E1306C' },
    { id: 'whatsapp', icon: <Phone size={22} />, label: 'WhatsApp', url: 'https://wa.me/50683010150', color: '#25D366' },
    { id: 'email', icon: <Mail size={22} />, label: 'Email', url: 'mailto:andres91411@gmail.com', color: '#6B46C1' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading(t("sendingMessage") || "Enviando mensaje...");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          to_name: "Andres Torres",
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          toast.dismiss(loadingToast);
          toast.success(t("successMessage") || "Gracias por comunicarse, pronto estaremos en contacto", {
            duration: 5000,
            icon: '👋',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });

          setLoading(false);
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          toast.dismiss(loadingToast);
          toast.error(t("errorMessage") || "Por favor intente de nuevo.", {
            duration: 4000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });

          setLoading(false);
          console.error(error);
        }
      );
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      variants={slideIn("up", "tween", 0.2, 1)}
      className={`container ${styles.contactContainer}`}
    >
      {/* Toaster para notificaciones */}
      <Toaster position="top-center" toastOptions={{
        className: '',
        style: {
          zIndex: 9999,
        },
      }} />

      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className={`${styles.formContainer} p-4 p-md-5`}>
            <div className="text-center mb-4">
              <p className={`${styles.sectionSubText}`}>
                {t("subtitle") || "Get in touch"}
              </p>
              <h3 className={`${styles.sectionHeadText} mb-3`}>
                {t("title") || "Contact."}
              </h3>

              {/* Iconos de redes sociales */}
              <div className={`d-flex justify-content-center gap-3 mb-4 ${styles.socialIcons}`}>
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${styles["social_" + social.id]}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className={styles.socialTooltip}>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={`mb-2 ${styles.formLabel}`}>
                        {t("nameLabel") || "Your Name"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t("placeholderName")}
                        className={`form-control ${styles.customInput}`}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className={`mb-2 ${styles.formLabel}`}>
                        {t("emailLabel") || "Your Email"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("placeholderEmail")}
                        className={`form-control ${styles.customInput}`}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className={`mb-2 ${styles.formLabel}`}>
                      {t("messageLabel") || "Your Message"}
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("placeholderMessage")}
                      className={`form-control ${styles.customTextarea}`}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className={`${styles.contactInfo}`}>
                      <p className="mb-0 d-flex align-items-center">
                        <MessageCircle size={18} className="me-2" />
                        <span>{t("contactMessage")}</span>
                      </p>
                    </div>
                    <motion.button
                      type="submit"
                      className={`btn ${styles.customButton}`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center text-white">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{ marginRight: "8px", width: "16px", height: "16px" }}
                          >
                            ⟳
                          </motion.div>
                          {t("sending") || "Enviando..."}
                        </span>
                      ) : (
                        <span className="d-flex align-items-center text-white">
                          {t("btnSend")}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 1,
                              repeatDelay: 1
                            }}
                          >
                            <Send size={16} className="ms-2 text-white" />
                          </motion.div>
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Contact, "contact", {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: false
});