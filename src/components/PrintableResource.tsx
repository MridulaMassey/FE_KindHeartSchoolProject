import React, { useEffect, useState } from "react";

interface PrintableResource {
  id: string;
  title: string;
  fileUrl: string;
  description?: string;
  uploadDate: string;
}

const PrintableMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<PrintableResource[]>([]);

  useEffect(() => {
    fetch("https://localhost:44361/api/printableresource/all")
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.error("Failed to load resources:", err));
  }, []);

  return (
<div className="p-6 bg-white rounded-xl shadow-md border border-pink-200">
  {/* <h2 className="text-2xl font-bold text-red-600 mb-4">📄 Printable Materials</h2> */}

  <div className="overflow-y-auto max-h-[60vh]">
    <table className="w-full table-auto border-separate border-spacing-y-4">
      <thead className="sticky top-0 bg-white z-10">
        <tr className="text-left text-lg text-gray-800">
          <th className="p-2 w-[20%]">🎨 Resource</th>
          <th className="p-2 w-[60%]">📝 Description</th>
          <th className="p-2 w-[20%]">📥 Action</th>
        </tr>
      </thead>
      <tbody>
        {materials.map((item) => (
          <tr
            key={item.id}
            className="bg-yellow-50 hover:bg-yellow-100 transition rounded-lg shadow"
          >
            <td className="p-4 font-bold">{item.title}</td>
            <td className="p-4 text-sm">{item.description || "—"}</td>
            <td className="p-4">
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold"
                title="Click to download and print"
              >
                Download & Print
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default PrintableMaterials;
