import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ children, access }: {
    children: JSX.Element,
    access?: boolean
}) => {
    if (access) {
        return (children)
    }
    /* istanbul ignore next */
    else {
        return (<Navigate to={'/'} />)
    }
};

export default Private;
