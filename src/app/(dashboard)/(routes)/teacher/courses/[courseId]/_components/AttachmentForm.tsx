"use client";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { File, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { FileUpload } from "@/components/fileUpload";
import { Button } from "@/components/ui/button";

interface AttachmentFormProps {
  initialData: Course & { attachemnts: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
          {!isEditing && initialData.attachemnts?.length > 0 && (
            <>
              <div>
                <Pencil className="h-4 w-4 mr-2" />
                Edit attachemnt
              </div>
            </>
          )}
          {!isEditing && (
            <>
              {initialData.attachemnts?.length === 0 && (
                <p className="text-sm mt-2 text-slate-500 italic">
                  No Attachments yet
                </p>
              )}
              {initialData.attachemnts?.length > 0 && (
                <div className="space-y-2">
                  {initialData.attachemnts.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                    >
                      <File className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p className="text-xs line-clamp-1">{attachment.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <div>
          <FileUpload
            endPoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
