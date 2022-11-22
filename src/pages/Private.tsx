import React from 'react';
import {Navigate} from 'react-router-dom';

const Private = ({children, access}: {
    children: JSX.Element,
    access?: boolean
}) =>  access ? children : <Navigate to={'/'}/>;

export default Private;
