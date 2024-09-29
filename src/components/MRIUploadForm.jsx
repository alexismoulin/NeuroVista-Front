import { useState } from 'react';

const MRIUploadForm = () => {
    const [formData, setFormData] = useState({
        subject: '',
        series: '',
        notes: '',
        dicoms: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            dicoms: e.target.files,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you could add form validation before submission

        const data = new FormData();
        data.append('subject', formData.subject);
        data.append('series', formData.series);
        data.append('notes', formData.notes);
        Array.from(formData.dicoms).forEach((file) => {
            data.append('dicoms', file);
        });

        // Handle form submission, e.g., send it to your server
        fetch('/run_script', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <section id="form" className="main">
            <header>
                <div className="container">
                    <h2>Upload & Process MRI Series</h2>
                    <p>Please upload & process <b>one</b> MRI series at a time</p>
                </div>
            </header>
            <div className="content style4 featured">
                <div className="container medium">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row gtr-50">
                            <div className="col-6 col-12-mobile">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-6 col-12-mobile">
                                <label htmlFor="series">Series</label>
                                <input
                                    type="text"
                                    name="series"
                                    id="series"
                                    placeholder="Series"
                                    value={formData.series}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="notes">Notes</label>
                                <textarea
                                    name="notes"
                                    id="notes"
                                    placeholder="Notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-12">
                                <ul className="actions special">
                                    <li>
                                        <input
                                            type="file"
                                            name="dicoms"
                                            id="dicoms"
                                            multiple
                                            onChange={handleFileChange}
                                            hidden
                                            required
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="submit"
                                            className="button alt"
                                            value="Process"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default MRIUploadForm;