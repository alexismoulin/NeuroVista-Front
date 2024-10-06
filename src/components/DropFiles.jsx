import { useState } from 'react';
import classNames from 'classnames';

export default function DropFileComponent({ onFileChange }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e, isDragEnter) => {
        e.preventDefault();
        setIsDragging(isDragEnter);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) onFileChange(files);
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) onFileChange(files);
    };

    return (
        <label
            className={classNames("drop-container", { "drag-active": isDragging })}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            <span className="drop-title">Drop files here</span> or
            <input
                type="file"
                id="dicoms"
                multiple
                required
                onChange={handleChange}
            />
        </label>
    );
}