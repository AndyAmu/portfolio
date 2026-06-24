import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';
import './styles/dashboardUI.css';
import { useLanguage } from '../context/LanguageContext';

const ContactEmail = () => {
    const { translations } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
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
        <div className="dashboard-card contact-widget">
            <h2>
                <EmailIcon style={{ fontSize: '2rem' }} />
                {translations.contactAndres}
            </h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder={translations.name}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    maxLength={50}
                    autoComplete="name"
                />
                
                <input
                    type="email"
                    name="email"
                    placeholder={translations.email}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="contact-input"
                    maxLength={100}
                    autoComplete="email"
                />
                
                <textarea
                    name="message"
                    placeholder={translations.message}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="contact-input contact-textarea"
                    maxLength={500}
                    rows={4}
                />
                
                <button
                    type="submit"
                    disabled={loading}
                    className="contact-submit"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                >
                    {loading ? translations.sending : translations.sendMessage}
                    {!loading && <SendIcon fontSize="small" />}
                </button>
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