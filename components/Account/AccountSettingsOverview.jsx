export default function AccountSettingOverview ({company_name, first_name, last_name, initial, address, city, state, zip, cell, email, sms_alerts, email_alerts}){
    return (
        <div>
            <h5>Name</h5>
            <p>{first_name && first_name} {initial && initial} {last_name && last_name}</p>
            <h5>Company</h5>
            <p>{company_name ? company_name : 'N/A'}</p>
            <h5>Primary Address</h5>
            <p>{!address && !city && !state && !zip && 'N/A'}</p>
            <p>{address && `${address},`}</p>
            <p>{city && `${city},`} {state && state} {zip && zip}</p>
            <h5>Primary Phone</h5>
            <p>{cell ? cell : 'N/A'}</p>
            <h5>Email</h5>
            <p>{email && email}</p>
            <h6>
                { 
                    email_alerts ?
                    'Receiving email notifications on all messages and offers you post.' :
                    'Only receiving emails notifications on messages and offers you select. '
                }
            </h6>
            {/* <h6>
                { 
                    sms_alerts ?
                    'Receiving text notifications on all messages and offers you post.' :
                    'Only receiving text notifications on messages and offers you select. '
                }
            </h6> */}
            <style jsx>{`
                h5{
                    font-size: 18px;
                    font-weight: 700;
                    color: #5a5a5a;
                }
                p{
                    font-size: 16px;
                    font-weight: 400;
                    color: #6a6a6a
                }
            `}</style>
        </div>
    )
}