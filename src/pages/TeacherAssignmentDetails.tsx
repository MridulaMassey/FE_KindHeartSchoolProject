
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { teacherAssignmentService } from "./teacherAssignment.service";
import { ActivityDetails } from "./activity.types";
import { StudentInfoCard } from "./StudentInfoCard";
import { ActivityDetailsCard } from "./ActivityDetailsCard";
import { FeedbackForm } from "./FeedbackForm";

const MotionDiv = motion.div;

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

const TeacherAssignmentDetails = () => {
  const navigate = useNavigate();
  const { activityId, studentId } = useParams<{ activityId: string; studentId: string }>();
  const [activity, setActivity] = useState<ActivityDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [maxGrade] = useState(100);

  const handleBack = () => navigate(-1);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^(\d*\.?\d*)$/.test(value) || value === "") {
      setGrade(value);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedback.trim() && !grade) {
      toast.error("Please provide feedback or grade before submitting");
      return;
    }

    if (grade && (parseFloat(grade) < 0 || parseFloat(grade) > maxGrade)) {
      toast.error(`Grade must be between 0 and ${maxGrade}`);
      return;
    }

    setSubmitting(true);
    toast.success("Submitting feedback...");

    try {
      await teacherAssignmentService.submitFeedback(
        activityId!,
        feedback,
        grade ? parseFloat(grade) : null,
        studentId
      );

      console.log("Feedback submitted successfully");
      toast.success("Feedback submitted successfully");
      
      if (activity) {
        setActivity({
          ...activity,
          feedback: feedback.trim(),
          grade: grade ? parseFloat(grade) : undefined,
          hasFeedback: true,
        });
      }
   
    //  navigate('/classgroupsubjectsactivitytudentview/${activityId}');
      navigate(`/classgroupsubjectsactivitytudentview/${activityId}`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback", {
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
        if (!activityId || !studentId) throw new Error("Missing activityId or studentId");
        
        const activityData = await teacherAssignmentService.fetchActivityDetails(activityId, studentId);
        setActivity(activityData);

        if (activityData.feedback) {
          setFeedback(activityData.feedback);
        }
        if (activityData.grade !== undefined && activityData.grade !== null) {
          setGrade(activityData.grade.toString());
        }
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
  }, [activityId, studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-4 w-40" />
          <Card>
            <Skeleton className="h-8 w-52" />
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
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

  const hasStudentSubmission = !!activity.studentPdfUrl;

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

        <MotionDiv variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <MotionDiv variants={itemVariants} className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight">{activity.activityName}</h1>
            <div className="flex items-center text-muted-foreground gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Class: {activity.classGroupName || activity.classLevel || "Not specified"}</span>
            </div>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <StudentInfoCard activity={activity} />
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <ActivityDetailsCard activity={activity} />
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <FeedbackForm
              feedback={feedback}
              grade={grade}
              maxGrade={maxGrade}
              currentGrade={activity.grade}
              hasStudentSubmission={hasStudentSubmission}
              submitting={submitting}
              onFeedbackChange={handleFeedbackChange}
              onGradeChange={handleGradeChange}
              onSubmit={handleSubmitFeedback}
            />
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default TeacherAssignmentDetails;