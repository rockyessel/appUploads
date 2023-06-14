import React from 'react';
import Layout from '../../components/dashboard/layout';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Button } from '../../components';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps } from '../../interface';
import MediaCard from '../../components/media-card';

const FileSearchUsers = () => {
  // State variables
  const [hideDropdownMenu, setHideDropdownMenu] = React.useState(false); // State for toggling the visibility of the dropdown menu
  const [publicDocumentData, setPublicDocumentData] = React.useState<
    UserDocumentProps[]
  >([]); // State for storing public document data
  const [findDocumentIdSearch, setFindDocumentIdSearch] =
    React.useState<string>(''); // State for storing the search input value for document IDs
  const [gottenDocumentsFromSearch, setGottenDocumentsFromSearch] =
    React.useState<UserDocumentProps[] | undefined | []>([]); // State for storing the documents obtained from search

  // Destructure the required functions from the Appwrite context
  const { getAllPublicDocuments, getDocumentById } = useAppwriteContext();

  // Fetch all public documents when the component mounts
  React.useEffect(() => {
    getAllPublicDocuments().then((data) => {
      setPublicDocumentData(data.documents);
    });
  }, [getAllPublicDocuments]);

  // Toggle the visibility of the dropdown menu
  const handleHideDropdownMenu = () => {
    setHideDropdownMenu((prev) => !prev);
  };

  // Handle finding documents by code
  const handleFindDocumentByCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (findDocumentIdSearch) {
      const findDocumentIdArr = findDocumentIdSearch.split(',');
      console.log('findDocumentIdArr', findDocumentIdArr);

      // Map each code to a promise of fetching the document by ID
      const findPromise = findDocumentIdArr.map((code) =>
        getDocumentById(code)
      );

      // Execute all promises and wait for their settlement
      const data = (await Promise.allSettled(findPromise));

      // Update the state with the obtained documents from search
      setGottenDocumentsFromSearch((previousData) => {
        return [...(previousData || []), ...data] as
          | UserDocumentProps[]
          | []
          | undefined;
        // Casting Explanation: Here, we use the spread operator to concatenate the previousData array (if it exists) with the new data array. The as keyword is used for casting the resulting array to the type UserDocumentProps[], [] or undefined. This casting is necessary because the state variable gottenDocumentsFromSearch is defined as UserDocumentProps[] | undefined | [], allowing for three possible types of values it can hold.
      });
    }
  };

// Log the value of findDocumentIdSearch
console.log('findDocumentIdSearch', findDocumentIdSearch);

// Dropdown menu options
const dropdownMenu = [
  { name: 'All Categories' },
  { name: 'Images' },
  { name: 'Applications' },
  { name: 'Documents' },
  { name: 'File with code' },
];

// Handle change event of the search input
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = event;
  setFindDocumentIdSearch(target.value);
};

  console.log('gottenDocumentsFromSearch', gottenDocumentsFromSearch);

  return (
    <Layout>
      <div className=' text-sm gap-2 w-full h-full overflow-y-auto p-3'>
        <div className='w-full flex gap-2'>
          <div className='w-fit inline-flex flex-col'>
            <span
              onClick={handleHideDropdownMenu}
              className='relative flex-shrink-0 inline-flex items-center gap-1 border-[1px] border-gray-50/60 p-3.5 rounded-lg'
            >
              Search Option <AiOutlineCaretDown />
              {hideDropdownMenu && (
                <span className='w-full absolute bg-[rgba(255,255,255,0.3)] flex flex-col left-0 top-12 mt-1 rounded-lg border-[1px] backdrop-blur-md z-[30] border-gray-50/60 p-2'>
                  {dropdownMenu.map((menuItem, index) => (
                    <span
                      key={index}
                      onClick={handleHideDropdownMenu}
                      className='p-1.5 w-full rounded-lg hover:bg-[rgba(255,255,255,0.5)] cursor-pointer'
                    >
                      {menuItem.name}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </div>
          <form onSubmit={handleFindDocumentByCode}>
            <input
              type='text'
              value={findDocumentIdSearch}
              onChange={handleChange}
              className='w-full  input bg-transparent border-[1px] border-gray-50/60'
              placeholder='Search file with code'
            />
            <Button
              type='submit'
              title='Find'
              styles='w-fit border-[1px] border-gray-50/60 rounded-lg flex-shrink-0'
            >
              Find
              <BsSearch />
            </Button>
          </form>
        </div>

        <div>
          <Button styles='' title='Go to Search'>
            Go to Search
          </Button>
          <Button styles='' title='Browse Public Files'>
            Browse Public Files
          </Button>
        </div>

        <ul className='flex flex-wrap gap-2 items-center'>
          {publicDocumentData.map((publicDocument, index) => (
            <MediaCard
              key={index}
              data={publicDocument}
              extension={`${publicDocument?.mimeType?.split('/').shift()} ${
                publicDocument?.extension
              }`}
            />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default FileSearchUsers;
