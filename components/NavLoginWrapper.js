export default function NavLoginWrapper ({children}) {
    return <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {children}
        <style jsx>{`
                min-width: 320px;
                left: -215px;   
        `}</style>
    </div>
}