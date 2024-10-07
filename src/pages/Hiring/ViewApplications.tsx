import { useState } from 'react';
import DynamicTable from '../../components/common/Table';
import { JobApplication } from '../../types';

const ViewApplications = () => {
    const [applications, setApplications] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            gender: 'Male',
            portfolioLink: 'https://johndoe.com',
            coverNote: 'I am excited to apply for this position...',
            resumeLink: 'https://example.com/johndoe-resume.pdf',
            coverLetterLink: 'https://example.com/johndoe-coverletter.pdf'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '098-765-4321',
            gender: 'Female',
            portfolioLink: 'https://janesmith.com',
            coverNote: 'With my experience in...',
            resumeLink: 'https://example.com/janesmith-resume.pdf',
            coverLetterLink: 'https://example.com/janesmith-coverletter.pdf'
        },
    ]);

    const handleEdit = (application: JobApplication) => {
        console.log('Edit application:', application);
    };

    const handleDelete = (application: JobApplication) => {
        console.log('Delete application:', application);
        setApplications(applications.filter(a => a.id !== application.id));
    };

    const handleView = (application: JobApplication) => {
        console.log('View application:', application);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">View All Job Applications</h1>
            <DynamicTable
                headings={['Name', 'Email', 'Phone', 'Gender', 'Portfolio Link', 'Cover Note', 'Resume Link', 'Cover Letter Link']}
                data={applications}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />
        </div>
    );
};

export default ViewApplications;
