import { invoke } from '@tauri-apps/api/core';
import { DocumentManager, ResumeMetadata, ResumeMetadataSchema } from './types';

export const RustDocumentManager: DocumentManager = {
  async getResumeFile() {
    const result = await invoke<{ data: number[]; metadata: ResumeMetadata; }>('get_base_resume');
    if (!result) return null;

    const file = new File(
      [new Uint8Array(result.data)],
      result.metadata.name,
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    );
    result.metadata.created_at = new Date(result.metadata.created_at);
    const metadata = ResumeMetadataSchema.safeParse(result.metadata);
    if (!metadata.success) throw new Error("Invalid metadata received from backend");

    return { file, metadata: metadata.data };
  },
  async saveBaseResume(file: File) {
    if (!file.name.toLowerCase().endsWith('.docx')) throw new Error("Only .docx files are supported");
    const bytes = new Uint8Array(await file.arrayBuffer());
    return await invoke("save_base_resume", { data: bytes, name: file.name });
  }
};
