// components/AwardCertificateModal.tsx
import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useStudentIdFromUserId } from '@/hooks/useStudentIdFromUserId';

interface Props {
  studentUserId: string;
  teacherId: string;
  onClose: () => void;
}

const AwardCertificateModal: React.FC<Props> = ({ studentUserId, teacherId, onClose }) => {
  const studentId = useStudentIdFromUserId(studentUserId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('File', file);

    try {
      const res = await fetch('https://localhost:44361/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setPreviewUrl(data.previewUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!previewUrl || !title || !description || !studentId) return;

    const certData = {
      title,
      description,
      certificateUrl: previewUrl,
      studentId,
      teacherId,
    };

    try {
      console.log("📤 Submitting certificate with data:", certData);
      const res = await fetch('https://localhost:44361/api/certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certData),
      });

      if (res.ok) {
        setSuccessMessage('🏆 Certificate successfully awarded!');
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      } else {
        console.error('Error awarding certificate');
      }
    } catch (error) {
      console.error('Failed to award certificate:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Award Certificate</h2>

        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4" />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4" />

        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-2" />
        <Button onClick={handleUpload} disabled={!file || uploading} className="mb-4">
          {uploading ? 'Uploading...' : 'Upload Certificate PDF'}
        </Button>

        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mb-4 block"
          >
            🔍 Preview Certificate
          </a>
        )}

        {successMessage && (
          <p className="text-green-600 font-medium mb-4 text-center">{successMessage}</p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!previewUrl || !title || !description}>Award</Button>
        </div>
      </div>
    </div>
  );
};

export default AwardCertificateModal;