"use client";

import { useState, useEffect } from 'react';

const useGooglePicker = (apiKey, clientId) => {
    const [isPickerLoaded, setIsPickerLoaded] = useState(false);
    const [oauthToken, setOauthToken] = useState(null);

    useEffect(() => {
        const loadPicker = () => {
            window.gapi.load('client:auth2', {
                callback: () => {
                    window.gapi.client.init({
                        apiKey: apiKey,
                        clientId: clientId,
                        scope: 'https://www.googleapis.com/auth/drive.file',
                    }).then(() => {
                        setIsPickerLoaded(true);
                        const authInstance = window.gapi.auth2.getAuthInstance();
                        authInstance.signIn().then(user => {
                            setOauthToken(user.getAuthResponse().access_token);
                        });
                    });
                },
                onerror: () => {
                    console.error('gapi.client failed to load!');
                },
                timeout: 5000, // 5 seconds.
                ontimeout: () => {
                    console.error('gapi.client could not load in a timely manner!');
                },
            });
        };

        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = loadPicker;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [apiKey, clientId]);

    const openPicker = (callback) => {
        if (oauthToken && isPickerLoaded) {
            const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
            view.setMimeTypes('image/png,image/jpeg,image/jpg');
            const picker = new window.google.picker.PickerBuilder()
                .addView(view)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(apiKey)
                .setCallback((data) => {
                    if (data.action === window.google.picker.Action.PICKED) {
                        const fileId = data.docs[0].id;
                        const fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
                        callback(fileUrl);
                    }
                })
                .build();
            picker.setVisible(true);
        }
    };

    return { openPicker, isPickerLoaded };
};

export default useGooglePicker;
