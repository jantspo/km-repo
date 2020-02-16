export default function passwordValidator(value) {
    let mesg = '';
    let valid = false;

    if(!/(?=.*?[A-Z])/.test(value)){
        mesg = 'Password must contain a uppercase letter';
    }else if(!/(?=.*?[a-z])/.test(value)){
        mesg = 'Password must contain a lowercase letter';
    }else if(!/(?=.*?[0-9])/.test(value)){
        mesg = 'Password must contain a number';
    }else if(!/(?=.*?[#?!@$%^&*-])/.test(value)){
        mesg = 'Password must contain at least 1 special character (#,?,!,@,$,%,^,&,*,-)';
    }else if(!/.{8,16}/.test(value)){
        mesg = 'Password must be between 8 and 16 characters in length';
    }else {
        valid = true;
    }

    // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$

    return !valid ? mesg : true;
}