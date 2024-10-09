import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useCreateJobMutation } from '../../features/career/careerApi';

const CreateJob = () => {
  const [createJob, { isLoading }] = useCreateJobMutation();
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
const handleFormSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
  try {
    await uploadFile(values.thumbnail, 'thumbnail');
    const thumbnailUrl = await uploadFile(values.thumbnail, 'thumbnail');
    await createJob({ ...values, thumbnail: thumbnailUrl }).unwrap();
  } catch (error) {
    console.error(error);
  }
  setSubmitting(false);
};
isLoading && <div>Loading...</div>
  return (
    <div>
      <div className='bg-white px-8 rounded-lg shadow-lg max-w-4xl mx-auto items-center h-full p-10'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Create Job</h1>
        <Formik
          initialValues={{
            jobTitle: '',
            jobDescription: '',
            skillsRequired: [], 
            thumbnail: null,
          }}
          validationSchema={Yup.object({
            jobTitle: Yup.string().required('Job title is required'),
            jobDescription: Yup.string().required('Job description is required'),
            skillsRequired: Yup.array().of(Yup.string()).min(1, 'At least one skill is required'),
            thumbnail: Yup.mixed().required('Thumbnail is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values, { setSubmitting });
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor="jobTitle" className='block text-sm font-medium text-gray-700'>Job Title</label>
                <Field id="jobTitle" name="jobTitle" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                <ErrorMessage name="jobTitle" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='space-y-2'>
                <label htmlFor="jobDescription" className='block text-sm font-medium text-gray-700'>Job Description</label>
                <Field id="jobDescription" name="jobDescription" as="textarea" rows="4" className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none' />
                <ErrorMessage name="jobDescription" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='space-y-2'>
                <label htmlFor="skillsRequired" className='block text-sm font-medium text-gray-700'>SkillsRequired</label>
                <FieldArray name="skillsRequired">
                  {({ push, remove }) => (
                    <div>
                      {values.skillsRequired.map((_, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Field
                            name={`skillsRequired.${index}`}
                            className='flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 bg-red-500 text-white rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="mt-2 p-2 bg-green-500 text-white rounded-md"
                      >
                        Add Skill
                      </button>
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage name="skillsRequired" component="div" className='text-red-500 text-sm' />
              </div>
              <div className='space-y-2'>
                <label htmlFor="thumbnail" className='block text-sm font-medium text-gray-700'>Thumbnail (Image)</label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const files = event.currentTarget.files;
                    setFieldValue("thumbnail", files ? files[0] : null);
                  }}
                  className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage name="thumbnail" component="div" className='text-red-500 text-sm' />
              </div>
              <button type="submit" className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Create Job
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateJob
