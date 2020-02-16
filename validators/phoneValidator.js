const validateField = (value) => {
    debugger;
    if(value.length > 0) {
        // if(value.match(/(\(d{3}\)) d{3}-d{4}/)){
        if(/(\(\d{3}\)) \d{3}-\d{4}/.test(value)){
            return true;
        }else{
            return false
        }
    }else{
        return false;
    }
};

// const formatNumber = (phoneNumberString) => {
//     var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
//     if(cleaned.length > 10) cleaned = cleaned.substring(0, 10);
//     var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
//     if (match) {
//       return '(' + match[1] + ') ' + match[2] + '-' + match[3]
//     }
//     return ''
//   }

export default function phoneValidator(value) {
    const mesg = 'Please enter a valid phone number.'

    return !validateField(value) ? mesg : true;
}