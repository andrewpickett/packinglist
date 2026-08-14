import {type FormEvent, useState} from 'react';
import axios from 'axios';

import {PersonPlusFill} from "react-bootstrap-icons";

import LoginLogo from "../logo/LoginLogo.tsx";
import {successful_login} from "../../utils/auth.tsx";

function Login(props: { login: () => void }) {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [error, setError] = useState<string>('');

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');

      // TODO: Better client-side validation
      if (!email || !password) {
         setError('Please enter both username and password.');
         return;
      }

      try {
         axios.post("/users/login/", {email: email, password: password})
            .then(response => {
               if (response.status == 200) {
                  successful_login(props.login, response.data['access_token']);
               } else {
                  throw new Error("There was a problem logging in.");
               }
            }).catch(err => {
               setError(err.response.data.detail);
            });
      } catch (err: any) {
         setError(err);
      }
   }

   return (
      <div>
         <div className={"text-center mb-4"}>
            <LoginLogo width={200}/>
         </div>
         <div className={"row"}>
            <div className={"col-md-4 offset-md-4"}>
               <form onSubmit={handleSubmit} className={"needs-validation"}>
                  {error && <p style={{color: 'red'}}>{error}</p>}
                  <div className={"form-outline mb-4"}>
                     <input type={"email"} id={"email"} className={"form-control invalid"} value={email}
                            onChange={(e) => setEmail(e.target.value)} autoFocus={true} data-1p-ignore />
                     <label className={"form-label"} htmlFor={"email"}>Email address</label>
                  </div>
                  <div className={"form-outline mb-4"}>
                     <input type={"password"} id={"password"} className={"form-control"} value={password}
                            onChange={(e) => setPassword(e.target.value)} data-1p-ignore />
                     <label className={"form-label"} htmlFor={"password"}>Password</label>
                  </div>
                  <div className={"d-flex justify-content-between"}>
                     <button type={"submit"} className="btn btn-success btn-block">Sign in</button>
                     <button type={"button"} className={"btn btn-primary"}><PersonPlusFill /> Create Account</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Login;
