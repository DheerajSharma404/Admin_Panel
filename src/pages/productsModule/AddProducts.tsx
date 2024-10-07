import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductFormValues } from '../../types';

const initialValues = {
    productTitle: '',
    productDescription: '',
    productCategory: '',
    productThumbnail: null,
    productSample: null,
    productFile: null,
};

const validationSchema = Yup.object({
    productTitle: Yup.string().required('Title is required'),
    productDescription: Yup.string().required('Description is required'),
    productCategory: Yup.string().required('Category is required'),
    productThumbnail: Yup.mixed().required('Thumbnail is required'),
    productSample: Yup.mixed().required('Sample is required'),
    productFile: Yup.mixed().required('Product file is required'),
});

const AddProducts = () => {
    const location = useLocation();
    const initialProduct = location.state?.product;
    const navigate = useNavigate();

    const uploadFile = async (file: File, fieldName: string) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:4000/api/v1/upload/file', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload ${fieldName}`);
        }

        const data = await response.json();
        return data.data.imageUrl;
    };

    const handleSubmit = async (values: ProductFormValues, { setSubmitting }: any) => {
        try {
            const uploadedFiles = {
                productThumbnail: values.productThumbnail ? await uploadFile(values.productThumbnail, 'thumbnail') : null,
                productSample: values.productSample ? await uploadFile(values.productSample, 'sample') : null,
                productFile: values.productFile ? await uploadFile(values.productFile, 'product file') : null,
            };

            const productData = {
                ...values,
                ...uploadedFiles,
            };

            const url = 'http://localhost:4000/api/v1/products';
            const method = initialProduct ? 'PUT' : 'POST';
            const productId = initialProduct?.id;

            const response = await fetch(initialProduct ? `${url}/${productId}` : url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Failed to save product');
            }

            const data = await response.json();
            console.log(data);
            toast.success(initialProduct ? 'Product updated successfully' : 'Product added successfully');
            navigate('/product-table');
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Failed to save product. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='bg-white px-8 rounded-lg shadow-lg max-w-4xl mx-auto items-center h-screen'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>{initialProduct ? 'Edit Product' : 'Add Product'}</h1>
            <Formik
                initialValues={initialProduct || initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className='space-y-6'>
                        <div className='space-y-2'>
                            <label htmlFor="productTitle" className='block text-sm font-medium text-gray-700'>Title</label>
                            <Field id="productTitle" name="productTitle" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <ErrorMessage name="productTitle" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="productDescription" className='block text-sm font-medium text-gray-700'>Description</label>
                            <Field id="productDescription" name="productDescription" as="textarea" rows="4" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' />
                            <ErrorMessage name="productDescription" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="productCategory" className='block text-sm font-medium text-gray-700'>Category</label>
                            <Field as="select" id="productCategory" name="productCategory" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value="">Select a category</option>
                                <option value="PODCAST">Podcast</option>
                                <option value="COMIC">Comic</option>
                                <option value="AUDIO COMIC">Podcast</option>
                                <option value="MISC">M</option>
                            </Field>
                            <ErrorMessage name="productCategory" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="productThumbnail" className='block text-sm font-medium text-gray-700'>Thumbnail (Image)</label>
                            <input
                                id="productThumbnail"
                                name="productThumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    setFieldValue("productThumbnail", files ? files[0] : null);
                                }}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <ErrorMessage name="productThumbnail" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="productSample" className='block text-sm font-medium text-gray-700'>Sample (PDF, Audio, or Video)</label>
                            <input
                                id="productSample"
                                name="productSample"
                                type="file"
                                accept=".pdf,audio/*,video/*"
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    setFieldValue("productSample", files ? files[0] : null);
                                }}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <ErrorMessage name="productSample" component="div" className='text-red-500 text-sm' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="productFile" className='block text-sm font-medium text-gray-700'>Product File (Image, PDF, Audio, or Video)</label>
                            <input
                                id="productFile"
                                name="productFile"
                                type="file"
                                accept="image/*,.pdf,audio/*,video/*"
                                onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    setFieldValue("productFile", files ? files[0] : null);
                                }}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <ErrorMessage name="productFile" component="div" className='text-red-500 text-sm' />
                        </div>
                        <button type="submit" className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                            {initialProduct ? 'Update Product' : 'Add Product'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProducts;