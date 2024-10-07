import { useState } from 'react';
import DynamicTable from '../../components/common/Table';
import { Job } from '../../types';
const AllJobs = () => {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Software Engineer', department: 'Engineering', Description: 'Software Engineer', status: 'Open' },
        { id: 2, title: 'Product Manager', department: 'Product', Description: 'Product Manager', status: 'Closed' },
        { id: 3, title: 'UX Designer', department: 'Design', Description: 'UX Designer', status: 'Open' },
    ]);

    const handleEdit = (job: Job) => {
        console.log('Edit job:', job);
    };

    const handleDelete = (job: Job) => {
        console.log('Delete job:', job);
        setJobs(jobs.filter(j => j.id !== Number(job.id)));
    };

    const handleView = (job: Job) => {
        console.log('View job:', job);
    };

    return (
        <div>
            <h1>All Jobs</h1>
            <DynamicTable
                headings={['ID', 'Title', 'Department', 'Description', 'Status']}
                data={jobs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />
        </div>
    )
}

export default AllJobs
