import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Award,
  FileText,
  Upload,
  Download,
  MessageSquare,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityDetails, SubmissionFile } from "@/types/ActivityTypes";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const StudentAssignmentDetails = () => {
  const navigate = useNavigate();
  const { activityId } = useParams<{ activityId: string }>();
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    navigate(-1);
  };
 
  const handleFileClick = () => {
    // Programmatically click the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }
      setSelectedFile(file);

      try {
        const base64 = await convertFileToBase64(file);
        setFileBase64(base64);
        toast.success("PDF file selected successfully", {
          description: file.name,
        });
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast.error("Error processing file", {
          description: "Please try another file or contact support.",
        });
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!selectedFile || !fileBase64) {
      toast.error("Please select a file to submit");
      return;
    }

    setSubmitting(true);
    toast.success("Submission initiated", {
      description: "Your activity is being uploaded...",
    });

    try {
      // Use the activityId from the URL params
      const currentActivityId = activityId || "563F760C-7D59-493A-A04A-32703798F913";
      console.log("Submitting activity with ID:", currentActivityId);
     
      const response = await fetch(`https://localhost:44361/api/activities/${currentActivityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: currentActivityId,
          studentId: "current-student-id", // Replace with your actual student ID retrieval logic
          fileBase64: fileBase64,
          fileName: selectedFile.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit activity");
      }

      console.log("Submission successful");
      toast.success("Activity submitted successfully", {
        description: "Your submission has been received.",
      });
      navigate("/activitiespagination");
    } catch (error) {
      console.error("Error submitting activity:", error);
      toast.error("Failed to submit activity", {
        description: "Please try again or contact support.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchActivityDetails = async () => {
      setLoading(true);
      try {
        // Use the activityId from the URL params, or fallback to the hardcoded ID
        const currentActivityId = activityId || "563F760C-7D59-493A-A04A-32703798F913";
        console.log("Fetching activity details for ID:", currentActivityId);
       
        const response = await fetch(`https://localhost:44361/api/activities/activitychanges/${currentActivityId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch activity details");
        }

        const data = await response.json();
        setActivity({
          ...data,
          hasFeedback: !!data.feedback,
        });
      } catch (error) {
        console.error("Error fetching activity details:", error);
        toast.error("Failed to load activity details", {
          description: "Please try again later or contact support.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-4 w-40" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-52" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Activity Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The activity you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 group hover:bg-accent transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Back
        </Button>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h1 className="text-3xl font-medium tracking-tight">{activity.activityName}</h1>
              {activity.subjectName && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {activity.subjectName}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-muted-foreground gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Class: {activity.classGroupName || activity.classLevel || "Not specified"}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-xl">Activity Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Due Date</p>
                        <p className="text-muted-foreground">
                          {activity.dueDate
                            ? format(new Date(activity.dueDate), "MMMM d, yyyy")
                            : "No due date specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Assigned By</p>
                        <p className="text-muted-foreground">
                          {activity.teacherUserFirstName || "Professor"}-
                          {activity.teacherUserLastName || "Professor"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Weightage</p>
                        <p className="text-muted-foreground">{activity.weightagePercent}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Activity Title</h3>
                  <p className="font-medium text-lg text-primary mb-4">{activity.title}</p>

                  <h3 className="text-lg font-medium mb-2">Activity Description</h3>
                  <p className="text-muted-foreground">
                    {activity.description || "No description provided for this activity."}
                  </p>
                </div>

                <Separator />

                {activity.hasFeedback && (
                  <>
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h3 className="text-lg font-medium mb-1">Teacher Feedback</h3>
                          <p className="text-muted-foreground">
                            {activity.feedback || "No specific feedback provided yet."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-3">Activity Files</h3>
                  <div className="space-y-4">
                    {activity.pdfUrl && (
                      <div className="bg-muted/20 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Download className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Download Activity PDF</p>
                              <p className="text-muted-foreground text-sm">Get the activity instructions</p>
                            </div>
                          </div>
                          <div className="w-full sm:w-auto">
                            <a href={activity.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="secondary" className="w-full sm:w-auto">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Upload className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Upload Your Solution</p>
                            <p className="text-muted-foreground text-sm">Submit your completed activity</p>
                          </div>
                        </div>
                        <div className="w-full sm:w-auto">
                          {/* Hidden file input */}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                            id="pdf-file-input"
                          />
                          {/* Visible upload button */}
                          <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                            onClick={handleFileClick}
                            type="button"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose PDF File
                          </Button>
                        </div>
                      </div>
                      {selectedFile && (
                        <div className="mt-3 flex items-center justify-between bg-muted/30 p-2 px-3 rounded">
                          <span className="text-sm text-green-600 font-medium">
                            File selected: {selectedFile.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={removeSelectedFile}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleSubmit}
                    disabled={!selectedFile || submitting || activity.hasFeedback}
                    type="button"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {submitting ? "Submitting..." : "Submit Your Activity"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentAssignmentDetails;
