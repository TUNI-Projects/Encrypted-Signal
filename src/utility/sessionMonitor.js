import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the Cookies library

const SessionMonitor = () => {
    const [sessionExpired, setSessionExpired] = useState(false);

    const logout = (event) => {
        const logout_url = "https://1234.ibtehaz.xyz/user/logout/";
        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        fetch(logout_url, requestOptions)
            .then((response) => {
                return Promise.all([response.json(), response.status]);
            })
            .then(([res, status]) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });

        // Remove cookies and reload the page
        Cookies.remove('username', { path: '/' });
        Cookies.remove('sessionId', { path: '/' });
        window.location.reload();
    };


    const checkSessionExpiry = () => {
        const sessionIdCookie = document.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('sessionTime='));

        console.log("session check");
        console.log(sessionIdCookie);
        if (sessionIdCookie) {
            // console.log(sessionIdCookie);
            const sessionIdValue = sessionIdCookie.split('=')[1];
            const sessionExpirationTime = new Date(sessionIdValue);
            const currentTime = new Date();

            if (currentTime > sessionExpirationTime) {
                setSessionExpired(true);
            }
        }
    };

    useEffect(() => {
        // Check session expiry every half minute
        const interval = setInterval(checkSessionExpiry, 30 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (sessionExpired) {
        // Perform logout action here (clear session data, redirect to login, etc.)
        // Example: localStorage.removeItem('sessionData');
        // Redirect to login page or show a modal dialog
        logout();
    }

    return null; // No need to render anything
};

export default SessionMonitor;
