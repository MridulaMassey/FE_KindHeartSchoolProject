import { useEffect, useState } from "react";

type Task = {
  id: string | number;
  title: string;
  dueDate: string;
};

const UpcomingTask = () => {
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          console.warn("No username in localStorage");
          return;
        }

        // Fetch studentId using username
        const res = await fetch(`https://localhost:44361/api/students/get-student-id/${username}`);
        const text = await res.text();
        let studentId: string;

        try {
          const parsed = JSON.parse(text);
          studentId = parsed.studentId;
        } catch (err) {
          console.error("❌ Failed to parse studentId:", err);
          return;
        }

        // Fetch upcoming tasks using studentId
        const tasksRes = await fetch(`https://localhost:44361/api/activities/upcoming/${studentId}`);
        const tasks = await tasksRes.json();
        setUpcomingTasks(tasks);
      } catch (error) {
        console.error("💥 Error loading upcoming tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="p-4 bg-green-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">📋 Upcoming Tasks</h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : upcomingTasks.length > 0 ? (
        <ul className="list-disc pl-4">
          {upcomingTasks.map((task) => (
            <li key={task.id}>
              📌 {task.title} — due{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">🎉 No upcoming tasks</p>
      )}
    </div>
  );
};

export default UpcomingTask;
