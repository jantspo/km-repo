import emailValidator from '../../validators/emailValidator';
import phoneValidator from '../../validators/phoneValidator';

const formFields = {
    email: {
        target: 'email',
        fieldName: 'Email',
        value: '',
        placeholder: 'example@email.com',
        required: true,
        validators: [emailValidator]
    },
    first_name: {
        target: 'first_name',
        fieldName: 'First Name',
        placeholder: 'Ex., John',
        value: '',
        required: true
    },
    last_name: {
        target: 'last_name',
        fieldName: 'Last Name',
        placeholder: 'Ex., Smith',
        value: '',
        required: true
    },
    initial: {
        target: 'initial',
        fieldName: 'M.I.',
        placeholder: 'Ex., L',
        value: '',
        required: false,
    },
    company_name: {
        target: 'company_name',
        fieldName: 'Company Name',
        placeholder: 'Acme Property',
        value: '',
        required: false
    },
    cell: {
        target: 'cell',
        fieldName: 'Primary Phone #',
        placeholder: '(999) 555-1234',
        value: '',
        required: false,
        validators: [phoneValidator]
    },
    address: {
        target: 'address',
        fieldName: 'Address',
        placeholder: '',
        value: '',
        required: false
    },
    address_2: {
        target: 'address_2',
        fieldName: 'Ste #, Apt #',
        placeholder: '',
        value: '',
        required: false
    },
    city: {
        target: 'city',
        fieldName: 'City',
        placeholder: '',
        value: '',
        required: false
    },
    state: {
        target: 'state',
        fieldName: 'State',
        value: '',
        required: false
    },
    zip: {
        target: 'zip',
        fieldName: 'Zip',
        placeholder: '',
        value: '',
        required: false
    },

}

export default formFields;