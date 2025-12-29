import IssueList from "./IssueList";
import CreateIssue from "./CreateIssue";
import { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <CreateIssue />
          </div>
          <IssueList />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h3>Login / Signup</h3>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={login}>Login</button>
          <button onClick={signUp}>Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Auth;
