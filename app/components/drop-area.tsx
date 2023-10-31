import React from "react";

type Props = {
  fileSelected?: (file: File | null) => void;
};

export function DropInputArea({ fileSelected }: Props) {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile: File | null = null;
    if (e.target.files && e.target.files.length > 0) {
      selectedFile = e.target.files[0];
    }
    if (selectedFile !== undefined && fileSelected) {
      fileSelected(selectedFile);
    }
  };

  return (
    <div className="bg-grey-lighter">
      <label
        className="w-64 flex flex-col items-center px-4 py-6 rounded-lg shadow-xl tracking-wide uppercase cursor-pointer border border-blue hover:text-blue-400 bg-blue-200"
        htmlFor="fileInput"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">
          Seleccioná un archivo!
        </span>
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleFileInputChange}
        />
      </label>
    </div>
  );
}
