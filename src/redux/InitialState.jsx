export const arrayInitial = [];

const userData = localStorage.getItem('userData') || null;

const token = localStorage.getItem('token');

const isLogin = localStorage.getItem('isLogin');

export const objectInitial = {
    loading: false,
    token,
    user: JSON.parse(userData),
    isLogin: isLogin === 'true' ? true : false
};

export const singleValueInitial = 0;

export const stringInitial = '';

export const nullInitial = null;
