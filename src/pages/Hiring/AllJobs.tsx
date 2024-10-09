import { useState, useCallback, useEffect } from 'react';
import DynamicTable from '../../components/common/Table';
import { useGetJobsQuery } from '../../features/career/careerApi';
import { JobData } from '../../types';
import debounce from 'lodash/debounce';
import Pagination from '../../components/common/Pagination';

const AllJobs = () => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const { data, isLoading, isError, error } = useGetJobsQuery({
        sortOrder,
        searchTerm: debouncedSearchTerm,
        page: currentPage,
        limit,
    });

    const handleEdit = (job: JobData) => {
        console.log('Edit job:', job);
    };

    const handleDelete = (job: JobData) => {
        console.log('Delete job:', job);
    };

    const handleView = (job: JobData) => {
        console.log('View job:', job);
    };

    const handleSort = () => {
        setSortOrder('asc');
    };

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSearchTerm(value);
        }, 300),
        []
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        debouncedSearch(event.target.value);
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1); 
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {JSON.stringify(error)}</div>;
    if (!data || !data.data || !data.data.jobs) return <div>No data available</div>;

    const { jobs, totalPages, totalJobs } = data.data;

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>All Jobs</h1>
            <DynamicTable
                headings={['ID', 'Title', 'Department', 'Description', 'Status', 'Applications']}
                data={jobs}
                sortField="createdAt"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onSort={handleSort}
                sortOrder={sortOrder}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />
            <div>
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    totalItems={totalJobs} 
                    limit={limit} 
                    onLimitChange={handleLimitChange}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllJobs;
