let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export let isRequired = (value) => {
    if (value === undefined || value === null || value === '') {
        return 'Field is required';
    }
    return;
}
export let isEmail = (value) => {
    if (!emailRegex.test(value)) {
        return 'This is not a valid e-mail';
    }
    return;
}
