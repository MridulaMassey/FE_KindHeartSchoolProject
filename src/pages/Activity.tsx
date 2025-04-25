
import { toast } from "sonner";

// Activity interfaces
export interface Activity {
  id: number;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded" | "Overdue";
  instructions?: string;
  resources?: Resource[];
  submissionType?: string;
  points?: number;
  submissionDate?: string | null;
  feedback?: string | null;
  grade?: number | null;
  attachments?: Attachment[];
}

export interface Resource {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface Attachment {
  id: number;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

// Mock API service for fetching activities
// Replace these functions with actual API calls in the future
class ActivityService {
  private baseUrl: string;
  private mockData: Activity[];
  
  constructor() {
    // In a real app, you'd get this from environment variables
    this.baseUrl = "/api";
    
    // Mock data for development
    this.mockData = [
      {
        id: 1,
        title: "Math Worksheet: Fractions",
        subject: "Mathematics",
        description: "Practice adding, subtracting, multiplying, and dividing fractions.",
        dueDate: "2023-10-15",
        status: "Pending",
        instructions: "Complete all problems on the worksheet. Show your work for each problem.",
        submissionType: "File Upload",
        points: 20,
        resources: [
          {
            id: 1,
            name: "Fractions Worksheet",
            type: "PDF",
            url: "/worksheets/fractions.pdf"
          },
          {
            id: 2,
            name: "Fractions Tutorial",
            type: "Video",
            url: "/tutorials/fractions.mp4"
          }
        ]
      },
      {
        id: 2,
        title: "Reading Comprehension: The Solar System",
        subject: "Science",
        description: "Read the article about the solar system and answer the questions.",
        dueDate: "2023-10-18",
        status: "Submitted",
        submissionDate: "2023-10-15",
        instructions: "Read the article carefully and answer all questions in complete sentences.",
        submissionType: "Text Entry",
        points: 15,
        resources: [
          {
            id: 3,
            name: "The Solar System",
            type: "Article",
            url: "/articles/solar-system.html"
          }
        ],
        attachments: [
          {
            id: 1,
            name: "My Answers.docx",
            type: "DOCX",
            url: "/submissions/answers.docx",
            uploadDate: "2023-10-15"
          }
        ]
      },
      {
        id: 3,
        title: "Grammar Exercise: Verbs and Adverbs",
        subject: "English",
        description: "Practice identifying and using verbs and adverbs correctly.",
        dueDate: "2023-10-20",
        status: "Pending",
        instructions: "Complete all exercises in the worksheet. Pay attention to the usage of verbs and adverbs.",
        submissionType: "Online Form",
        points: 15,
        resources: [
          {
            id: 4,
            name: "Grammar Exercise",
            type: "Worksheet",
            url: "/worksheets/grammar.pdf"
          }
        ]
      },
      {
        id: 4,
        title: "History Report: Ancient Egypt",
        subject: "History",
        description: "Write a report about one aspect of Ancient Egyptian civilization.",
        dueDate: "2023-10-25",
        status: "Pending",
        instructions: "Choose one aspect of Ancient Egyptian civilization (e.g., pyramids, mummification, gods) and write a 500-word report.",
        submissionType: "Essay",
        points: 30,
        resources: [
          {
            id: 5,
            name: "Ancient Egypt Resources",
            type: "Website",
            url: "/resources/ancient-egypt.html"
          }
        ]
      },
      {
        id: 5,
        title: "Art Project: Self-Portrait",
        subject: "Art",
        description: "Create a self-portrait using the techniques learned in class.",
        dueDate: "2023-10-12",
        status: "Overdue",
        instructions: "Create a self-portrait using any medium discussed in class. Submit a photo of your finished artwork.",
        submissionType: "Image Upload",
        points: 25,
        resources: [
          {
            id: 6,
            name: "Self-Portrait Examples",
            type: "Gallery",
            url: "/galleries/self-portraits.html"
          }
        ]
      },
      {
        id: 6,
        title: "Science Experiment: Plant Growth",
        subject: "Science",
        description: "Conduct an experiment on plant growth under different conditions.",
        dueDate: "2023-11-05",
        status: "Pending",
        instructions: "Follow the experimental procedure outlined in the lab manual. Record your observations daily and submit a final report.",
        submissionType: "Lab Report",
        points: 40,
        resources: [
          {
            id: 7,
            name: "Experiment Guide",
            type: "PDF",
            url: "/labs/plant-growth.pdf"
          }
        ]
      },
      {
        id: 7,
        title: "Poetry Analysis: Robert Frost",
        subject: "English",
        description: "Analyze a poem by Robert Frost and discuss its themes and literary devices.",
        dueDate: "2023-10-08",
        status: "Graded",
        submissionDate: "2023-10-07",
        feedback: "Excellent analysis of the poem's themes. Good use of textual evidence to support your interpretations.",
        grade: 92,
        instructions: "Choose one poem by Robert Frost and write a 300-word analysis discussing its themes and literary devices.",
        submissionType: "Essay",
        points: 20,
        resources: [
          {
            id: 8,
            name: "Robert Frost Poems",
            type: "PDF",
            url: "/readings/frost-poems.pdf"
          }
        ],
        attachments: [
          {
            id: 2,
            name: "Frost Analysis.docx",
            type: "DOCX",
            url: "/submissions/frost-analysis.docx",
            uploadDate: "2023-10-07"
          }
        ]
      },
      {
        id: 8,
        title: "Geometry Quiz: Triangles",
        subject: "Mathematics",
        description: "Test your knowledge of triangles and their properties.",
        dueDate: "2023-10-05",
        status: "Graded",
        submissionDate: "2023-10-05",
        feedback: "Good understanding of triangle properties, but work on the proofs section.",
        grade: 85,
        instructions: "Complete the online quiz on triangles. You will have 30 minutes to complete the quiz.",
        submissionType: "Online Quiz",
        points: 15
      }
    ];
  }

  // Get all activities
  async getActivities(): Promise<Activity[]> {
    try {
      // In a real app, this would be a fetch call to the API
      // return await fetch(`${this.baseUrl}/activities`).then(res => res.json());
      
      // For development, return mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return this.mockData;
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to load activities");
      return [];
    }
  }

  // Get a single activity by ID
  async getActivity(id: number): Promise<Activity | null> {
    try {
      // In a real app, this would be a fetch call to the API
      // return await fetch(`${this.baseUrl}/activities/${id}`).then(res => res.json());
      
      // For development, find in mock data
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const activity = this.mockData.find(a => a.id === id);
      if (!activity) {
        throw new Error(`Activity with ID ${id} not found`);
      }
      
      return activity;
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error);
      toast.error("Failed to load activity details");
      return null;
    }
  }

  // Submit an activity
  async submitActivity(id: number, data: FormData): Promise<boolean> {
    try {
      // In a real app, this would be a POST call to the API
      // return await fetch(`${this.baseUrl}/activities/${id}/submit`, {
      //   method: 'POST',
      //   body: data
      // }).then(res => res.ok);
      
      // For development, just log and return success
      console.log(`Submitting activity ${id} with data:`, data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data
      const activityIndex = this.mockData.findIndex(a => a.id === id);
      if (activityIndex !== -1) {
        this.mockData[activityIndex].status = "Submitted";
        this.mockData[activityIndex].submissionDate = new Date().toISOString();
      }
      
      return true;
    } catch (error) {
      console.error(`Error submitting activity ${id}:`, error);
      toast.error("Failed to submit activity");
      return false;
    }
  }
}

export const activityService = new ActivityService();