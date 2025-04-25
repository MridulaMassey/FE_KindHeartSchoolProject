
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Filter, 
  Search,
  ChevronRight,
  Check,
  AlertCircle,
  Star,
  Plus,
  Trash2,
  Users
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { activitystudentClassGroupService } from './classGroupActivityStudentService';

interface Student {
  id: string;
  name: string;
}

// Interface that matches the API response structure
interface ActivityData {
  activityId: string;
  studentId: string;
  studentUsername: string;
  activityActivityName: string;
  classGroupSubjectClassGroupClassName: string;
  status?: string; // Added by our service for UI purposes
}

const ClassGroupSubjectStudentActivity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const { activityId } = useParams<{ activityId: string }>();
  const [filteredActivities, setFilteredActivities] = useState<ActivityData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const data = await activitystudentClassGroupService.getClassGroupActivities(activityId);
        console.log("The data from classGroupActivityService is:", data);
        
        setActivities(data);
        setFilteredActivities(data);
        
        // Extract unique students from activities based on new data structure
        const uniqueStudents = Array.from(
          new Set(
            data.map(activity => ({
              id: activity.studentId,
              name: activity.studentUsername
            }))
          ),
          student => JSON.stringify(student)
        ).map(str => JSON.parse(str));
        
        setStudents(uniqueStudents);
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        toast.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    let result = activities;

    if (searchQuery) {
      result = result.filter(activity => 
        (activity.activityActivityName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
        (activity.studentUsername?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
      );
    }

    if (classFilter !== 'all') {
      result = result.filter(activity => 
        activity.classGroupSubjectClassGroupClassName === classFilter
      );
    }

    if (studentFilter !== 'all') {
      result = result.filter(activity => 
        activity.studentId === studentFilter
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(activity => activity.status === statusFilter);
    }

    setFilteredActivities(result);
    setCurrentPage(1);
  }, [activities, searchQuery, classFilter, statusFilter, studentFilter]);

  // Extract unique class names from the new data structure
  const classes = ['all', ...new Set(activities.map(activity => 
    activity.classGroupSubjectClassGroupClassName
  ).filter(Boolean))];

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  
  const renderSkeleton = () => {
    return Array(5).fill(null).map((_, index) => (
      <div key={index} className="bg-background border rounded-md p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'Submitted':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Check className="h-3 w-3 mr-1" />
            Submitted
          </Badge>
        );
      case 'Graded':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Star className="h-3 w-3 mr-1" />
            Graded
          </Badge>
        );
      case 'Overdue':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || 'Unknown'}</Badge>;
    }
  };

  const handleDeleteActivity = async (activityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setActivities(activities.filter(activity => 
        activity.activityId !== activityId
      ));
      toast.success("Activity deleted successfully");
    } catch (error) {
      console.error("Failed to delete activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">School Management System</h1>
        </div>
      </div>
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <section className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  <Users className="h-7 w-7 text-primary" />
                  Student Activities
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage student activities across different classes
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button className="gap-1" onClick={() => navigate('/create-activity')}>
                  <Plus className="h-4 w-4" />
                  Create Activity
                </Button>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Saturday, April 12, 2025
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name, activity name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select value={studentFilter} onValueChange={setStudentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{studentFilter === 'all' ? 'All Students' : students.find(s => s.id === studentFilter)?.name || 'Unknown'}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="all-students" value="all">All Students</SelectItem>
                      {students.map(student => (
                        <SelectItem key={`student-${student.id}`} value={student.id}>{student.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>{classFilter === 'all' ? 'All Classes' : classFilter}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="all-classes" value="all">All Classes</SelectItem>
                      {classes.filter(c => c !== 'all').map(classItem => (
                        <SelectItem key={`class-${classItem}`} value={classItem}>{classItem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="status-all" value="all">All Status</SelectItem>
                      <SelectItem key="status-pending" value="Pending">Pending</SelectItem>
                      <SelectItem key="status-submitted" value="Submitted">Submitted</SelectItem>
                      <SelectItem key="status-graded" value="Graded">Graded</SelectItem>
                      <SelectItem key="status-overdue" value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  renderSkeleton()
                ) : paginatedActivities.length > 0 ? (
                  paginatedActivities.map((activity, index) => (
                    <Card
                      key={`activity-${activity.activityId}-${activity.studentId}-${index}`}
                      className="hover:border-primary/40 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/teacherassignmentdetails/${activity.activityId}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{activity.activityActivityName}</h3>
                            {getStatusBadge(activity.status || 'Pending')}
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Student:</span> 
                              <span>{activity.studentUsername}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Class:</span> 
                              <span>{activity.classGroupSubjectClassGroupClassName}</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mt-4 pt-2 border-t">
                            <div className="flex items-center gap-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete activity?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete this 
                                      activity and remove it from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={(e) => handleDeleteActivity(activity.activityId, e)}
                                      className="bg-destructive text-destructive-foreground"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/teacherassignmentdetails/${activity.activityId}/${activity.studentId}`);
                                }}
                              >
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No activities found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                )}
              </div>
              
              {filteredActivities.length > 0 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={`page-${i+1}`}>
                          <PaginationLink 
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <div className="bg-muted py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 School Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ClassGroupSubjectStudentActivity;