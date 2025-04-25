import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowLeft, Calendar, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import TeacherSidebar from '../components/layout/TeacherSidebar';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Define the proper interface for class groups from API
interface ClassGroup {
  id: string;
  name: string;
  classGroupSubjectId: string;
  subjectId: string;
  subjectName: string;
}

// Define the interface for subject data
interface Subject {
  id: string;
  name: string;
}

// Define the interface for the CreateActivityRequest
interface CreateActivityRequest {
  title: string;
  description: string;
  activityName: string;
  dueDate: string;
  classGroupId: string;
  teacherId: string;
  subjectId?: string;
  pdfFileBase64?: string;
  weightagePercent?: number;
  fileName?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

// const activityFormSchema = z.object({
//   title: z
//     .string()
//     .min(2, { message: "Title must be at least 2 characters long" })
//     .max(100, { message: "Title must be less than 100 characters" }),
//   description: z
//     .string()
//     .min(10, { message: "Description must be at least 10 characters long" })
//     .max(1000, { message: "Description must be less than 1000 characters" }),
//   dueDate: z.date({
//     required_error: "Due date is required",
//   }),
//   classGroupId: z.string().min(1, { message: "Please select a class level" }),
//   teacherId: z.string().min(1, { message: "Teacher ID is required" }),
//   activityName: z
//     .string()
//     .min(2, { message: "Activity name must be at least 2 characters long" })
//     .max(50, { message: "Activity name must be less than 50 characters" }),
//   subjectId: z.string().optional(), // Added subject ID field
// });

const activityFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  classGroupId: z.string().min(1, { message: "Please select a class level" }),
  teacherId: z.string().min(1, { message: "Teacher ID is required" }),
  activityName: z
    .string()
    .min(2, { message: "Activity name must be at least 2 characters long" })
    .max(50, { message: "Activity name must be less than 50 characters" }),
  subjectId: z.string().optional(), // Added subject ID field
  weightagePercent: z.number().min(1, { message: "Weightage must be at least 1" }).max(100, { message: "Weightage must be at most 100" }), // Add weightage validation
});

type ActivityFormValues = z.infer<typeof activityFormSchema>;

const CreateActivity = () => {
  const [classLevels, setClassLevels] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedClassGroupId, setSelectedClassGroupId] = useState<string>("");

  // // Create a set of unique subject IDs for the subject dropdown
  // const uniqueSubjects = React.useMemo(() => {
  //   const subjectMap = new Map<string, Subject>();

  
    
  //   classLevels.forEach(level => {
  //     if (!subjectMap.has(level.subjectId)) {
  //       subjectMap.set(level.subjectId, {
  //         id: level.subjectId,
  //         name: level.subjectName
  //       });
  //     }
  //   });
    

  //   return Array.from(subjectMap.values());
  // }, [classLevels]);

 // Filter subjects based on the selected class group ID
 const availableSubjects = React.useMemo(() => {
  if (!selectedClassGroupId) {
    return [];
  }
  
  // Filter for subjects that are associated with the selected class group
  const subjects = classLevels
    .filter(level => level.id === selectedClassGroupId)
    .map(level => ({
      id: level.subjectId,
      name: level.subjectName
    }));
  
  // Remove duplicates by creating a Map using subjectId as key
  const subjectMap = new Map<string, Subject>();
  subjects.forEach(subject => {
    if (!subjectMap.has(subject.id)) {
      subjectMap.set(subject.id, subject);
    }
  });
  
  return Array.from(subjectMap.values());
}, [selectedClassGroupId, classLevels]);

  // const defaultValues: Partial<ActivityFormValues> = {
  //   title: "",
  //   description: "",
  //   dueDate: undefined,
  //   classGroupId: "",
  //   teacherId: "F7400196-CDEB-49ED-11BA-08DD64CD7D35", // Default teacher ID
  //   activityName: "",
  //   subjectId: "", // Default empty subject ID
  // };


  const defaultValues: Partial<ActivityFormValues> = {
    title: "",
    description: "",
    dueDate: undefined,
    classGroupId: "",
    teacherId: "F7400196-CDEB-49ED-11BA-08DD64CD7D35", // Default teacher ID
    activityName: "",
    subjectId: "", // Default empty subject ID
    weightagePercent: 50, // Default weightage value
  };
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues,
  });

// Reset the subject field when the class group changes
const handleClassGroupChange = (value: string) => {
  setSelectedClassGroupId(value);
  form.setValue("classGroupId", value);
  form.setValue("subjectId", ""); // Reset subject when class group changes
};

  const onSubmit = async (data: ActivityFormValues) => {
    setIsSubmitting(true);
    console.log("Form data before submission:", data);
    
    try {
      const requestData: CreateActivityRequest = {
        title: data.title,
        description: data.description,
        activityName: data.activityName,
        dueDate: data.dueDate.toISOString(),
        classGroupId: data.classGroupId,
        teacherId: data.teacherId,
        weightagePercent: data.weightagePercent, // Add weightage to the request
      };
      
      // Add subject ID to request if selected
      if (data.subjectId) {
        requestData.subjectId = data.subjectId;
      }
      
      if (fileBase64 && fileName) {
        requestData.pdfFileBase64 = fileBase64;
        requestData.fileName = fileName;
        console.log("Including PDF file as base64 string");
      }
      
      console.log("Submitting activity with JSON structure matching C# model");
      
      const response = await fetch("https://localhost:44361/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Failed to create activity: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("API response:", result);
      
      toast.success("Activity created successfully!", {
        description: "Your new activity has been saved.",
        duration: 5000,
      });
      
      navigate("/activitiespagination");
    } catch (error) {
      console.error("Error creating activity:", error);
      toast.error("Failed to create activity", {
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/TeacherDashboard");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      
      try {
        const base64 = await convertFileToBase64(file);
        setFileBase64(base64);
        console.log("File converted to base64 successfully:", file.name);
      } catch (error) {
        console.error("Error converting file to base64:", error);
        toast.error("Error processing file", {
          description: "Please try another file or contact support.",
        });
      }
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const fetchClassLevels = async () => {
      setLoading(true);
      try {
        // Fetch class groups with subject information
        const response = await fetch("https://localhost:44361/api/ClassGroupSubject/classgroupslist");
        if (!response.ok) {
          throw new Error("Failed to fetch class levels");
        }
        const data = await response.json();
  
        // Map all fields from the API response
        const extractedClassLevels = data.map((item: { 
          classGroupSubjectId: string;
          classGroupId: string; 
          classGroupClassName: string;
          subjectId: string;
          subjectSubjectName: string;
        }) => ({
          id: item.classGroupId,
          name: item.classGroupClassName,
          subjectId: item.subjectId,
          subjectName: item.subjectSubjectName
        }));
  
        console.log("Mapped class levels with subject names:", extractedClassLevels);
        setClassLevels(extractedClassLevels);
        //check console output TEMP code
        console.log("Full response from API:", data); 
        console.log("Extracted classLevels:", extractedClassLevels);
        console.log("Unique Subjects:", uniqueSubjects);

      } catch (error) {
        console.error("Error fetching class levels:", error);
        toast.error("Failed to load class levels", {
          description: "Please refresh the page or try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassLevels();
  }, []);

  return (
    <div className="flex h-screen bg-muted">
    {/* Sidebar stays as-is */}
    <TeacherSidebar />
  
    {/* Content */}
    <div className="flex-1 overflow-y-auto px-6 py-8 animate-fade-in">
      <div className="max-w-3xl mx-6 space-y-5">
  
        {/* Back Button */}
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="group hover:bg-accent transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
        </div>
  
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Create Activity</h1>
          <p className="text-sm text-muted-foreground">Design and assign a new learning activity.</p>
        </div>
  
        {/* Form Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
  
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Kindness Tree Project" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Activity Name */}
              <FormField
                control={form.control}
                name="activityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., DIY Kindness Tree " {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Explain the activity..."
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                    control={form.control}
                    name="weightagePercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weightage</FormLabel>
                        <FormControl>
                        <Input
  type="number"
  placeholder="Enter weightage (1-100)"
  {...field}
  onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    // Ensure value is between 1 and 100
    if (!isNaN(value)) {
      const clampedValue = Math.max(1, Math.min(value, 100));
      field.onChange(clampedValue);
    } else {
      field.onChange("");
    }
  }}
  className="h-12"
/>

                        </FormControl>
                        <FormDescription>
                          The weightage of this activity (value between 1-100)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
              {/* File Upload */}
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="h-10"
                />
                {selectedFile && (
                  <p className="text-xs text-green-600 mt-1">Selected: {selectedFile.name}</p>
                )}
              </FormItem>
  
              {/* Class & Due Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Class Group */}
                {/* <FormField
                  control={form.control}
                  name="classGroupId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classLevels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                   <FormField
                      control={form.control}
                      name="classGroupId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Level</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              // Only set the values if it's a valid selection (not placeholder)
                              if (value && value !== "placeholder") {
                                handleClassGroupChange(value);
                              } else {
                                // If placeholder is selected, clear the values
                                setSelectedClassGroupId("");
                                form.setValue("classGroupId", "");
                                form.setValue("subjectId", "");
                              }
                            }} 
                            value={field.value || "placeholder"}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select a class level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="placeholder" disabled>Select a class level</SelectItem>
                              {classLevels
                                .filter((level, index, self) => 
                                  index === self.findIndex(l => l.id === level.id)
                                )
                                .map((level) => (
                                  <SelectItem 
                                    key={level.id} 
                                    value={level.id}
                                  >
                                    {level.name}
                                  </SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select a class level for this activity
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
  
                {/* Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "h-10 w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="p-3"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Subject Dropdown */}
              {/* <FormField
                control={form.control}
                name="subjectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uniqueSubjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                  <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value || "placeholder"}
                          disabled={!selectedClassGroupId}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder={selectedClassGroupId ? "Select a subject" : "First select a class level"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="placeholder" disabled>
                              {selectedClassGroupId ? "Select a subject" : "First select a class level"}
                            </SelectItem>
                            {availableSubjects.length > 0 ? (
                              availableSubjects.map((subject) => (
                                <SelectItem 
                                  key={subject.id} 
                                  value={subject.id}
                                >
                                  {subject.name}
                                </SelectItem>
                              ))
                            ) : (
                              selectedClassGroupId && (
                                <SelectItem value="none" disabled>
                                  No subjects available for this class
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {selectedClassGroupId 
                            ? "Select a subject for this activity" 
                            : "Please select a class level first"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Activity"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  </div>
  

//     <div className="flex h-screen">
//       <TeacherSidebar />
//     <div className="flex-1 overflow-y-auto bg-background py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
//         <div className="max-w-3xl mx-auto">
//           <Button
//           variant="ghost"
//           size="sm"
//           onClick={handleCancel}
//           className="mb-6 group hover:bg-accent transition-all duration-300"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform" />
//           Back to Activities
//         </Button>
        
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="space-y-6">
      
//           <motion.div variants={itemVariants}>
//             <div className="space-y-2">
//               <h1 className="text-3xl font-medium tracking-tight">Create New Activity</h1>
//               <p className="text-muted-foreground">
//                 Design a new learning activity for your students.
//               </p>
//             </div>
//           </motion.div>

//           <div className="bg-card rounded-xl p-8 shadow-sm border">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <motion.div variants={itemVariants}>
//                   <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Title</FormLabel>
//                         <FormControl>
//                           <Input 
//                             placeholder="e.g., Object-Oriented Programming" 
//                             {...field} 
//                             className="h-12"
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           The main title of your activity
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <FormField
//                     control={form.control}
//                     name="activityName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Activity Name</FormLabel>
//                         <FormControl>
//                           <Input 
//                             placeholder="e.g., Activity2Project" 
//                             {...field} 
//                             className="h-12"
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           A short name for referencing this activity
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Description</FormLabel>
//                         <FormControl>
//                           <Textarea 
//                             placeholder="Provide details about this activity..."
//                             className="min-h-[120px] resize-none"
//                             {...field} 
//                           />
//                         </FormControl>
//                         <FormDescription>
//                           Detailed explanation of the activity and its objectives
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </motion.div>

//                 <motion.div variants={itemVariants}>
//                   <FormItem>
//                     <FormLabel>Upload PDF File</FormLabel>
//                     <Input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleFileChange}
//                       className="h-12"
//                     />
//                     <FormDescription>
//                       Upload your activity document (PDF, DOC, or DOCX format)
//                     </FormDescription>
//                     {selectedFile && (
//                       <p className="text-sm text-green-600 mt-1">
//                         File selected: {selectedFile.name}
//                       </p>
//                     )}
//                   </FormItem>
//                 </motion.div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <motion.div variants={itemVariants}>
//                     <FormField
//                       control={form.control}
//                       name="classGroupId"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Class Level</FormLabel>
//                           <Select 
//                             onValueChange={field.onChange} 
//                             defaultValue={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger className="h-12">
//                                 <SelectValue placeholder="Select a class level" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {classLevels.map((level) => (
//                                 <SelectItem 
//                                   key={level.id} 
//                                   value={level.id}
//                                 >
//                                   {level.name}
//                                 </SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>
//                             The grade level for this activity
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>

//                   <motion.div variants={itemVariants}>
//                     <FormField
//                       control={form.control}
//                       name="dueDate"
//                       render={({ field }) => (
//                         <FormItem className="flex flex-col">
//                           <FormLabel>Due Date</FormLabel>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <FormControl>
//                                 <Button
//                                   variant={"outline"}
//                                   className={cn(
//                                     "h-12 w-full justify-start text-left font-normal",
//                                     !field.value && "text-muted-foreground"
//                                   )}
//                                 >
//                                   <Calendar className="mr-2 h-4 w-4" />
//                                   {field.value ? (
//                                     format(field.value, "PPP")
//                                   ) : (
//                                     <span>Select a date</span>
//                                   )}
//                                 </Button>
//                               </FormControl>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-0" align="start">
//                               <CalendarComponent
//                                 mode="single"
//                                 selected={field.value}
//                                 onSelect={field.onChange}
//                                 initialFocus
//                                 disabled={(date) => date < new Date()}
//                                 className="p-3 pointer-events-auto"
//                               />
//                             </PopoverContent>
//                           </Popover>
//                           <FormDescription>
//                             When this activity is due for submission
//                           </FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </motion.div>
//                 </div>

//                 {/* Subject Dropdown */}
//                 <motion.div variants={itemVariants}>
//                   <FormField
//                     control={form.control}
//                     name="subjectId"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Subject</FormLabel>
//                         <Select 
//                           onValueChange={field.onChange} 
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="h-12">
//                               <SelectValue placeholder="Select a subject" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {uniqueSubjects.map((subject) => (
//                               <SelectItem 
//                                 key={subject.id} 
//                                 value={subject.id}
//                               >
//                                 {subject.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                         <FormDescription>
//                           The subject for this activity
//                         </FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </motion.div>

//                 <div className="pt-6 flex justify-end space-x-4">
//                   <Button 
//                     type="button"
//                     variant="outline"
//                     onClick={handleCancel}
//                     disabled={isSubmitting}
//                     className="h-11 px-6"
//                   >
//                     <X className="mr-2 h-4 w-4" />
//                     Cancel
//                   </Button>

//                   <Button 
//                     type="submit"
//                     className="h-11 px-6 bg-primary hover:bg-primary/90 transition-colors"
//                     disabled={isSubmitting}
//                   >
//                     <Save className="mr-2 h-4 w-4" />
//                     {isSubmitting ? "Saving..." : "Save Activity"}
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//    </div>
  );
};

export default CreateActivity;