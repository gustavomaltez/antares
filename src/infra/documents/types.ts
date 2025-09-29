
import { z } from "zod";

export type ResumeMetadata = z.infer<typeof ResumeMetadataSchema>;
export const ResumeMetadataSchema = z.object({
  name: z.string(),
  created_at: z.date(),
  size_in_bytes: z.number(),
  page_count: z.number(),
});

export type ResumeFile = {
  file: File;
  metadata: ResumeMetadata;
};

export interface DocumentManager {
  getResumeFile(): Promise<ResumeFile | null>;
  saveBaseResume(file: File): Promise<string>;
}