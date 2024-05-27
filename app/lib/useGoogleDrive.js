"use client"

import { useState, useEffect } from 'react';

const useGoogleDrive = (apiKey, clientId) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [oauthToken, setOauthToken] = useState(null);
    const [isClientLoaded, setIsClientLoaded] = useState(false);

    useEffect(() => {
        const loadClient = () => {
            window.gapi.load('client', {
                callback: () => {
                    window.gapi.client.init({
                        apiKey,
                        clientId,
                        scope: 'https://www.googleapis.com/auth/drive.file',
                    }).then(() => {
                        setIsClientLoaded(true);
                        checkAuth();
                    });
                },
                onerror: () => {
                    console.error('Failed to load Google API client');
                },
                timeout: 5000, // Adjust timeout as needed
                ontimeout: () => {
                    console.error('Google API client loading timed out');
                }
            });
        };

        if (!isClientLoaded) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = loadClient;
            script.onerror = () => console.error('Failed to load Google API client script');
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [apiKey, clientId, isClientLoaded]);

    const checkAuth = () => {
        window.gapi.auth.authorize(
            { client_id: clientId, scope: 'https://www.googleapis.com/auth/drive.file', immediate: true },
            handleAuthResult
        );
    };

    const handleAuthResult = (authResult) => {
        if (authResult && !authResult.error) {
            setOauthToken(authResult.access_token);
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
            setOauthToken(null);
        }
    };

    const openPicker = (callback) => {
        if (isAuthorized && window.google && window.google.picker) {
            const picker = new window.google.picker.PickerBuilder()
                .addView(new window.google.picker.DocsView())
                .setOAuthToken(oauthToken)
                .setDeveloperKey(apiKey)
                .setCallback(callback)
                .build();
            picker.setVisible(true);
        } else {
            checkAuth();
        }
    };

    return { openPicker };
};

export default useGoogleDrive;
