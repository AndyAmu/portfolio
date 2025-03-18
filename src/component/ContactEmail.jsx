import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';
import './styles/ContactEmail.css';
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
                'service_ys7v1lm', // Reemplazar con tu Service ID
                'template_zgnl9of', // Reemplazar con tu Template ID
                templateParams,
                'X02cCjRkoFrHj0ekE' // Reemplazar con tu Public Key
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
        <Box className="contact-container">
            <Typography variant="h5" className="contact-title">
                <EmailIcon sx={{ mr: 1 }} />
                {translations.contactAndres}
            </Typography>
            <Typography variant="body1" className="contact-subtitle">
                {translations.contactSubtitle}
            </Typography>
            <form onSubmit={handleSubmit} className="contact-form">
                <TextField
                    name="name"
                    label={translations.name}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    className="contact-input"
                />
                <TextField
                    name="email"
                    label={translations.email}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    className="contact-input"
                />
                <TextField
                    name="message"
                    label={translations.message}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    className="contact-input"
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="contact-button"
                >
                    {loading ? translations.sending : translations.sendMessage}
                </Button>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactEmail; 