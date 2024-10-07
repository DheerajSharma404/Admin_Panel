import { useNavigate } from "react-router-dom";
import DynamicTable from "../../components/common/Table";
import { useEffect, useState } from "react";
import { headings } from "../../utils/constants";
import { Product } from "../../types";
import { toast } from 'react-toastify';
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const navigate = useNavigate();

  const editProduct = (row: any) => {
    navigate(`/add-products`, { state: { product: row } });
  };

  const removeProduct = (row: any) => {
    setProductToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/products/${productToDelete._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setProducts(prevProducts => prevProducts.filter(product => product._id !== productToDelete._id));
          toast.success('Product deleted successfully');
        } else {
          const errorData = await response.json();
          throw new Error(`Failed to delete product: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to delete product');
      }
    }
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const viewProduct = (row: any) => {
    console.log('View product:', row);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/products?limit=100');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.error('Fetched data is not in the expected format:', result);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <DynamicTable
        headings={headings}
        data={products}
        onEdit={editProduct}
        onDelete={removeProduct}
        onView={viewProduct}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete ? productToDelete.productTitle || 'this product' : ''}
      />
    </div>
  );
};

export default ProductTable;