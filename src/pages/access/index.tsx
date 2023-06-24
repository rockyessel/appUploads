import React from 'react';
import { Button, Input, Navbar } from '../../components';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps } from '../../interface';
import { Link } from 'react-router-dom';

const AccessPage = () => {
  const [inputValue, setInputValue] = React.useState<string>(''); // State for storing the search input value for document IDs
  const [accessedDocumentData, setAccessDocumentData] =
    React.useState<UserDocumentProps>(); // State variable to store accessed document data

  const { getPublicDocumentById } = useAppwriteContext(); // Custom hook to retrieve public document by ID

  const handleFindFileById = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault(); // Prevent the default form submission behavior

      if (inputValue) {
        // Check if the input value exists
        const data = await getPublicDocumentById(inputValue); // Retrieve the public document data using the input value (ID)
        // console.log('inputValue data', data);
        setAccessDocumentData(data); // Update the state with the accessed document data
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Navbar /> {/* Render the Navbar component */}
      {/* Main section */}
      <main className='w-full h-screen flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] gap-[10rem] backdrop:blur-lg shadow-lg md:px-32 pb-32'>
        {/* First section */}
        <section className='w-full flex flex-col items-center justify-center mt-32'>
          <div className='w-full'>
            <p className='font-bold text-3xl dark:text-gray-300'>
              Get Access to your files without having to login.
            </p>
          </div>

          <div className='w-full'>
            {/* File access form */}
            <form
              onSubmit={handleFindFileById} // Call handleFindFileById function on form submission
              className='w-full flex items-center'
            >
              {/* Input field for the access code */}
              <Input
                elementType='input'
                name='access'
                placeholder='Hye38BuHj'
                onChange={(event) => setInputValue(event?.target.value)} // Update inputValue state on input change
                value={inputValue}
                disabled={false}
                styles={``}
              />

              {/* Button to submit the form */}
              <Button type='submit' styles='' title='Find'>
                Find
              </Button>
            </form>
          </div>
        </section>

        {/* Second section */}
        <section>
          {/* Render if accessedDocumentData exists */}
          {accessedDocumentData && (
            <div className='w-40 h-40 bg-[rgba(255,255,255,0.4)] backdrop-blur-lg rounded-lg flex flex-col gap-2 items-center justify-center'>
              <p>Locked</p>
              <Link to={`/access/${accessedDocumentData?.$id}`}>
                Unlock Here
              </Link>{' '}
              {/* Link to unlock the document */}
            </div>
          )}
        </section>
      </main>
    </React.Fragment>
  );
};

export default AccessPage;
