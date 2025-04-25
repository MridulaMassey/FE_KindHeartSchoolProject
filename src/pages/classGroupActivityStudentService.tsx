const API_BASE_URL = 'https://localhost:44361/api';

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

// Define the model for Student
export interface Student {
  id: string;
  name: string;
}

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

// Mock data for student activities
const mockStudentActivities = [
  {
    classGroupSubjectStudentActivityId: "cgsa-101",
    activityId: "act-101",
    studentId: "stu-101",
    student: {
      id: "stu-101",
      userName: "Emily Johnson"
    },
    classGroupSubject: {
      classGroup: {
        className: "Grade 10-A"
      },
      subject: {
        subjectName: "Mathematics"
      }
    },
    activity: {
      title: "Quadratic Equations",
      description: "Complete problems 1-20 on quadratic equations and their applications.",
      dueDate: "2025-04-10"
    },
    status: "Submitted"
  },
  {
    classGroupSubjectStudentActivityId: "cgsa-102",
    activityId: "act-102",
    studentId: "stu-102",
    student: {
      id: "stu-102",
      userName: "Michael Smith"
    },
    classGroupSubject: {
      classGroup: {
        className: "Grade 10-A"
      },
      subject: {
        subjectName: "Science"
      }
    },
    activity: {
      title: "Chemical Reactions",
      description: "Write a lab report on the chemical reactions observed during the experiment.",
      dueDate: "2025-04-15"
    },
    status: "Pending"
  },
  {
    classGroupSubjectStudentActivityId: "cgsa-103",
    activityId: "act-103",
    studentId: "stu-103",
    student: {
      id: "stu-103",
      userName: "Sophia Martinez"
    },
    classGroupSubject: {
      classGroup: {
        className: "Grade 10-B"
      },
      subject: {
        subjectName: "English"
      }
    },
    activity: {
      title: "Literary Analysis",
      description: "Write a 3-page analysis of the themes in 'To Kill a Mockingbird'.",
      dueDate: "2025-04-08"
    },
    status: "Graded"
  },
  {
    classGroupSubjectStudentActivityId: "cgsa-104",
    activityId: "act-104",
    studentId: "stu-104",
    student: {
      id: "stu-104",
      userName: "Daniel Taylor"
    },
    classGroupSubject: {
      classGroup: {
        className: "Grade 11-A"
      },
      subject: {
        subjectName: "History"
      }
    },
    activity: {
      title: "World War II Impact",
      description: "Research and present the social and economic impacts of World War II on a specific country.",
      dueDate: "2025-04-01"
    },
    status: "Overdue"
  }
];

export const classGroupActivityStudentService = {
  getClassGroupActivities: async (activityId:string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/classgroupsubjectstudentactivities/${activityId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.status}`);
      }
      const data = await response.json();
      console.log("API data received:", data);
      
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("API response is not an array:", data);
        return mockClassGroupActivities;
      }
    } catch (error) {
      console.error('Error in getClassGroupActivities:', error);
      return mockClassGroupActivities;
    }
  },
  
  // Updated method to get activities with student information
  getClassGroupStudentActivities: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ClassGroupSubjectStudent/activities`);
      if (!response.ok) {
        throw new Error(`Failed to fetch student activities: ${response.status}`);
      }
      const data = await response.json();
      console.log("Student activities API data received:", data);
      
      if (Array.isArray(data)) {
        return data;
      } else {
        console.error("Student activities API response is not an array:", data);
        return mockStudentActivities;
      }
    } catch (error) {
      console.error('Error in getClassGroupStudentActivities:', error);
      return mockStudentActivities;
    }
  },
  
  deleteActivity: async (activityId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete activity: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error in deleteActivity:', error);
      throw error;
    }
  }
};

// This is the corrected export - not using 'new' since classGroupActivityService is not a class
export const activitystudentClassGroupService = classGroupActivityStudentService;