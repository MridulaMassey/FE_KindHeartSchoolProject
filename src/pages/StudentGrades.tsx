import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Info } from "lucide-react";

interface GradeInfo {
  letterGrade: string;
  classLevel: string;
  marks: string;
}

const gradeRanges: GradeInfo[] = [
  { letterGrade: 'A+', classLevel: '1st Class Pass', marks: '90-100' },
  { letterGrade: 'A', classLevel: '1st Class Pass', marks: '85-89.99' },
  { letterGrade: 'A-', classLevel: '1st Class Pass', marks: '80-84.99' },
  { letterGrade: 'B+', classLevel: '2nd Class Pass', marks: '75-79.99' },
  { letterGrade: 'B', classLevel: '2nd Class Pass', marks: '70-74.99' },
  { letterGrade: 'B-', classLevel: '2nd Class Pass', marks: '65-69.99' },
  { letterGrade: 'C+', classLevel: 'Pass', marks: '60-64.99' },
  { letterGrade: 'C', classLevel: 'Pass', marks: '55-59.99' },
  { letterGrade: 'C-', classLevel: 'Pass', marks: '50-54.99' },
  { letterGrade: 'AG', classLevel: 'Aegrotat Pass', marks: '-' },
  { letterGrade: 'P', classLevel: 'Ungraded Pass', marks: '-' }
];

interface StudentGrade {
  score: number;
}

const getGradeInfo = (score: number): GradeInfo => {
  return gradeRanges.find(grade => {
    if (grade.marks === '-') return false;
    const [min, max] = grade.marks.split('-').map(Number);
    return score >= min && score <= max;
  }) || gradeRanges[gradeRanges.length - 1]; // Default to last grade if no match found
};

const StudentGrades: React.FC = () => {
  const [studentGrade, setStudentGrade] = useState<StudentGrade | null>(null);
  const { toast } = useToast();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        if (!username) return;
        const responsestd = await fetch(`https://localhost:44361/api/Student/get-student-id/${username}`);
        if (!responsestd.ok) throw new Error("Failed to get student ID");
        const { studentId } = await responsestd.json();
        const response = await fetch(`https://localhost:44361/api/Grade/upcoming/${studentId}`);
        if (!response.ok) throw new Error('Failed to fetch grade');
        const data = await response.json();
        console.log(data);
        setStudentGrade(data);
      } catch (error) {
        console.error('Error fetching grade:', error);
        toast({
          title: "Failed to fetch grade",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    if (username) {
      fetchGrade();
    }
  }, [username, toast]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {studentGrade && (
          <AccordionItem value="current-grade">
            <AccordionTrigger className="flex items-center gap-2 text-2xl font-bold text-yellow-700">
              <FileText className="h-6 w-6" />
              My Current Grade
            </AccordionTrigger>
            <AccordionContent>
              <Card className="transform transition-all duration-300 hover:scale-[1.02] mt-4">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-6">
                      <div className="bg-purple-100 rounded-full p-8 shadow-lg">
                        <div className="text-xl font-bold text-purple-600">
                          {getGradeInfo(studentGrade.score).letterGrade}
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-medium text-gray-700">
                          {getGradeInfo(studentGrade.score).classLevel}
                        </div>
                        <div className="text-lg text-gray-500 mt-2">
                          Score: <span className="font-semibold">{studentGrade.score.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="grading-info">
          <AccordionTrigger className="flex items-center gap-2 text-2xl font-bold text-blue-700">
            <Info className="h-6 w-6" />
            Grading System Information
          </AccordionTrigger>
          <AccordionContent>
            <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow mt-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Grade Scale Reference</h3>
              </div>
              <div className="overflow-hidden rounded-b-lg">
                <div className="grid grid-cols-3 bg-gray-100 font-semibold text-gray-700">
                  <div className="p-3 border-b">Grade</div>
                  <div className="p-3 border-b">Achievement Level</div>
                  <div className="p-3 border-b">Score Range</div>
                </div>
                {gradeRanges.map((grade, index) => (
                  <div 
                    key={grade.letterGrade}
                    className={`grid grid-cols-3 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <div className="p-3 border-b font-medium text-purple-600">{grade.letterGrade}</div>
                    <div className="p-3 border-b">{grade.classLevel}</div>
                    <div className="p-3 border-b">{grade.marks}</div>
                  </div>
                ))}
              </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StudentGrades;