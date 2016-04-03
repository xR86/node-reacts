import $ from 'jquery';

import appConfig from '../configs/appConfig';

export let logIn = (email, password, cb) => {
    let payLoad = {
        email: email.trim(),
        password: password.trim()
    }
    return $.ajax({
            type: 'POST',
            url: `${appConfig.serverUrl}login`,
            cache: false,
            data: payLoad
        })
        .done(() => {
            sessionStorage.email = email;

            if (cb && typeof cb === 'function') {
                cb();
            }
        });
}

export let logOut = (cb) => {
    $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}logout`,
            cache: false,
        })
        .done(() => {
            sessionStorage.email = '';
            if (cb && typeof cb === 'function') {
                cb();
            }
        })
        .fail((resp) => {
            throw new Error('Ceva crapasi');
        });
}
export let getCurrentUser = () => {
    return sessionStorage.email;
}
export let requireAuth = (nextState, replace) => {
    if (!sessionStorage.email) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
