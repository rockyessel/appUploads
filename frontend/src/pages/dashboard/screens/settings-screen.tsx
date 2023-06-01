import React from 'react';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../../utils/motion';
import { useAppwriteContext } from '../../../context/app-write';
import { UserProps } from '../../../interface';
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { Input } from '../../../components';

const SettingsScreen = () => {
  const [fileInput, setFileInput] = React.useState<File>();
  const [profileURL, setProfileURL] = React.useState('');
  const { uploadUserProfile } = useAppwriteContext();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files;
    if (selectedFile) {
      setFileInput(selectedFile[0]);
    }
  };

  const handleProfileUpload = React.useMemo(
    () => async () => {
      if (fileInput) {
        setProfileURL(await uploadUserProfile(fileInput));
      }
    },
    [fileInput, uploadUserProfile]
  );

  React.useEffect(() => {
    handleProfileUpload();
  }, [handleProfileUpload]);

  React.useEffect(() => {
    const getUserFromLocalStorage = window.localStorage.getItem('user');
    const user: UserProps = JSON.parse(`${getUserFromLocalStorage}`);
    setProfileURL(user.prefs.profile.profile);
  }, []);

  return (
    <motion.div
      {...slideAnimation('up')}
      className='bg-transparent w-full h-full overflow-y-auto p-3 flex flex-col gap-10'
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
                  value={''}
                  onChange={() => {}}
                  type='text'
                  name='name'
                  elementType='input'
                  styles=''
                  label='Name'
                  placeholder='John Do...'
                />
              </div>
              <div>
                <label htmlFor=''>Profile URL</label>
                <div className='flex items-center'>
                  <p className='bg-white p-2 border-y border-x rounded-l-lg'>
                    appuploads.vercel.app/
                  </p>
                  <Input
                    value={''}
                    onChange={() => {}}
                    type='text'
                    name='name'
                    elementType='input'
                    styles={`lg:w-[18rem] placeholder:italic placeholder:font-medium border-y border-r border-gray-300 text-gray-900`}
                    placeholder='@johndoe'
                  />
                </div>
              </div>
            </div>

            {!profileURL ? (
              <label className='w-40 h-40 bg-white border-[1px] rounded-full'>
                <input
                  onChange={handleFileChange}
                  type='file'
                  className='w-0 h-0'
                />
                <span>Upload image</span>
              </label>
            ) : (
              <div className='w-40 h-40 bg-white border-[3px] rounded-full relative'>
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
                  <RiUploadCloud2Fill className='bg-white rounded-full text-5xl border-[1px] p-3 absolute -right-5 top-12' />
                </label>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className='flex flex-col gap-5'>
        <div>
          <p className='text-xl font-medium'>Email and Phone</p>
          <span>
            Manage the email and phone you use to sign into appUploads and
            receive notifications.
          </span>
        </div>

        <form className='flex items-center gap-3'>
          <div>
            <label htmlFor=''>Email</label>
            <input
              value={''}
              onChange={() => {}}
              type='email'
              name='email'
              id='email'
              className='bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-[14.7rem] p-2.5'
              placeholder='John Do...'
            />
          </div>
          <div>
            <label htmlFor=''>Phone</label>
            <input
              value={''}
              onChange={() => {}}
              type='text'
              name='Phone'
              id='phone'
              className='bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-[14.7rem] p-2.5'
              placeholder='John Do...'
            />
          </div>
        </form>

        <p>
          For your security, we will send you a code to verify any change to
          your email or phone number.
        </p>
      </div>

      <div>
        <p className=''>Delete Account</p>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
