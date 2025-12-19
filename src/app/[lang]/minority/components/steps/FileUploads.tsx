// "use client";

import React, { useState } from "react";
import { StepProps, MembershipFormData } from "@/types/membership";
import { uploadApi } from "@/lib/apiHelper";

interface UploadProgress {
  [key: string]: number;
}

interface UploadedFile {
  url: string;
  fileName: string;
  uploadedAt: string;
}

export const FileUploadStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  // onNext,
  // onPrevious,
  loading,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleFileChange = async (
    name: keyof MembershipFormData,
    file: File | null
  ) => {
    if (!file) return;

    try {
      setUploading(true);
      setUploadingField(name as string);
      setProgress((prev) => ({ ...prev, [name]: 0 }));

      const formDataObj = new FormData();
      formDataObj.append("image", file);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const currentProgress = prev[name] || 0;
          if (currentProgress < 90) {
            return { ...prev, [name]: currentProgress + 10 };
          }
          return prev;
        });
      }, 100);

      // uploadApi only takes formData
      const imageUrl = await uploadApi.uploadImage(formDataObj);

      clearInterval(progressInterval);
      setProgress((prev) => ({ ...prev, [name]: 100 }));

      if (imageUrl) {
        const uploadedFile: UploadedFile = {
          url: imageUrl,
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
        };

        setFormData((prev) => ({ 
          ...prev, 
          [name]: imageUrl,
          // Also store file metadata if needed
          [`${name}Meta`]: uploadedFile 
        }));
        
        console.log(`🔗 File uploaded: ${name} → ${imageUrl}`);
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
      setUploadingField(null);
      setTimeout(() => {
        setProgress((prev) => ({ ...prev, [name]: 0 }));
      }, 1000);
    }
  };

  const handleDeleteFile = (name: keyof MembershipFormData) => {
    setFormData((prev) => ({ 
      ...prev, 
      [name]: "",
      [`${name}Meta`]: null 
    }));
    console.log(`🗑️ File deleted: ${name}`);
  };

  const handleReplaceFile = (name: keyof MembershipFormData) => {
    // Trigger file input click
    const fileInput = document.getElementById(`file-${name}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  // Function to get all uploaded URLs for submission
  // const getUploadedUrls = () => {
  //   const urls = {
  //     govtIdFront: formData.govtIdFront || "",
  //     govtIdBack: formData.govtIdBack || "",
  //     photo: formData.photo || "",
  //   };
    
  //   console.log("📋 Uploaded URLs:", urls);
  //   return urls;
  // };

  // Function to check if all files are uploaded
  const areAllFilesUploaded = () => {
    return formData.govtIdFront && formData.govtIdBack && formData.photo;
  };

  // Handle form submission - prepare URLs for parent component
  // const handleFormSubmit = () => {
  //   const uploadedUrls = getUploadedUrls();
    
  //   // Update formData with clean URLs structure for submission
  //   const updatedFormData = {
  //     ...formData,
  //     // Ensure URLs are properly set
  //     govtIdFront: uploadedUrls.govtIdFront,
  //     govtIdBack: uploadedUrls.govtIdBack,
  //     photo: uploadedUrls.photo,
  //     // Add a summary object for easier access
  //     uploadedFiles: uploadedUrls,
  //   };
    
  //   // Update parent component's formData
  //   setFormData(updatedFormData);
    
  //   // Trigger parent's submit logic
  //   if (onNext) {
  //     onNext(updatedFormData);
  //   }
    
  //   console.log("🚀 Form submitted with URLs:", uploadedUrls);
  // };

  const fileFields: {
    name: keyof MembershipFormData;
    label: string;
    accept: string;
    required?: boolean;
  }[] = [
    {
      name: "govtIdFront",
      label: "Government ID Front",
      accept: ".jpg,.jpeg,.png,.pdf",
      required: true,
    },
    {
      name: "govtIdBack",
      label: "Government ID Back",
      accept: ".jpg,.jpeg,.png,.pdf",
      required: true,
    },
    {
      name: "photo",
      label: "Profile Photo",
      accept: ".jpg,.jpeg,.png",
      required: true,
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Documents / દસ્તાવેજ અપલોડ કરો
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fileFields.map((field) => (
          <div key={field.name} className="border rounded-lg p-4 bg-gray-50">
            <label className="block font-medium mb-2 text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {!formData[field.name] ? (
              // Upload state
              <div className="space-y-2">
                <input
                  id={`file-${field.name}`}
                  type="file"
                  accept={field.accept}
                  disabled={uploading || loading}
                  onChange={(e) =>
                    handleFileChange(field.name, e.target.files?.[0] || null)
                  }
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                
                {uploadingField === field.name && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress[field.name] || 0}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ) : (
              // Uploaded state
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 text-sm">✅ Uploaded</span>
                    <span className="text-xs text-gray-500">
                      ({(formData as any)[`${field.name}Meta`]?.fileName || 'File uploaded'})
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleReplaceFile(field.name)}
                      disabled={uploading || loading}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(field.name)}
                      disabled={uploading || loading}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Preview link (optional) */}
                <a
                  href={formData[field.name] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  View uploaded file
                </a>
                
                {/* Hidden file input for replace functionality */}
                <input
                  id={`file-${field.name}`}
                  type="file"
                  accept={field.accept}
                  disabled={uploading || loading}
                  onChange={(e) =>
                    handleFileChange(field.name, e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upload Summary & Navigation */}
      <div className="mt-6 space-y-4">
        {/* Upload Status */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Upload Status</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {fileFields.map((field) => (
              <div key={field.name} className="flex items-center space-x-2">
                <span className={formData[field.name] ? "text-green-600" : "text-gray-400"}>
                  {formData[field.name] ? "✅" : "⏳"}
                </span>
                <span className="text-gray-700">{field.label}</span>
              </div>
            ))}
          </div>
          
          {areAllFilesUploaded() && (
            <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded text-green-800 text-sm">
              All documents uploaded successfully! Ready to submit.
            </div>
          )}
          
          {!areAllFilesUploaded() && (
            <div className="mt-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-sm">
              Please upload all required documents to continue.
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {/* <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            disabled={loading}
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={loading || uploading || !areAllFilesUploaded()}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div> */}
      </div>

      {/* Debug info (remove in production) */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 border rounded text-xs">
          <details>
            <summary className="cursor-pointer font-medium">Debug: View URLs</summary>
            <pre className="mt-2 overflow-auto">
              {JSON.stringify(getUploadedUrls(), null, 2)}
            </pre>
          </details>
        </div>
      )} */}
    </div>
  );
};

// Export helper function to get uploaded URLs from form data
export const getUploadedFileUrls = (formData: MembershipFormData) => {
  return {
    govtIdFront: formData.govtIdFront || "",
    govtIdBack: formData.govtIdBack || "",
    photo: formData.photo || "",
  };
};

// Export helper function to validate all files are uploaded
export const validateAllFilesUploaded = (formData: MembershipFormData) => {
  const urls = getUploadedFileUrls(formData);
  const missingFiles = Object.entries(urls)
  .filter(([, url]) => !url)
  .map(([key]) => key);

    
  return {
    isValid: missingFiles.length === 0,
    missingFiles,
    urls,
  };
};