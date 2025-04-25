
// Define the model for ClassGroupActivity
export interface ClassGroupActivity {
    id: number;
    activityId: string;
    studentName: string;
    status: string;
    subject: string;
    activity: string;
    class: string;
    title: string;
    description: string;
    dueDate: string;
  }
  
  // Service class for handling API data
  export const classGroupActivityService = {
    // Method to get all data from API
    getClassGroupActivities: async () => {
      try {
        const baseUrl = "https://localhost:44361/api";
        const response = await fetch(`${baseUrl}/ClassGroupSubjectActivity`);
        console.log("ClassGroupActivity API response:", response);
        
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        
        const data = await response.json();
        console.log("API data received:", data);
        
        // Return the raw data from API, with handling for non-array responses
        if (Array.isArray(data)) {
          return data;
        } else {
          console.error("API response is not an array:", data);
          // Fallback to mock data for demo purposes
          return mockClassGroupActivities;
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        // If the API call fails, fallback to mock data for demo purposes
        return mockClassGroupActivities;
      }
    }
  };
  
  // Mock data for fallback if API fails
  const mockClassGroupActivities = [
    {
      id: 1,
      activityId: "act-101",
      studentName: "Emily Johnson",
      status: "Submitted",
      subject: "Mathematics",
      activity: "Problem Set",
      class: "Grade 10-A",
      title: "Quadratic Equations",
      description: "Complete problems 1-20 on quadratic equations and their applications.",
      dueDate: "2025-04-10"
    },
    {
      id: 2,
      activityId: "act-102",
      studentName: "Michael Smith",
      status: "Pending",
      subject: "Science",
      activity: "Lab Report",
      class: "Grade 10-A",
      title: "Chemical Reactions",
      description: "Write a lab report on the chemical reactions observed during the experiment.",
      dueDate: "2025-04-15"
    },
    {
      id: 3,
      activityId: "act-103",
      studentName: "Sophia Martinez",
      status: "Graded",
      subject: "English",
      activity: "Essay",
      class: "Grade 10-B",
      title: "Literary Analysis",
      description: "Write a 3-page analysis of the themes in 'To Kill a Mockingbird'.",
      dueDate: "2025-04-08"
    },
    {
      id: 4,
      activityId: "act-104",
      studentName: "Daniel Taylor",
      status: "Overdue",
      subject: "History",
      activity: "Research Project",
      class: "Grade 11-A",
      title: "World War II Impact",
      description: "Research and present the social and economic impacts of World War II on a specific country.",
      dueDate: "2025-04-01"
    },
    {
      id: 5,
      activityId: "act-105",
      studentName: "Olivia Wilson",
      status: "Submitted",
      subject: "Computer Science",
      activity: "Coding Assignment",
      class: "Grade 11-B",
      title: "Web Development Basics",
      description: "Create a simple website using HTML, CSS, and JavaScript following the provided requirements.",
      dueDate: "2025-04-12"
    },
    {
      id: 6,
      activityId: "act-106",
      studentName: "William Brown",
      status: "Pending",
      subject: "Physics",
      activity: "Problem Set",
      class: "Grade 12-A",
      title: "Newtonian Mechanics",
      description: "Solve the given problems related to forces, motion, and energy conservation.",
      dueDate: "2025-04-18"
    },
    {
      id: 7,
      activityId: "act-107",
      studentName: "Ava Miller",
      status: "Graded",
      subject: "Art",
      activity: "Portfolio",
      class: "Grade 10-B",
      title: "Mixed Media Project",
      description: "Create a mixed media artwork that reflects a personal narrative or experience.",
      dueDate: "2025-04-05"
    },
    {
      id: 8,
      activityId: "act-108",
      studentName: "James Davis",
      status: "Submitted",
      subject: "Mathematics",
      activity: "Group Project",
      class: "Grade 12-B",
      title: "Statistical Analysis",
      description: "Collect data and perform statistical analysis on a real-world phenomenon of your choice.",
      dueDate: "2025-04-20"
    }
  ];