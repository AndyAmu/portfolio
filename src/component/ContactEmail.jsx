import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';
import './styles/ContactCards.css';
import { useLanguage } from '../context/LanguageContext';

const ContactEmail = ({ contactPreset }) => {
  const { translations, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (contactPreset?.subject) {
      setFormData((prev) => ({
        ...prev,
        subject: contactPreset.subject,
        message: contactPreset.message || prev.message,
      }));
    }
  }, [contactPreset]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_name: 'Andrés Amuchástegui',
      reply_to: formData.email,
    };

    try {
      await emailjs.send(
        'service_ys7v1lm',
        'template_zgnl9of',
        templateParams,
        'X02cCjRkoFrHj0ekE'
      );

      setSnackbar({
        open: true,
        message: translations.successMessage,
        severity: 'success',
      });

      setFormData({
        name: '',
        subject: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: translations.errorMessage,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/543512160552?text=${encodeURIComponent(
    language === 'en'
      ? `Hi Andrés, I'd like to discuss a project${formData.subject ? `: ${formData.subject}` : ''}.`
      : `Hola Andrés, quiero consultar por un proyecto${formData.subject ? `: ${formData.subject}` : ''}.`
  )}`;

  return (
    <section
      className="dashboard-card contact-card-main"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <h2 id="contact-heading" className="contact-title">
        {translations.contactTitle}
      </h2>
      <p className="contact-subtitle">{translations.contactSubtitle}</p>

      <div className="contact-divider" aria-hidden="true" />

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="contact-name">{translations.name}</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-subject">{translations.subject}</label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder={
              language === 'en'
                ? 'e.g. SaaS, WooCommerce store, CRO landing...'
                : 'Ej: SaaS, tienda WooCommerce, landing CRO...'
            }
            value={formData.subject}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">{translations.email}</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">{translations.message}</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder={
              language === 'en'
                ? 'Tell me about your project goals, timeline, or idea...'
                : 'Cuéntame sobre tu proyecto, objetivos o plazos...'
            }
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={500}
            rows={4}
          />
        </div>

        <div className="form-submit-container">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            {translations.whatsappDirect} ↗
          </a>
          <button type="submit" disabled={loading} className="contact-submit-btn">
            {loading ? translations.sending : translations.sendMessage}
          </button>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default ContactEmail;
