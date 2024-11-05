import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface FormValues {
  name: string;
  guardianName: string;
  guardianContact: string;
  age: string;
  message: string;
  city: string;
  appliedWorkshop: string;
  guardianEmail: string;
  mobileUsageLevel: string;
  mobileUsageHours: number;
  primaryActivityOnMobile: string;
  isTimeRestricted: boolean;
  restrictionType: string;
  concernsUser: string;
  behavioralChanges: string;
  physicalActivityHours: number;
  physicalActivityFrequency: string;
  confessionFrequency: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Child\'s name is required')
    .min(2, 'Name must be at least 2 characters'),
  guardianName: Yup.string()
    .required('Guardian\'s name is required')
    .min(2, 'Name must be at least 2 characters'),
  guardianContact: Yup.string()
    .required('Guardian\'s contact is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  age: Yup.number()
    .required('Age is required')
    .min(5, 'Age must be at least 5')
    .max(18, 'Age must not exceed 18'),
  city: Yup.string()
    .required('City is required'),
  guardianEmail: Yup.string()
    .required('Guardian\'s email is required')
    .email('Invalid email format'),
 mobileUsageLevel: Yup.string()
    .required('Mobile usage level is required'),
  mobileUsageHours: Yup.number()
    .required('Mobile usage hours is required')
    .min(0, 'Hours cannot be negative')
    .max(24, 'Hours cannot exceed 24'),
  primaryActivityOnMobile: Yup.string()
    .required('Primary activity is required'),
  restrictionType: Yup.string()
    .when('isTimeRestricted', {
      is: true,
      then: () => Yup.string().required('Restriction type is required'),
    }),
  physicalActivityHours: Yup.number()
    .required('Physical activity hours is required')
    .min(0, 'Hours cannot be negative'),
  physicalActivityFrequency: Yup.string()
    .required('Physical activity frequency is required'),
  confessionFrequency: Yup.string()
    .required('Confession frequency is required'),
  concernsUser: Yup.string()
    .required('User concerns is required'),
  behavioralChanges: Yup.string()
    .required('Behavioral changes is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must not exceed 500 characters'),
  duration: Yup.string()
    .required('Duration is required'),
});

const AssesmentForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Child & Guardian Details";
      case 2:
        return "Issues & Activities Assessment";
      default:
        return "";
    }
  };

  const initialValues: FormValues = {
    name: "",
    guardianName: "",
    guardianContact: "",
    age: "",
    message: "",
    city: "",
    appliedWorkshop: "",
    guardianEmail: "",
    mobileUsageLevel: "",
    mobileUsageHours: 0,
    primaryActivityOnMobile: "",
    isTimeRestricted: false,
    restrictionType: "",
    concernsUser: "",
    behavioralChanges: "",
    physicalActivityHours: 0,
    physicalActivityFrequency: "",
    confessionFrequency: "",
  }

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Child's Name
              </label>
              <Field
                id='name'
                name='name'
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='name' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='guardianName' className='block text-sm font-medium text-gray-700 mb-1'>
                Guardian's/Parent's Name
              </label>
              <Field
                id='guardianName'
                name='guardianName'
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='guardianName' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='guardianContact' className='block text-sm font-medium text-gray-700 mb-1'>
                Guardian's/Parent's Contact
              </label>
              <Field
                id='guardianContact'
                name='guardianContact'
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='guardianContact' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='age' className='block text-sm font-medium text-gray-700 mb-1'>
                Child's Age
              </label>
              <Field
                id='age'
                name='age'
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='age' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='city' className='block text-sm font-medium text-gray-700 mb-1'>
                City
              </label>
              <Field
                id='city'
                name='city'
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='city' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='guardianEmail' className='block text-sm font-medium text-gray-700 mb-1'>
                Guardian's Email
              </label>
              <Field
                id='guardianEmail'
                name='guardianEmail'
                type='email'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='guardianEmail' component='div' className='text-red-500 text-sm mt-1' />
            </div>
          </div>
        );
      case 2:
        return (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           <div>
              <label htmlFor='mobileUsageLevel' className='block text-sm font-medium text-gray-700 mb-1'>
                Mobile Usage Level
              </label>
              <Field
                as='select'
                id='mobileUsageLevel'
                name='mobileUsageLevel'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select usage level</option>
                <option value='LOW'>Low</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HIGH'>High</option>
              </Field>
              <ErrorMessage name='mobileUsageLevel' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='mobileUsageHours' className='block text-sm font-medium text-gray-700 mb-1'>
                Mobile Usage Hours (per day)
              </label>
              <Field
                id='mobileUsageHours'
                name='mobileUsageHours'
                type='number'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='mobileUsageHours' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='primaryActivityOnMobile' className='block text-sm font-medium text-gray-700 mb-1'>
                Primary Activity on Mobile
              </label>
              <Field
                as='select'
                id='primaryActivityOnMobile'
                name='primaryActivityOnMobile'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select primary activity</option>
                <option value='WATCHING_VIDEOS'>Watching Videos</option>
                <option value='PLAYING_GAMES'>Playing Games</option>
                <option value='CHATTING'>Chatting</option>
                <option value='OTHERS'>Others</option>
              </Field>
              <ErrorMessage name='primaryActivityOnMobile' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div className='flex items-center'>
              <Field
                id='isTimeRestricted'
                name='isTimeRestricted'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor='isTimeRestricted' className='ml-2 block text-sm text-gray-900'>
                Is Time Restricted?
              </label>
            </div>
            <div>
              <label htmlFor='restrictionType' className='block text-sm font-medium text-gray-700 mb-1'>
                Restriction Type
              </label>
              <Field
                as='select'
                id='restrictionType'
                name='restrictionType'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select restriction type</option>
                <option value='TIME_LIMIT'>Time Limit</option>
                <option value='SPECIFIC TIME'>Specific Time</option>
                <option value='TYPE_OF_ACTIVITY'>Type of Activity</option>
                <option value='OTHERS'>Others</option>
              </Field>
              <ErrorMessage name='restrictionType' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='physicalActivityHours' className='block text-sm font-medium text-gray-700 mb-1'>
                Physical Activity Hours (per week)
              </label>
              <Field  
                id='physicalActivityHours'
                name='physicalActivityHours'
                type='number'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              />
              <ErrorMessage name='physicalActivityHours' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='physicalActivityFrequency' className='block text-sm font-medium text-gray-700 mb-1'>
                Physical Activity Frequency
              </label>
              <Field
                as='select'
                id='physicalActivityFrequency'
                name='physicalActivityFrequency'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select frequency</option>
                <option value='LOW'>Low</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HIGH'>High</option>
              </Field>
              <ErrorMessage name='physicalActivityFrequency' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='confessionFrequency' className='block text-sm font-medium text-gray-700 mb-1'>
                Confession Frequency
              </label>
              <Field
                as='select'
                id='confessionFrequency'
                name='confessionFrequency'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select frequency</option>
                <option value='FREQUENTLY'>Frequently</option>
                <option value='OCCASIONALLY'>Occasionally</option>
                <option value='RARELY'>Rarely</option>
              </Field>
              <ErrorMessage name='confessionFrequency' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='concernsUser' className='block text-sm font-medium text-gray-700 mb-1'>
                User Concerns
              </label>
              <Field
                as='select'
                id='concernsUser'
                name='concernsUser'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select user concern</option>
                <option value='EXCESSIVE_SCREEN_TIME'>Excessive Screen Time</option>
                <option value='IMPACT_ON_SOCIAL_SKILLS'>Impact on Social Skills</option>
                <option value='LACK_OF_PHYSICAL_ACTIVITY'>Lack of Physical Activity</option>
                <option value='OTHERS'>Others</option>
              </Field>
              <ErrorMessage name='concernsUser' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='behavioralChanges' className='block text-sm font-medium text-gray-700 mb-1'>
                Behavioral Changes
              </label>
              <Field
                as='select'
                id='behavioralChanges'
                name='behavioralChanges'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select behavioral change</option>
                <option value='CONCENTRATION'>Concentration</option>
                <option value='IRRITABILITY'>Irritability</option>
                <option value='SLEEPING'>Sleeping</option>
                <option value='LESS_INTEREST'>Less Interest</option>
                <option value='OTHERS'>Others</option>
              </Field>
              <ErrorMessage name='behavioralChanges' component='div' className='text-red-500 text-sm mt-1' />
            </div>
            <div>
              <label htmlFor='duration' className='block text-sm font-medium text-gray-700 mb-1'>
                Duration
              </label>
              <Field
                as='select'
                id='duration'
                name='duration'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              >
                <option value=''>Select duration</option>
                <option value='2days'>2 days</option>
                <option value='6months'>6 months</option>
                <option value='12months'>12 months</option>
              </Field>
            </div>
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                Message
              </label>
              <Field
                as='textarea'
                id='message'
                name='message'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none'
                rows={4}
              />
              <ErrorMessage name='message' component='div' className='text-red-500 text-sm mt-1' />
            </div>
          </div>
        );
    }
  };

  const handleSubmit = async (values: FormValues) => {
    console.log(values,'values');
     };

  return (
    <>
      <div className="container mx-auto px-4 py-8 overflow-hidden">
        <div className={`relative bg-transparent p-6 rounded-lg max-w-6xl mx-auto shadow-lg`}>
          {!isSubmitted ? (
            <div className="h-[80vh] overflow-y-auto scrollbar-hide relative">
              <div className="text-center mb-8">
                <div className="flex flex-row-reverse items-center justify-center gap-4">
                  <h2 className='text-3xl font-bold text-indigo-600'>
                    Workshop Assessment Form
                  </h2>
                </div>
                <div className="mt-2">
                  <p className="text-lg font-medium text-gray-600">
                    Step {currentStep} of 2: {getStepTitle(currentStep)}
                  </p>
                  <div className="w-full max-w-md mx-auto mt-2 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className='space-y-6'>
                    {renderFormStep()}
                    
                    <div className='flex justify-between mt-8'>
                      {currentStep > 1 && (
                        <button
                          type='button'
                          onClick={prevStep}
                          className='bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500'
                        >
                          Previous
                        </button>
                      )}
                      {currentStep < 2 ? (
                        <button
                          type='button'
                          onClick={nextStep}
                          className='bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type='submit'
                          className='bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div className='relative overflow-y-auto scrollbar-hide text-center'>
              <div className='relative inline-block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto'>
                <img
                  src='/assets/home/notif.png'
                  alt='Success Image'
                  className='w-full h-full'
                />
                <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6'>
                  <h2 className='text-2xl font-bold text-men-blue lg:mb-4'>
                    Success!
                  </h2>
                  <p className='text-lg text-men-blue'>
                    Your form has been successfully submitted.
                  </p>
                  <button
                    className='lg:mt-6 bg-men-blue text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    onClick={() => setIsSubmitted(false)}
                  >
                    Go Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AssesmentForm;