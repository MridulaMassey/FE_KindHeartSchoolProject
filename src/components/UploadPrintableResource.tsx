import React, { useState } from "react";

const UploadPrintableResource: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const uploadResponse = await fetch("https://localhost:44361/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       const preview = uploadData.previewUrl;
//       setPreviewUrl(preview);

//       // Now submit printable resource info
//       const resource = {
//         title,
//         description,
//         fileUrl: preview, // you can use `downloadUrl` if you prefer
//       };

//       const createResponse = await fetch("https://localhost:44361/api/PrintableResource/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(resource),
//       });

//       const createData = await createResponse.json();
//       setSuccessMessage(createData.message);
//       setTitle("");
//       setDescription("");
//       setFile(null);
//     } catch (error) {
//       console.error("Upload failed:", error);
//       alert("There was an error uploading the resource.");
//     }
//   };
const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      // Upload to Google Drive
      const uploadResponse = await fetch("https://localhost:44361/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.previewUrl; // or uploadData.downloadUrl if preferred
  
      // 🔑 Get teacherId from localStorage (e.g. after login)
      const teacherId = localStorage.getItem("teacherId"); // store this on login
      console.log("Fetched teacherId:", teacherId);
        //localStorage.setItem("teacherId", teacherId);

  
      if (!teacherId) {
        alert("Teacher ID not found. Please login again.");
        return;
      }
  
      // Build payload
      const resource = {
        title,
        description,
        fileUrl,
        teacherId,
        classGroupId: null,
        subjectId: null
      };
  
      // Submit to PrintableResource API
      const createResponse = await fetch("https://localhost:44361/api/PrintableResource/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource),
      });
  
      if (createResponse.ok) {
        const data = await createResponse.json();
        setSuccessMessage(data.message || "Resource uploaded successfully.");
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        const errorText = await createResponse.text();
        console.error("API error:", errorText);
        alert("Error uploading resource: " + errorText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("There was an error uploading the resource.");
    }
  };
  
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-600">📤 Upload Printable Resource</h2>

      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Enter resource title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter a brief description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        className="w-full p-2"
        accept=".pdf,.jpg,.png"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleUpload}
      >
        Upload & Save
      </button>

      {previewUrl && (
        <div className="mt-4">
          <p className="font-semibold">🔍 Preview:</p>
          <iframe
            src={previewUrl}
            width="100%"
            height="300"
            className="rounded border"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 text-green-700 font-semibold">{successMessage}</div>
      )}
    </div>
  );
};

export default UploadPrintableResource;
