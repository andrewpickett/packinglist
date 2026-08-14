import logo from "/logo.svg"

interface LogoImageProps {
   width?: number,
   height?: number
}

function LogoImage({width, height}: LogoImageProps) {
    return (
        <img src={logo} alt="Header Logo" style={{ width: width, height: height }} />
    );
}

export default LogoImage;
