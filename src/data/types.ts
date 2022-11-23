import React from 'react';

export interface UserCredentials {
    username: string;
    email: string;
    password: string;
};

export type ChangeEvent =
    React.ChangeEvent<HTMLInputElement>;

export type ClickEvent =
    React.MouseEvent<HTMLButtonElement, MouseEvent>;

export const HTTP = {
    '200': 200,
    '201': 201,
    '400': 400,
    '401': 401,
};

export const MS = {
    '1000': 1000,
    '2000': 2000,
    '5000': 5000,
    '10000': 10000,
};

export const ID = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
};

export interface Asset {
    token: string;
    quantity: number;
    price?: number;
    total?: number;
    allocation?: number
}

export type Assets = Asset[];
