"use client";

import { SectionWrapper } from "@/hoc";
import { slideIn } from "@/utils/motion";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
          setLoading(false);
          alert("Gracias por comunicarse, pronto estaremos en contacto");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Por favor intente de nuevo.");
        }
      );
  };

  return (
    <div
      className={`d-flex flex-column-reverse flex-lg-row gap-4 overflow-hidden mt-xl-5 ${styles.container}`}
    >
      {/* Sección Izquierda (Formulario) */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={`flex-fill p-4 p-lg-5 ${styles.formContainer}`}
      >
        <p className={`text-white ${styles.sectionSubText}`}>
          {t("subtitle") || "Get in touch"}
        </p>
        <h3 className={`text-white ${styles.sectionHeadText}`}>
          {t("title") || "Contact."}
        </h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label className="form-label text-white">
              {t("nameLabel") || "Your Name"}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`form-control ${styles.customInput}`}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">
              {t("emailLabel") || "Your Email"}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className={`form-control ${styles.customInput}`}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">
              {t("messageLabel") || "Your Message"}
            </label>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className={`form-control ${styles.customTextarea}`}
            />
          </div>
          <button type="submit" className={`btn btn-primary ${styles.customButton}`}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Sección Derecha*/}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-fill d-flex justify-content-center align-items-center"
        style={{ minHeight: "350px", height: "100%" }}
      >

      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "Contact");
