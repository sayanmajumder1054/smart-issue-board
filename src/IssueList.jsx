import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const updateStatus = async (issue, newStatus) => {
    // RULE: Open -> Done not allowed
    if (issue.status === "Open" && newStatus === "Done") {
      alert("Please move the issue to 'In Progress' before marking it Done.");
      return;
    }

    const issueRef = doc(db, "issues", issue.id);
    await updateDoc(issueRef, {
      status: newStatus,
    });
  };

  useEffect(() => {
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issueData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIssues(issueData);
    });

    return () => unsubscribe();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    return (
      (statusFilter === "All" || issue.status === statusFilter) &&
      (priorityFilter === "All" || issue.priority === priorityFilter)
    );
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>All Issues</h3>

      <label>Status: </label>
      <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
></select><select onChange={(e) => setStatusFilter(e.target.value)}>
        <option>All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <label style={{ marginLeft: "10px" }}>Priority: </label>
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <ul>
        {filteredIssues.map((issue) => (
          <li key={issue.id} style={{ marginBottom: "10px" }}>
            <strong>{issue.title}</strong>
            <br />
            {issue.description}
            <br />
            Status:
            <select
              value={issue.status}
              onChange={(e) => updateStatus(issue, e.target.value)}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            {""}| Priority: {issue.priority}
            <br />
            Assigned To: {issue.assignedTo || "Not assigned"}
            <br />
            Created By: {issue.createdBy}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
