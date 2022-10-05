import * as React from 'react';

interface NotificationProps {
    message: string;
}

function Notification(props: NotificationProps) {
    const show = !!props.message.trim();
    return <div className={`klip-qrcode__notification${show ? ' notification__show' : ''}`}>{props.message}</div>;
}

export default Notification;
