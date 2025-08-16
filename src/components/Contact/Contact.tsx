"use client";

import { SectionWrapper } from "@/hoc";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Contact.module.scss";
import { MessageCircle, Send } from "lucide-react";
import Image from "next/image";

const Contact = () => {
  const t = useTranslations("Contact");
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    {
      id: "linkedin",
      icon: (
        <Image src="/linkedin.svg" width={40} height={40} alt="" unoptimized />
      ),
      label: "LinkedIn",
      url: "https://linkedin.com/in/andrés-torres-sánchez-3ba367353",
    },
    {
      id: "github",
      icon: (
        <Image src="/github.svg" width={40} height={40} alt="" unoptimized />
      ),
      label: "GitHub",
      url: "https://github.com/atorress91",
    },
    {
      id: "whatsapp",
      icon: (
        <Image src="/whatsapp.svg" width={40} height={40} alt="" unoptimized />
      ),
      label: "WhatsApp",
      url: "https://wa.me/50683010150",
    },
    {
      id: "email",
      icon: (
        <Image src="/email.svg" width={40} height={40} alt="" unoptimized />
      ),
      label: "Email",
      url: "mailto:andres91411@gmail.com",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading(
      t("sendingMessage") || "Enviando mensaje..."
    );

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: "Andrés Torres",
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      )
      .then(
        () => {
          toast.dismiss(loadingToast);
          toast.success(
            t("successMessage") ||
              "Gracias por comunicarse, pronto estaremos en contacto",
            {
              duration: 5000,
              icon: "👋",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }
          );

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
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
      <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`container d-flex flex-column min-vh-100 py-5`}
          style={{ overflow: "visible" }}
      >
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            zIndex: 9999,
          },
        }}
      />

      <div className="row justify-content-center flex-grow-1">
        <div className="col-12 col-lg-10 d-flex flex-column">
          <h3 className={`${styles.sectionHeadText} text-center mt-lg-2 mb-lg-5 mb-2`}>
            {t("title") || "Contact."}
          </h3>
          <div className={`${styles.formContainer} p-4 p-md-5`}>
            <div className="text-center mb-2">
              <div
                className={`d-flex justify-content-center gap-3 mb-4 ${styles.socialIcons}`}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                    <span className={styles.socialTooltip}>{social.label}</span>
                  </motion.a>
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
                        placeholder={
                          t("placeholderName") || "What's your name?"
                        }
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
                        placeholder={
                          t("placeholderEmail") || "What's your email?"
                        }
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
                      placeholder={
                        t("placeholderMessage") || "What do you want to say?"
                      }
                      className={`form-control ${styles.customTextarea}`}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className={`${styles.contactInfo}`}>
                      <p className="mb-0 d-flex align-items-center">
                        <MessageCircle size={18} className="me-2" />
                        <span>
                          {t("contactMessage") ||
                            "I'll get back to you as soon as possible"}
                        </span>
                      </p>
                    </div>
                    <motion.button
                      type="submit"
                      className={styles.customButton}
                      whileHover="hover"
                      whileTap="tap"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            style={{
                              marginRight: "8px",
                              width: "16px",
                              height: "16px",
                            }}
                          >
                            ⟳
                          </motion.div>
                          {t("sending") || "Enviando..."}
                        </span>
                      ) : (
                        <span className="d-flex align-items-center">
                          {t("btnSend") || "Send Message"}
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 1,
                              repeatDelay: 1,
                            }}
                          >
                            <Send size={16} className="ms-2" />
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
      </motion.section>
  );
};

export default SectionWrapper(Contact, "contact", {
  showScroll: true,
  showUpScroll: true,
  showDownScroll: false,
});
