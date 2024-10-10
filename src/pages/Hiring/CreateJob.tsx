import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useCreateJobMutation, useGetJobByIdQuery, useUpdateJobMutation } from '../../features/career/careerApi';
import { JobData } from '../../types';

interface JobFormValues {
  jobTitle: string;
  jobDescription: string;
  skillsRequired: string[];
  thumbnail: File | string | null;
  location?: string;
  jobType?: string;
  applicationCount?: number;
}

const CreateJob: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location.state?.id;
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const { data, isLoading: isLoadingJob } = useGetJobByIdQuery(jobId ?? '', { skip: !jobId });
  const jobData = data?.data
  console.log(jobData)
  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:4000/api/v1/upload/file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data.data.imageUrl;
  };

  const handleFormSubmit = async (values: JobFormValues, { setSubmitting }: FormikHelpers<JobFormValues>) => {
    try {
      let thumbnailUrl = values.thumbnail;
      if (values.thumbnail instanceof File) {
        thumbnailUrl = await uploadFile(values.thumbnail);
      }

      const jobData = { ...values, thumbnail: thumbnailUrl };

      if (jobId) {
        await updateJob({ ...jobData, _id: jobId }).unwrap();
      } else {
        await createJob(jobData as JobData).unwrap();
      }
      navigate('/all-jobs');
    } catch (error) {
      console.error('Error submitting job:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingJob && jobId) return <div>Loading job data...</div>;

  const initialValues: JobFormValues = {
    jobTitle: jobData?.jobTitle || '',
    jobDescription: jobData?.jobDescription || '',
    skillsRequired: jobData?.skillsRequired || [],
    thumbnail: jobData?.thumbnail || null,
    location: jobData?.location || '',
    jobType: jobData?.jobType || '',
    applicationCount: jobData?.applicationCount || 0,
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job title is required'),
    jobDescription: Yup.string().required('Job description is required'),
    skillsRequired: Yup.array().of(Yup.string()).min(1, 'At least one skill is required'),
    thumbnail: Yup.mixed().required('Thumbnail is required'),
    location: Yup.string().required('Location is required'),
    jobType: Yup.string().required('Job type is required'),
  });

  return (
    <div className="bg-white px-8 rounded-lg shadow-lg max-w-4xl mx-auto items-center p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {jobId ? 'Edit Job' : 'Create Job'}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <FormField name="jobTitle" label="Job Title" />
            <FormField name="jobDescription" label="Job Description" as="textarea" rows={4} />
            <FormField name="location" label="Location" />
            <Field
              name="jobType"
              label="Job Type"
              as="select"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="FULLTIME">Full-time</option>
              <option value="PARTTIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </Field>
            <div className="space-y-2">
              <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">
                Skills Required
              </label>
              <FieldArray name="skillsRequired">
                {({ push, remove }) => (
                  <div>
                    {values.skillsRequired.map((_, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Field
                          name={`skillsRequired.${index}`}
                          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <ErrorMessage name="skillsRequired" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="space-y-2">
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                Thumbnail (Image)
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const files = event.currentTarget.files;
                  setFieldValue('thumbnail', files ? files[0] : null);
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {jobId ? 'Update Job' : 'Create Job'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const FormField: React.FC<{
  name: string;
  label: string;
  as?: string;
  rows?: number;
}> = ({ name, label, as = 'input', rows }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      id={name}
      name={name}
      as={as}
      rows={rows}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

export default CreateJob;