import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Snackbar, 
  Alert,
  Grid,
  Container,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
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
        <Container maxWidth="md" className="contact-outer-container">
            <Paper elevation={6} className="contact-paper">
                <Box className="contact-header">
                    <Typography variant="h5" className="contact-title">
                        <EmailIcon className="contact-icon" />
                        {translations.contactAndres}
                    </Typography>
                    <Typography variant="body1" className="contact-subtitle">
                        {translations.contactSubtitle}
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="contact-form"
                    noValidate
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                label={translations.name}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                                className="contact-field"
                                InputProps={{
                                    className: "contact-input-field",
                                    classes: {
                                        input: "contact-input-field"
                                    }
                                }}
                                InputLabelProps={{
                                    className: "contact-input-label",
                                    shrink: true
                                }}
                                size="medium"
                                inputProps={{ 
                                    maxLength: 50,
                                    autoComplete: "name" 
                                }}
                                autoComplete="name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="email"
                                label={translations.email}
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                fullWidth
                                variant="outlined"
                                className="contact-field"
                                InputProps={{
                                    className: "contact-input-field",
                                    classes: {
                                        input: "contact-input-field"
                                    }
                                }}
                                InputLabelProps={{
                                    className: "contact-input-label",
                                    shrink: true
                                }}
                                size="medium"
                                inputProps={{ 
                                    maxLength: 100,
                                    autoComplete: "email" 
                                }}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                className="contact-field"
                                InputProps={{
                                    className: "contact-input-field",
                                }}
                                InputLabelProps={{
                                    className: "contact-input-label",
                                }}
                                inputProps={{ maxLength: 500 }}
                            />
                        </Grid>
                        <Grid item xs={12} className="button-container">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                className="contact-button"
                                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            >
                                {loading ? translations.sending : translations.sendMessage}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

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
        </Container>
    );
};

export default ContactEmail; 