import $ from 'jquery';

import appConfig from '../configs/appConfig';

let currentUser = null;

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
        .done((resp) => {
            currentUser = resp.user;
            if (cb && typeof cb === 'function') {
                cb();
            }
        });
}

export let logInFacebook = () => {
    return $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}login/facebook`,
            cache: false
        })
        .done((resp) => {

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
            currentUser = null;
            if (cb && typeof cb === 'function') {
                cb();
            }
        })
        .fail((resp) => {
            throw new Error('Ceva crapasi');
        });
}

export let getCurrentUser = () => {
    return currentUser
}

export let requireAuth = (nextState, replace) => {
    if (!currentUser) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export let logged = (loggedCb, notLoggedCb) => {
    $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}logged`,
            cache: false
        })
        .done((resp) => {
            currentUser = resp.user;
            if (!resp.authenticated && notLoggedCb && typeof notLoggedCb === 'function') {
                notLoggedCb();
            } else if(loggedCb && typeof loggedCb === 'function') {
                loggedCb();
            }
        })
}
