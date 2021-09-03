import React from 'react'

const Notification = ({ notfyMessage }) => {
    if (!notfyMessage) return null;

    return <div>{notfyMessage}</div>;
};

export default Notification