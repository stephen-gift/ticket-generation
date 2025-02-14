import { AttendeeFormValues, attendeeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { AttendeeDetailsProps } from "../../types";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { Textarea } from "./ui/textarea";
import ImageUploader from "./ImageUpload";
import { useTicketStore } from "../../store";

const AttendeeDetails = ({
  onSubmit,
  onValidityChange
}: AttendeeDetailsProps) => {
  const { currentTicket, updateCurrentTicket } = useTicketStore();

  const form = useForm<AttendeeFormValues>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: currentTicket?.attendee ?? {
      name: "",
      email: "",
      request: "",
      image: ""
    },
    mode: "onChange"
  });

  const onSubmitHandler = (data: AttendeeFormValues) => {
    console.log("Form Data:", data);
    onSubmit(data);
  };

  useEffect(() => {
    const isValid = form.formState.isValid;
    onValidityChange?.(isValid);
  }, [form.formState.isValid, onValidityChange]);

  useEffect(() => {
    const Values = form.getValues();
    const isValid = !!Values.name && !!Values.email;
    onValidityChange?.(isValid);
  }, [form, onValidityChange]);

  useEffect(() => {
    if (currentTicket?.attendee) {
      form.reset(currentTicket.attendee);
    }
  }, [currentTicket?.attendee, form]);

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.isValid) {
        const data = form.getValues();
        updateCurrentTicket({
          attendee: data
        });
        onSubmit(data);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, onSubmit, updateCurrentTicket]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-6 w-full"
      >
        <ImageUploader
          onImageUpload={(url) => form.setValue("image", url)}
          initialImage={currentTicket?.attendee?.image}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your email *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="hello@example.com"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special request?</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AttendeeDetails;
