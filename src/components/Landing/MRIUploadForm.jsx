import { useState } from 'react';
import DropFiles from './DropFileComponent.jsx';
import {SERVER_URL} from "../../helpers/data.js"

export default function MRIUploadForm({ setPage }) {
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
             await fetch(`${SERVER_URL}/run_script`, {
                method: 'POST',
                body: data,
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during file upload. Please try again.');
        }

    };

    return (
        <section className="p-8 w-11/12 mx-auto mt-10 bg-white">
            <header className="text-center mb-6">
                <h2 className="text-3xl font-bold font-opensans uppercase text-slatey mb-2">Upload & Process your T1 MRI Study</h2>
            </header>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['subject', 'study'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-slatey mb-2 font-opensans uppercase">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                name={field}
                                id={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg font-merriweather focus:outline-none focus:ring-2 focus:ring-tahiti"
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="notes" className="block text-slatey font-opensans uppercase mb-2">Notes</label>
                    <textarea
                        name="notes"
                        id="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full h-32 px-4 py-2 border rounded-lg font-merriweather focus:outline-none focus:ring-2 focus:ring-tahiti"
                    />
                </div>
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                    <DropFiles onFileChange={handleFileChange}/>
                </div>
                <div className="flex justify-end space-x-4">
                    <input
                        type="reset"
                        value="Reset"
                        className="font-opensans uppercase text-slatey border-slatey border-2 py-3 px-6 text-center bg-white text-sm tracking-widest hover:text-tahiti hover:border-tahiti transition-colors duration-200 ease-in-out w-32"
                    />
                    <input
                        type="submit"
                        value="Process"
                        className="font-opensans uppercase text-white py-3 px-6 text-center bg-slatey text-sm tracking-widest hover:bg-tahiti transition-colors duration-200 ease-in-out w-32"
                    />
                </div>
            </form>
        </section>
    );
}