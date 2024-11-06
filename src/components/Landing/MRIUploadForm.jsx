import { useState } from 'react';
import classNames from 'classnames';
import DropFiles from './DropFileComponent.jsx';

export default function MRIUploadForm({ styles, setPage, serverUrl }) {
    const [formData, setFormData] = useState({
        subject: "",
        study: "",
        notes: "",
        dicoms: [],
    });

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (files) => {
        setFormData((prevData) => ({
            ...prevData,
            dicoms: Array.from(files) // Convert FileList to an array
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.dicoms.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }

        const data = new FormData();
        data.append('subject', formData.subject);
        data.append('study', formData.study);
        data.append('notes', formData.notes);

        formData.dicoms.forEach((file) => {
            data.append('dicoms', file); // Append each file separately
        });

        setPage("processing")

        try {
             await fetch(`${serverUrl}/run_script`, {
                method: 'POST',
                body: data,
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during file upload. Please try again.');
        }

    };

    return (
        <section id={styles.form} className={styles.main}>
            <header>
                <div className={styles.container}>
                    <h2>Upload & Process your T1 MRI Study</h2>
                    <p>Please upload only T1 MRI series within your study</p>
                </div>
            </header>
            <div className={classNames(styles.content, styles.style4, styles.featured)}>
                <div className={classNames(styles.container, styles.medium)}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className={classNames(styles.row, styles.gtr50)}>
                            {['subject', 'study'].map((field) => (
                                <div key={field} className={classNames(styles.col6, styles.col12Mobile)}>
                                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        id={field}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                            <div className={styles.col12}>
                                <label htmlFor="notes">Notes</label>
                                <textarea
                                    name="notes"
                                    id="notes"
                                    placeholder="Notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.col12}>
                                <DropFiles onFileChange={handleFileChange}/>
                            </div>
                            <div className={styles.col6}>
                                <input type="reset" value="Reset"/>
                            </div>
                            <div className={styles.col6}>
                                <input type="submit" value="Process"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}