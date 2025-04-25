// StudentNotificationTest.tsx
import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const StudentNotificationTest = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const studentId = "ae3ffefa-fa4d-4cd6-83a8-08dd64cd9b99"; // Replace with real student GUID
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:5001/notificationHub?userId=${studentId}`)
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", (msg) => {
      setMessage(msg);
      alert(`📢 New Notification: ${msg}`);
    });

    connection.start().catch(err => console.error("Connection error:", err));
  }, []);

  return (
    <div>
      <h3>Student Notification Test</h3>
      <p>Last message: {message}</p>
    </div>
  );
};

export default StudentNotificationTest;
