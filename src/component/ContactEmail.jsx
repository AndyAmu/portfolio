import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import emailjs from '@emailjs/browser';
import './styles/ContactCards.css';
import { useLanguage } from '../context/LanguageContext';

const ContactEmail = () => {
    const { translations, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
            reply_to: formData.email
        };

        try {
            await emailjs.send(
                'service_ys7v1lm', // Service ID
                'template_zgnl9of', // Template ID
                templateParams,
                'X02cCjRkoFrHj0ekE' // Public Key
            );

            setSnackbar({
                open: true,
                message: translations.successMessage,
                severity: 'success'
            });

            setFormData({
                name: '',
                subject: '',
                email: '',
                message: ''
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: translations.errorMessage,
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-card contact-card-main" id="contact">
            <h2 className="contact-title">CONTACT</h2>
            <p className="contact-subtitle">
                {language === 'en' 
                  ? 'Want to work together? Have a project in mind? Feel free to contact me at amuchastegui.dev@gmail.com or using the form!'
                  : '¿Quieres trabajar juntos? ¿Tienes un proyecto en mente? ¡No dudes en contactarme a amuchastegui.dev@gmail.com o usando el formulario!'}
            </p>
            
            <div className="contact-divider"></div>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label>{language === 'en' ? 'Name' : 'Nombre'}</label>
                    <input
                        type="text"
                        name="name"
                        placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                    />
                </div>
                
                <div className="form-group">
                    <label>{language === 'en' ? 'Subject' : 'Asunto'}</label>
                    <input
                        type="text"
                        name="subject"
                        placeholder={language === 'en' ? 'Subject' : 'Asunto'}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={100}
                    />
                </div>
                
                <div className="form-group">
                    <label>{language === 'en' ? 'Message' : 'Mensaje'}</label>
                    <textarea
                        name="message"
                        placeholder={language === 'en' ? 'Write a message...' : 'Escribe un mensaje...'}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        maxLength={500}
                        rows={4}
                    />
                </div>
                
                <div className="form-submit-container">
                    <button type="submit" disabled={loading} className="contact-submit-btn">
                        {loading ? (language === 'en' ? 'Sending...' : 'Enviando...') : (language === 'en' ? 'Send Message' : 'Enviar Mensaje')}
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
        </div>
    );
};

export default ContactEmail;