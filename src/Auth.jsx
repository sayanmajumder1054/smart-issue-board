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
    <div className="page-center">
      {user ? (
        <div className="app-container">
          <p className="user-text">Logged in as: {user.email}</p>

          <CreateIssue />
          <IssueList />

          <button className="danger-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="auth-card">
          <h2>Smart Issue Board</h2>

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
          <button className="secondary-btn" onClick={signUp}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default Auth;
