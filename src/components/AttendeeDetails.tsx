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
import { useRouter } from "next/navigation";

const AttendeeDetails = ({
  onSubmit,
  onValidityChange
}: AttendeeDetailsProps) => {
  const { currentTicket, updateCurrentTicket } = useTicketStore();
  const router = useRouter();

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

  // Check if the ticket section is valid
  useEffect(() => {
    if (
      !currentTicket?.event ||
      !currentTicket.ticketType ||
      !currentTicket.price ||
      !currentTicket.numberOfTickets
    ) {
      // Redirect to step 1 if the ticket section is invalid
      router.push("/?step=1");
    }
  }, [currentTicket, router]);

  const onSubmitHandler = (data: AttendeeFormValues) => {
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
    const subscription = form.watch((values) => {
      const isValid = !!values.name && !!values.email && !!values.image;
      onValidityChange?.(isValid);
      if (isValid) {
        updateCurrentTicket({
          attendee: values as AttendeeFormValues
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, onValidityChange, updateCurrentTicket]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-6 w-full"
      >
        <ImageUploader
          onImageUpload={(url) => {
            form.setValue("image", url);
          }}
          initialImage={currentTicket?.attendee?.image}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Enter your name</FormLabel>
              <FormControl>
                <Input
                  className="text-white"
                  placeholder="Your name"
                  {...field}
                />
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
              <FormLabel className="text-white">Enter your email *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    className="pl-10 text-white"
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
              <FormLabel className="text-white">Special request?</FormLabel>
              <FormControl>
                <Textarea
                  className="text-white"
                  placeholder="Your message..."
                  {...field}
                />
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
