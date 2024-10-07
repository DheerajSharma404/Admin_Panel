import { useState, useMemo } from 'react';
import { FaEdit, FaEye, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { ITable } from "../../types";

interface DynamicTableProps extends ITable {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  onView: (row: any) => void;
}

const DynamicTable = ({ data, onEdit, onDelete, onView }: DynamicTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tableData = Array.isArray(data) ? data : (Array.isArray((data as any)?.data) ? (data as any).data : []);
  const columnKeys = tableData.length > 0 ? Object.keys(tableData[0]).filter(key => !Array.isArray(tableData[0][key]) && key !== '_id') : [];

  const truncateText = (text: string | number | null | undefined, maxLength: number): string => {
    if (text == null) return '';
    const stringText = String(text);
    return stringText.length > maxLength ? stringText.slice(0, maxLength) + '...' : stringText;
  };

  const renderProductContent = (key: string, value: any) => {
    if (key === 'productThumbnail') {
      return (
        <img
          src={value}
          alt="Product Thumbnail"
          className="w-full h-10 object-cover"
        />
      );
    }
    else if (key === 'productSample' || key === 'productFile') {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {truncateText(value, 20)}
        </a>
      );
    }
    return truncateText(value, 20);
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...tableData];

    if (searchTerm) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [tableData, searchTerm, sortColumn, sortDirection]);
  const pageCount = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (column !== sortColumn) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columnKeys.map((key, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(key)}
              >
               <div className='flex items-center gap-2'>{key} {renderSortIcon(key)}</div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((row: any, rowIndex: number) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columnKeys
                .filter(key => key !== '_id')
                .map((key: string, colIndex: number) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {renderProductContent(key, row[key])}
                  </td>
                ))}
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                <button onClick={() => onView(row)} className="text-blue-600 hover:text-blue-900 flex items-center">
                  <FaEye className="mr-1" /> View
                </button>
                <button onClick={() => onEdit(row)} className="text-yellow-600 hover:text-yellow-900 ml-2 flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button onClick={() => onDelete(row)} className="text-red-600 hover:text-red-900 ml-2 flex items-center">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;