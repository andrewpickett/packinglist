import LogoImage from "./LogoImage.tsx";

interface HeaderLogoProps {
}

function HeaderLogo({}: HeaderLogoProps) {
    return (
        <div>
            <a className={"navbar-brand nav-link"} href="/">
                <div className={"d-flex"}>
                    <LogoImage height={40}/>
                    <span className={"my-auto ms-2"}>
                        <span className={"fw-bolder"}>PACKING</span>
                        <span className={"fw-lighter"}>LIST</span>
                    </span>
                </div>
            </a>
        </div>
    );
}

export default HeaderLogo;
