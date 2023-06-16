import React from 'react';
import { Button, Input, Navbar } from '../../components';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps } from '../../interface';

interface Props {
  status: string;
  value: UserDocumentProps[];
}

const AccessPage = () => {
  const [findDocumentIdSearch, setFindDocumentIdSearch] =
    React.useState<string>(''); // State for storing the search input value for document IDs
  const [gottenDocumentsFromSearch, setGottenDocumentsFromSearch] =
    React.useState<UserDocumentProps[] | []>([]); // State for storing the documents obtained from search
  const { getDocumentById } = useAppwriteContext();

  const handleFindFileById = async (event: any) => {
    event.preventDefault(); // Prevent

    if (findDocumentIdSearch) {
      const findDocumentIdArr = findDocumentIdSearch.split(',');
      console.log('findDocumentIdArr', findDocumentIdArr);
      console.log('gottenDocumentsFromSearch', gottenDocumentsFromSearch);

      // Map each code to a promise of fetching the document by ID
      const findPromise = findDocumentIdArr.map((code) =>
        getDocumentById(code)
      );

      // Execute all promises and wait for their settlement
      const settledPromises = (await Promise.allSettled(
        findPromise
      )) as unknown as Props[]

      console.log('settledPromises', settledPromises);

      // Filter out rejected promises
      const fulfilledPromises = settledPromises.filter(
        (result: { status: string }) => result.status === 'fulfilled'
      );

      // Extract the values from fulfilled promises
       fulfilledPromises.map((result) => result.value);
      // setGottenDocumentsFromSearch(documents);
    }
  };
  return (
    <React.Fragment>
      <Navbar />

      <main className='w-full h-full flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] gap-[10rem] backdrop:blur-lg shadow-lg md:px-32 pb-32'>
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
                onChange={(event) =>
                  setFindDocumentIdSearch(event?.target.value)
                }
                value={findDocumentIdSearch}
                disabled={false}
                styles={``}
              />

              <Button type='submit' styles='' title='Find'>
                Find
              </Button>
            </form>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default AccessPage;
