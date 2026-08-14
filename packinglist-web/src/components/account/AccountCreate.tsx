import React, {useState} from "react";
import LoginLogo from "../logo/LoginLogo.tsx";
import axios from "axios";
import {successful_login} from "../../utils/auth.tsx";

function AccountCreate(props: {login: () => void}) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        // TODO: Better client-side validation
        if (!name || !email || !password1 || !password2 || password1 !== password2) {
            setError('Please enter all fields and ensure passwords match.');
            return;
        }

        try {
            axios.post("/users/", {name: name, email: email, pass1: password1, pass2: password2})
                .then(response => {
                    if (response.status == 200) {
                        successful_login(props.login, response.data['access_token']);
                    } else {
                        throw new Error("There was a problem logging in.");
                    }
                }).catch(err => {
                setError(err.response.data.detail);
            })
        } catch (err: any) {
            setError(err);
            return;
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
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                      <div className={"form-outline mb-4"}>
                          <input type={"name"} id={"name"} className={"form-control invalid"} value={name}
                                 onChange={(e) => setName(e.target.value)} autoFocus={true} data-1p-ignore />
                          <label className={"form-label"} htmlFor={"email"}>Name</label>
                      </div>
                      <div className={"form-outline mb-4"}>
                          <input type={"email"} id={"email"} className={"form-control invalid"} value={email}
                                 onChange={(e) => setEmail(e.target.value)} data-1p-ignore />
                          <label className={"form-label"} htmlFor={"email"}>Email address</label>
                      </div>
                      <div className={"form-outline mb-4"}>
                          <input type={"password"} id={"password"} className={"form-control"} value={password1}
                                 onChange={(e) => setPassword1(e.target.value)} data-1p-ignore />
                          <label className={"form-label"} htmlFor={"password"}>Password</label>
                      </div>
                      <div className={"form-outline mb-4"}>
                          <input type={"password"} id={"password"} className={"form-control"} value={password2}
                                 onChange={(e) => setPassword2(e.target.value)} data-1p-ignore />
                          <label className={"form-label"} htmlFor={"password"}>Verify Password</label>
                      </div>
                      <div className={"d-flex justify-content-between"}>
                          <button type="submit" className="btn btn-primary btn-block">Create New Account</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
}

export default AccountCreate;