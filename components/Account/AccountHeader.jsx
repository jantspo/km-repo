export default function AccountHeader({active}) {
    return (
        <ul className="nav nav-tabs nav-fill">
            <li className="nav-item ">
                <a className="nav-link active" href="#">Account Settings</a>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="#">Vesting Profiles</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Bank Accounts</a>
            </li> */}
            <li className="nav-item">
                <a className="nav-link" href="#">SDIRA Integrations</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Mailing Addresses</a>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="#">Your Team</a>
            </li> */}
        </ul>
    )
}