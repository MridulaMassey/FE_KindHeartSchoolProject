import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Award, Calendar, Download, FileText } from "lucide-react";
import { ActivityDetails } from "./activity.types";
import { formatDateString } from "./dateUtils";

interface ActivityDetailsCardProps {
  activity: ActivityDetails;
}

export const ActivityDetailsCard = ({ activity }: ActivityDetailsCardProps) => {
  const hasStudentSubmission = !!activity.studentPdfUrl;

  return (
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
                    ? formatDateString(activity.dueDate)
                    : "No due date specified"}
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

        <div>
          <h3 className="text-lg font-medium mb-3">Activity Files</h3>
          <div className="space-y-4">
            {activity.pdfUrl && (
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Assignment Instructions</p>
                      <p className="text-muted-foreground text-sm">Original activity instructions</p>
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

            {activity.studentPdfUrl ? (
              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Student Submission</p>
                      <p className="text-muted-foreground text-sm">View the student's work</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <a href={activity.studentPdfUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        View Submission
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg p-4">
                <p className="font-medium">No submission yet</p>
                <p className="text-sm">The student hasn't submitted their work for this activity.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};