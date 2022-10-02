import React from 'react';
import Notification from 'components/Notification';

interface IProps {
    title?: string;
    children?: React.ReactNode;
    backgroundColor?: string;
}

const MainLayout: React.FC<IProps> = ({title, children, backgroundColor}) => {
    return (
        <div className="container" style={{ backgroundColor: backgroundColor }}>
            {title && <h1 className="text-center mt-3">{title}</h1>}
            {children}
            <Notification />
        </div>
    )
}

export default MainLayout;