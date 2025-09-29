import { useEffect, useState } from "react";
import { Upload, FileText, Download, Calendar, User, Lightbulb, Trash } from "lucide-react";
import { DocumentManager, ResumeFile } from "@antares/infra/documents";

export function Resume() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Header />
      <UploadSection />
      <CurrentResumeSection />
      <TipsSection />
    </div>
  );
}

function Header() {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold text-foreground">Base Resume</h1>
      <p className="text-muted-foreground">
        Upload and manage your base resume. We'll use this as the foundation for all your tailored resumes.
      </p>
    </div>
  );
}

function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const docxFile = files.find(file => file.name.toLowerCase().endsWith('.docx'));

    if (!docxFile) return alert("Please upload a .docx file");

    await uploadFile(docxFile);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
  }

  async function uploadFile(file: File) {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(function () {
        setUploadProgress(prev => Math.min(prev + 20, 90));
      }, 200);

      await DocumentManager.saveBaseResume(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 
          ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : ""}
          ${!isDragging && isUploading ? "border-primary bg-primary/5" : ""}
          ${!isDragging && !isUploading ? "border-border hover:border-primary/50 hover:bg-accent/5" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <UploadProgress uploadProgress={uploadProgress} />
        ) : (
          <UploadUI isDragging={isDragging} onFileSelect={handleFileSelect} />
        )}
      </div>
    </div>
  );
}

function UploadProgress({ uploadProgress }: { uploadProgress: number; }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Upload className="h-12 w-12 text-primary animate-pulse" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium text-foreground">Uploading Resume...</p>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
      </div>
    </div>
  );
}

function UploadUI(
  { isDragging, onFileSelect }: {
    isDragging: boolean;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Upload className={`h-12 w-12 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium text-foreground">
          {isDragging ? "Drop your resume here!" : "Drag & drop your resume"}
        </p>
        <p className="text-sm text-muted-foreground">
          Supports .docx files only
        </p>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm text-muted-foreground">or</span>
      </div>
      <label className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 cursor-pointer">
        <FileText className="h-4 w-4" />
        Browse Files
        <input
          type="file"
          accept=".docx"
          onChange={onFileSelect}
          className="sr-only"
        />
      </label>
    </div>
  );
}

function CurrentResumeSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Current Resume</h2>
      </div>
      <ResumeCard />
    </div>
  );
}

function ResumeCard() {
  const [data, setData] = useState<ResumeFile | null>(null);

  useEffect(() => {
    async function fetchResume() {
      if (data) return;
      const content = await DocumentManager.getResumeFile();
      if (content) setData(content);
    }
    fetchResume();
  }, []);

  if (!data) return;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-card-foreground">
              {data.metadata.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Uploaded {data.metadata.created_at.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {data.metadata.page_count} {data.metadata.page_count === 1 ? "page" : "pages"}
              </div>
              <span>{data.metadata.size_in_bytes} bytes</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2"
            onClick={() => { }}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:bg-red-600 hover:text-red-100 px-4 py-2"
            onClick={() => { }}
          >
            Delete
            <Trash className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

function TipsSection() {
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
      <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
        <Lightbulb className="h-4 w-4" />
        Tips for best results:
      </h3>
      <ul className="text-sm text-muted-foreground space-y-1">
        <li>• Use a well-formatted .docx resume with clear sections</li>
        <li>• Ensure your contact information is at the top</li>
        <li>• Include clear section headers (Experience, Education, Skills, etc.)</li>
        <li>• Use bullet points for achievements and responsibilities</li>
      </ul>
    </div>
  );
}