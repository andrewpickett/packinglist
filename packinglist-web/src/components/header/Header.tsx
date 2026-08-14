import SiteNav from "./SiteNav.tsx";
import HeaderLogo from "../logo/HeaderLogo.tsx";

interface HeaderProps {
   loggedIn: boolean
}

function Header({loggedIn}: HeaderProps) {
   return (
      <header>
         <nav className={"navbar navbar-expand-md fixed-top"}>
            <div className={"container-fluid"}>
               <HeaderLogo/>
               <SiteNav loggedIn={loggedIn}/>
            </div>
         </nav>
      </header>
   );
}

export default Header;
