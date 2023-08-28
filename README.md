# Encrypted Signal

FrontEnd Implementation for Secure Programming Project - Encrypted Signal - An Encrypted File Sharing Platform! Users can upload a file, share that file with another registered user. This application follows Secure Programming and covers some of the OWASP Top 10 Web Application Security Risks. A detailed project report can be found here: [Encrypted Signal - Secure Programming Report](https://github.com/TUNI-Projects/Encrypted-Signal-Backend/blob/master/report/Encrypted%20Signal%20-%20Secure%20Programming%20Report.pdf).

## 🚀 Features

* User Registration, Login, Logout ✅
* User File Upload, Download, Share and Delete ✅

Only owner can share file with other users as well as delete the file. 👤🔒

## Mobile View Note 📱

Please note that this page is not currently optimized for mobile view. The application's layout and features may not function as expected on smaller screens.

## 🛡️ OWASP Top 10 Checklist

I am confident that I have managed to cross these checklist on this project. However, they are in extremely primal level. They require a lot of fine tuning, in different layers, not only on the application layer.

1. Broken Access Control 🚫🔑
2. Cryptographic Failures 🔐❌
3. Injection 💉❌
4. Security Logging and Monitoring Failures 🔍❌
5. Identification and Authentication Failures 🆔🔐
6. Security Misconfiguration 🛡️❌
7. Server-Side Request Forgery (SSRF) 🌐❌

I am confident that I have managed to cross these checklist on this project. However, they are in extremely primal level. They require a lot of fine tuning, in different layers, not only on application layer.

## 🚀 Deployment

The Project is visible in a limited capacity on this website - [Encrypted Signal - Github Pages](https://tuni-projects.github.io/Encrypted-Signal/).

Limitations are -

* ⏳ User Session is valid for 15 minutes.
* 📏 File Upload Limit is 1 KB.

🏠 Localhost implementation won't have this limitation.

### 🛠️ How to Deploy

* `npm install` to install all the node dependencies.
* `npm start` to run the app in the development mode in localhost.
* `npm run deploy` to deploy the app in the github pages.

Thank you 👏

Ibtehaz, May 16, 2023
