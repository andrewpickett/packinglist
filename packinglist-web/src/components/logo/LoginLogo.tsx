import LogoImage from "./LogoImage.tsx";

interface LoginLogoProps {
   width?: number,
   height?: number
}

function LoginLogo({width, height}: LoginLogoProps) {
   return (
      <>
         <LogoImage height={height} width={width} />
         <div className={"pl-login-logo-text"}>
            <span className={"fw-bolder"}>PACKING</span><span>LIST</span>
         </div>
      </>
   );
}

export default LoginLogo;
