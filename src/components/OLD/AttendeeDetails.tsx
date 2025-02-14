// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { attendeeSchema, AttendeeData } from "@/lib/schema";
// import { useTicketStore } from "../../../store";
// import FormWrapper from "../FormWrapper";
// import { FormField, FormLabel, FormMessage, FormControl } from "../ui/form";
// import { Input } from "../ui/input";
// import { Mail } from "lucide-react";
// import { Textarea } from "../ui/textarea";
// import ImageUploader from "./ImageUpload";

// const AttendeeDetails = () => {
//   const { ticketData, updateData, setStep } = useTicketStore();
//   const form = useForm<AttendeeData>({
//     resolver: zodResolver(attendeeSchema),
//     defaultValues:
//       Array.isArray(ticketData.attendees) && ticketData.attendees.length > 0
//         ? ticketData.attendees[0] // Extract the first attendee object
//         : {
//             name: "",
//             email: "",
//             request: "",
//             image: ""
//           }
//   });

//   const onSubmit = (data: AttendeeData) => {
//     updateData({ attendees: data });
//     setStep(3);
//   };

//   return (
//     <FormWrapper
//       title="Attendee Information"
//       currentStep={2}
//       totalSteps={3}
//       onAction={(action) => {
//         if (action === "back") setStep(1);
//         if (action === "generate my ticket") form.handleSubmit(onSubmit)();
//       }}
//     >
//       <div className="space-y-8 w-full">
//         {/* Image Upload */}
//         <FormField
//           control={form.control}
//           name="image"
//           render={({}) => (
//             <div className="space-y-4">
//               <FormLabel>Profile Photo</FormLabel>
//               <FormControl>
//                 <ImageUploader name="image" />
//               </FormControl>
//               <FormMessage>{form.formState.errors.image?.message}</FormMessage>
//             </div>
//           )}
//         />

//         {/* Name Input */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <div className="space-y-4">
//               <FormLabel>Name</FormLabel>
//               <Input
//                 {...field}
//                 className="bg-[#07373F] text-white"
//                 placeholder="Your name"
//               />
//               <FormMessage>{form.formState.errors.name?.message}</FormMessage>
//             </div>
//           )}
//         />

//         {/* Email Input */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <div className="space-y-4">
//               <FormLabel>Email</FormLabel>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <Input
//                   {...field}
//                   className="pl-10 bg-[#07373F] text-white"
//                   placeholder="hello@example.com"
//                 />
//               </div>
//               <FormMessage>{form.formState.errors.email?.message}</FormMessage>
//             </div>
//           )}
//         />

//         {/* Special Request */}
//         <FormField
//           control={form.control}
//           name="request"
//           render={({ field }) => (
//             <div className="space-y-4">
//               <FormLabel>Special Request</FormLabel>
//               <Textarea
//                 {...field}
//                 className="bg-[#07373F] text-white"
//                 placeholder="Your message..."
//               />
//               <FormMessage>
//                 {form.formState.errors.request?.message}
//               </FormMessage>
//             </div>
//           )}
//         />
//       </div>
//     </FormWrapper>
//   );
// };

// export default AttendeeDetails;
