import {logout} from "../../utils/auth.tsx";
import type {ReactElement} from "react";

interface SiteNavProps {
   loggedIn: boolean
}

function SiteNav({loggedIn}: SiteNavProps) {
   let loginElem: ReactElement = <a className={"nav-link"} href="/login">Sign In</a>;
   let loggedInElems: ReactElement[] = [];

   if (loggedIn) {
      loginElem = <a className={"nav-link"} href="/" onClick={logout}>Sign Out</a>;
      loggedInElems.push(<a className={"nav-link"} href={"/home"}>My Lists</a>);
      loggedInElems.push(<a className={"nav-link"} href={"/account"}>My Account</a>);
   }

   return (
      <div id={"navbarCollapse"}>
         <ul className={"navbar-nav ms-auto mb-2 mb-md-0"}>
            {loggedInElems.map((item: ReactElement, i: number): ReactElement => (
               <li className={"nav-item"} style={{borderRight: "1px solid #cccccc"}} key={i}>{item}</li>
            ))}
            <li className={"nav-item"}>
               {loginElem}
            </li>
         </ul>
      </div>
   );
}

export default SiteNav;
