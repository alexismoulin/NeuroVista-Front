import { useState } from 'react';
import classNames from 'classnames';
import DropFiles from './DropFileComponent.jsx';
import {testFunction} from "../../util.js";

const SERVER_URL = "http://127.0.0.1:5001"

export default function MRIUploadForm({ styles, setPage, setLoadedData }) {
    const [formData, setFormData] = useState({
        subject: '',
        series: '',
        notes: '',
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

    const handleSubmitStream = async (e) => {
        e.preventDefault();

        if (formData.dicoms.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }

        const data = new FormData();
        data.append('subject', formData.subject);
        data.append('series', formData.series);
        data.append('notes', formData.notes);

        formData.dicoms.forEach((file) => {
            data.append('dicoms', file); // Append each file separately
        });

        try {
            const response = await fetch(`${SERVER_URL}/run_script`, {
                method: 'POST',
                body: data,
            });
        
            if (!response.ok) {
                throw new Error('Failed to upload files');
            }
        
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let accumulatedResult = {};
        
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
        
                // Decode the chunk and parse JSON
                const chunk = decoder.decode(value, { stream: true });
                try {
                    const parsedData = JSON.parse(chunk);
                    console.log('Received update:', parsedData);
        
                    // Update accumulatedResult with the new data
                    accumulatedResult = { ...accumulatedResult, ...parsedData };
                    
                    // Update your state with the accumulated data
                    setLoadedData(accumulatedResult);
                } catch (e) {
                    console.error('Error parsing chunk', e);
                }
            }
        
            console.log('Final result:', accumulatedResult);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during file upload. Please try again.');
            setLoadedData(error);
        }

        setPage("processing")
    };

    const handleSubmitTest = async (e) => {
        await testFunction(e, formData, setLoadedData, setPage, SERVER_URL);
    }

    return (
        <section id={styles.form} className={styles.main}>
            <header>
                <div className={styles.container}>
                    <h2>Upload & Process MRI Series</h2>
                    <p>Please upload & process <b>one</b> MRI series at a time</p>
                </div>
            </header>
            <div className={classNames(styles.content, styles.style4, styles.featured)}>
                <div className={classNames(styles.container, styles.medium)}>
                    <form onSubmit={handleSubmitStream} encType="multipart/form-data">
                        <div className={classNames(styles.row, styles.gtr50)}>
                            {['subject', 'series'].map((field) => (
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