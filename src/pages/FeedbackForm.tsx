import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Save } from "lucide-react";

interface FeedbackFormProps {
  feedback: string;
  grade: string;
  maxGrade: number;
  currentGrade?: number;
  hasStudentSubmission: boolean;
  submitting: boolean;
  onFeedbackChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGradeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const FeedbackForm = ({
  feedback,
  grade,
  maxGrade,
  currentGrade,
  hasStudentSubmission,
  submitting,
  onFeedbackChange,
  onGradeChange,
  onSubmit,
}: FeedbackFormProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
        Feedback & Grading
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-3">
            <Label htmlFor="feedback" className="mb-2 block">
              Feedback for Student
            </Label>
            <Textarea
              id="feedback"
              placeholder="Provide feedback on the student's work..."
              rows={5}
              value={feedback}
              onChange={onFeedbackChange}
              className="resize-none"
              disabled={!hasStudentSubmission}
            />
          </div>
          <div>
            <Label htmlFor="grade" className="mb-2 block">
              Grade (0-{maxGrade})
            </Label>
            <Input
              id="grade"
              type="text"
              placeholder="0-100"
              value={grade}
              onChange={onGradeChange}
              disabled={!hasStudentSubmission}
            />
            {currentGrade !== undefined && (
              <p className="text-xs text-muted-foreground mt-1">
                Current grade: {currentGrade} / {maxGrade}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={onSubmit} 
            disabled={submitting || (!feedback.trim() && !grade) || !hasStudentSubmission}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {feedback ? "Update Feedback" : "Submit Feedback"}
          </Button>
          {!hasStudentSubmission && (
            <p className="text-xs text-muted-foreground absolute mt-10">
              Feedback can only be provided after student submission
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
