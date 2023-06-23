import React from 'react';
import { Button, Input, Navbar } from '../../components';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps } from '../../interface';
import { Link } from 'react-router-dom';

interface Props {
  status: string;
  value: UserDocumentProps[];
}

const AccessPage = () => {
  const [inputValue, setInputValue] = React.useState<string>(''); // State for storing the search input value for document IDs
  const [accessedDocumentData, setAccessDocumentData] = React.useState<UserDocumentProps>()

  const { getPublicDocumentById } = useAppwriteContext();

  const handleFindFileById = async (event: React.SyntheticEvent) => {
    event.preventDefault(); // Prevent

    if (inputValue) {
      const data = await getPublicDocumentById(inputValue);
      console.log(data);
      setAccessDocumentData(data)
    }
  };
  return (
    <React.Fragment>
      <Navbar />

      <main className='w-full h-screen flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] gap-[10rem] backdrop:blur-lg shadow-lg md:px-32 pb-32'>
        <section className='w-full flex flex-col items-center justify-center mt-32'>
          <div className='w-full'>
            <p className='font-bold text-3xl dark:text-gray-300'>
              Get Access to your files without having to login.
            </p>
          </div>

          <div className='w-full'>
            <form
              onSubmit={handleFindFileById}
              className='w-full flex items-center'
            >
              <Input
                elementType='input'
                name='access'
                placeholder='Hye38BuHj'
                onChange={(event) => setInputValue(event?.target.value)}
                value={inputValue}
                disabled={false}
                styles={``}
              />

              <Button type='submit' styles='' title='Find'>
                Find
              </Button>
            </form>
          </div>
        </section>

        <section>
          <div className='w-40 h-40 bg-[rgba(255,255,255,0.4)] backdrop-blur-lg rounded-lg flex items-center justify-center'>
            <p>Locked</p>
            <Link to={`/access/${accessedDocumentData?.$id}`}>View</Link>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default AccessPage;
