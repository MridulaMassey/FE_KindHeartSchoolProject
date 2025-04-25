import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Check, FileCheck, Calendar, UserCircle } from "lucide-react";
import { ActivityDetails } from "./activity.types";

interface StudentInfoCardProps {
  activity: ActivityDetails;
}

export const StudentInfoCard = ({ activity }: StudentInfoCardProps) => {
  const isGraded = activity.grade !== undefined && activity.grade !== null;
  const studentName = activity.studentUserFirstName && activity.studentUserLastName 
    ? `${activity.studentUserFirstName} ${activity.studentUserLastName}`
    : "Student";

  return (
    <Card>
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            Student Information
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {activity.subjectName && (
              <Badge variant="outline" className="text-sm px-3 py-1">
                {activity.subjectName}
              </Badge>
            )}
            {isGraded ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Check className="h-3.5 w-3.5 mr-1" />
                Graded
              </Badge>
            ) : activity.studentPdfUrl ? (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                <FileCheck className="h-3.5 w-3.5 mr-1" />
                Submitted
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Pending
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-6 justify-between">
          <div>
            <h3 className="font-medium text-sm mb-1">Student Name</h3>
            <p className="text-muted-foreground">{studentName}</p>
          </div>
          {activity.submissionDate && (
            <div>
              <h3 className="font-medium text-sm mb-1">Submission Date</h3>
              <p className="text-muted-foreground">
                {format(new Date(activity.submissionDate), "MMMM d, yyyy")}
              </p>
            </div>
          )}
          {activity.status && (
            <div>
              <h3 className="font-medium text-sm mb-1">Status</h3>
              <p className="text-muted-foreground">{activity.status}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};