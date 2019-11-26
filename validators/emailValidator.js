

export default function emailValidator(value) {
    const mesg = 'Please enter a valid email address.'

    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

    return !valid ? mesg : true;
}