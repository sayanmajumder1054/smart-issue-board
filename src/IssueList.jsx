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
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          All Issues
        </h3>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <label>Status: </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label>Priority: </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* Issues */}
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "14px",
              background: "#fafafa",
            }}
          >
            {/* Title + Priority */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ margin: 0 }}>{issue.title}</h4>
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  background:
                    issue.priority === "High"
                      ? "#ffd6d6"
                      : issue.priority === "Medium"
                      ? "#fff2cc"
                      : "#e6fffa",
                }}
              >
                {issue.priority}
              </span>
            </div>

            {/* Description */}
            <p style={{ margin: "6px 0", color: "#555" }}>
              {issue.description}
            </p>

            {/* Status + Assigned */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              <div>
                Status:{" "}
                <select
                  value={issue.status}
                  onChange={(e) => updateStatus(issue, e.target.value)}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>

              <div>Assigned: {issue.assignedTo || "Unassigned"}</div>
            </div>

            {/* Created by */}
            <div
              style={{
                fontSize: "12px",
                color: "#888",
                marginTop: "6px",
              }}
            >
              Created by: {issue.createdBy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default IssueList;
