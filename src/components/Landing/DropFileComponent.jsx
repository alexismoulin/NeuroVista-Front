import {useEffect, useRef, useState} from 'react';

export default function DropFileComponent({ onFileChange }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setAttribute('webkitdirectory', 'true');
            inputRef.current.setAttribute('directory', 'true');
        }
    }, []);

    const [isDragging, setIsDragging] = useState(false);

    function handleDrag(e, isDragEnter) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isDragEnter);
    }

    function processFile(item) {
        if (item.isFile) {
            return new Promise((resolve, reject) => {
                item.file((file) => resolve([file]), reject);
            });
        } else if (item.isDirectory) {
            return processDirectory(item);
        }
        return Promise.resolve([]);
    }

    function processDirectory(directory) {
        return new Promise((resolve, reject) => {
            const reader = directory.createReader();
            reader.readEntries(async (entries) => {
                try {
                    const filesArrays = await Promise.all(entries.map((entry) => {
                        return entry.isFile
                            ? new Promise((res, rej) => entry.file((file) => res([file]), rej))
                            : processDirectory(entry);
                    }));
                    // Flatten the arrays of files
                    resolve(filesArrays.flat());
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const items = e.dataTransfer.items;
        const promises = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i].webkitGetAsEntry();
            if (item) {
                promises.push(processFile(item));
            }
        }

        try {
            const fileArrays = await Promise.all(promises);
            const allFiles = fileArrays.flat();
            onFileChange(allFiles);
        } catch (error) {
            console.error('Error processing files:', error);
        }
    }

    function handleChange(e) {
        const files = e.target.files;
        onFileChange(Array.from(files));
    }

    return (
        <label
            className={isDragging ? 'dragging' : ''}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            <p className="font-merriweather text-slatey font-black mb-8">
                Drop your DICOM files (T1) here
            </p>
            <input
                ref={inputRef}
                type="file"
                name="dicoms"
                multiple
                required
                onChange={handleChange}
            />
        </label>
    );
}