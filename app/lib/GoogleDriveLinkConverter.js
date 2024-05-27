// lib/googleDriveLinkConverter.js

const convertGoogleDriveLink = (link) => {
    let fileId = '';
    const regex = /\/file\/d\/([^/]+)/;
    const match = link.match(regex);

    if (match && match[1]) {
        fileId = match[1];
    }

    if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } else {
        return 'Not Working';
    }
};

export default convertGoogleDriveLink;
