import { useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const createIssue = async () => {
    if (!title || !description) {
      alert("Title and Description required");
      return;
    }

    const snapshot = await getDocs(collection(db, "issues"));

    const similarIssue = snapshot.docs.find((doc) =>
      doc.data().title.toLowerCase().includes(title.toLowerCase())
    );

    if (similarIssue) {
      const confirmCreate = window.confirm(
        "A similar issue already exists. Do you still want to create this issue?"
      );

      if (!confirmCreate) return;
    }

    await addDoc(collection(db, "issues"), {
      title,
      description,
      priority,
      status,
      assignedTo,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email,
    });

    alert("Issue created");
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
          margin: "0 auto",
        }}
      ></div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
        }}
      >
        <h3>Create Issue</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <input
          placeholder="Assigned To (email)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={createIssue} style={{ width: "100%" }}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateIssue;
