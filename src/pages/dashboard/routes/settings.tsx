import React from 'react';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../../utils/motion';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { Input } from '../../../components';
import { useAppwriteContext } from '../../../context/app-write';
import Layout from '../../../components/dashboard/layout';
import { UserProps } from '../../../interface';
import { toast } from 'react-toastify';

const DashboardSettings = () => {
  const [fileInput, setFileInput] = React.useState<File>();
  const [profileURL, setProfileURL] = React.useState('');
  const [getUser, setGetUser] = React.useState<UserProps>();
  const [userForm, setUserForm] = React.useState({
    name: getUser?.name,
    email: getUser?.name,
  });
  const [loading, setLoading] = React.useState(false)

  // Access the uploadUserProfile function from the useAppwriteContext hook
  const { uploadUserProfile } = useAppwriteContext();

  // Handle file input change event
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files;
    if (selectedFile) {
      setFileInput(selectedFile[0]);
    }
  };

  const handleForm = (event: any) => {
    const { target } = event;
    const changing = {
      ...userForm,
      [target.name]: target.value
    }
    
    setUserForm(changing);
  }

  // Memoized profile upload handler
  const handleProfileUpload = React.useMemo(
    () => async () => {
   try {
     // Check if a file is selected
     if (fileInput) {
       setLoading(true);
       // Upload the user profile using the selected file
       setProfileURL(await uploadUserProfile(fileInput));
       setLoading(false);
       toast.success('Profile uploaded');
      }
    } catch (error) {
      console.log(error)
      toast.done(user.prefs?.profile?.profile);
      setLoading(false);
   }
    },
    [fileInput, uploadUserProfile]
  );

  // Trigger the profile upload on component mount
  React.useEffect(() => {
    handleProfileUpload();
  }, [handleProfileUpload]);

  // Fetch user profile URL from local storage on component mount
  React.useEffect(() => {
    const getUserFromLocalStorage =
      window.localStorage.getItem('appwrite_user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
    setGetUser(user);
    // Set the profile URL from user preferences
    setProfileURL(user.prefs?.profile?.profile);
  }, []);

  return (
    <Layout>
      <motion.div
        {...slideAnimation('up')}
        className='w-full h-full overflow-y-auto p-3 flex flex-col gap-10'
      >
        <div className='flex flex-col gap-5'>
          <div>
            <p className='text-xl font-medium'>Your Profile</p>
            <span>Choose how you are displayed to your viewer</span>
          </div>

          <form className='w-full'>
            <div className='w-full flex items-center gap-10'>
              <div className='flex flex-col gap-2.5'>
                <div>
                  <Input
                    value={userForm?.name}
                    onChange={handleForm}
                    type='text'
                    name='name'
                    elementType='input'
                    styles=''
                    label='Name'
                    placeholder='John Do...'
                  />
                </div>
                <div>
                  <label htmlFor=''>Email</label>
                  <input
                    value={userForm?.email}
                    onChange={handleForm}
                    type='email'
                    name='email'
                    id='email'
                    className='bg-transparent border border-gray-300 text-white sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-[14.7rem] p-2.5'
                    placeholder='John Do...'
                  />
                </div>
              </div>

              {!profileURL ? (
                <label className='w-40 h-40 bg-transparent border-[1px] rounded-full relative'>
                  <span className='w-full h-full inline-flex items-center text-4xl font-bold backdrop-blur-lg dark:text-gray-400 rainbow rounded-full justify-center'>
                    RE
                  </span>
                  <input
                    onChange={handleFileChange}
                    type='file'
                    className='w-0 h-0'
                  />
                  <RiUploadCloud2Fill className='bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-full text-5xl border-[1px] p-3 absolute -right-5 top-12' />
                </label>
              ) : (
                <div className='w-40 h-40 bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border-[1px] rounded-full relative'>
                  <img
                    className='w-full h-full rounded-full object-cover object-center'
                    src={profileURL}
                    alt=''
                  />
                  <label>
                    <input
                      onChange={handleFileChange}
                      type='file'
                      className='w-0 h-0'
                    />
                    <RiUploadCloud2Fill className='bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-full text-5xl border-[1px] p-3 absolute -right-5 top-12' />
                  </label>
                </div>
              )}
            </div>
          </form>
        </div>

        <div>
          <p className='shadow-lg w-fit px-4 py-2 rounded-lg bg-rose-800 dark:text-gray-200 '>Delete Account</p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default DashboardSettings;

