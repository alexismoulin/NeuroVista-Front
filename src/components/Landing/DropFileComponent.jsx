import { useState } from 'react';

export default function DropFileComponent({ onFileChange }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e, isDragEnter) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isDragEnter);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.items;
        const fileList = [];

        for (let i = 0; i < files.length; i++) {
            const item = files[i].webkitGetAsEntry();
            if (item.isFile) {
                item.file((file) => fileList.push(file));
            } else if (item.isDirectory) {
                processDirectory(item, fileList);
            }
        }

        onFileChange(fileList);
    };

    const processDirectory = (directory, fileList) => {
        const reader = directory.createReader();
        reader.readEntries((entries) => {
            entries.forEach((entry) => {
                if (entry.isFile) {
                    entry.file((file) => fileList.push(file));
                } else if (entry.isDirectory) {
                    processDirectory(entry, fileList);
                }
            });
        });
    };

    const handleChange = (e) => {
        const files = e.target.files;
        onFileChange(Array.from(files));
    };

    return (
        <label
            className=""
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            <p className="font-merriweather text-slatey font-black mb-8">Drop your DICOM files here</p>
            <input
                type="file"
                name="dicoms"
                multiple
                webkitdirectory="true"
                directory="true"
                required
                onChange={handleChange}
            />
        </label>
    );
}