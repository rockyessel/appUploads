import React from 'react';
import Layout from '../../components/dashboard/layout';
import { BsSearch } from 'react-icons/bs';
import { Button } from '../../components';
import { useAppwriteContext } from '../../context/app-write';
import { UserDocumentProps } from '../../interface';
import { Link } from 'react-router-dom';

const FileSearchUsers = () => {
  // State variables
  const [gottenDocumentsFromSearch, setGottenDocumentsFromSearch] = React.useState<UserDocumentProps[] | undefined | []>([]); // State for storing the documents obtained from search
  const [userInputValue, setUserInputValue] = React.useState<string>(''); // State for storing the documents obtained from search


  // Destructure the required functions from the Appwrite context
  const { getDocumentByFilename } = useAppwriteContext();



const handleDocumentSearchResult = async (event: React.SyntheticEvent) => {
  try {
    event.preventDefault();
    const data = await getDocumentByFilename(userInputValue);
    if (data && data.length !== 0) {
      console.log('search data', data)
      const updatedDocuments: UserDocumentProps[] | [] =  [...(gottenDocumentsFromSearch || []), ...data];
      localStorage.setItem('searchedDocuments', JSON.stringify(updatedDocuments));
    }
  } catch (error) {
    console.log(error);
  }
};


React.useEffect(() => {
  const getDocumentsFromLocalStorage: UserDocumentProps[] = JSON.parse(
    `${localStorage.getItem('searchedDocuments')}`
  );
  if (getDocumentsFromLocalStorage !== null) {
    setGottenDocumentsFromSearch(getDocumentsFromLocalStorage);
  } else {
    setGottenDocumentsFromSearch([]); // or setGottenDocumentsFromSearch(undefined);
  }
}, [setGottenDocumentsFromSearch]);

  console.log('gottenDocumentsFromSearch', gottenDocumentsFromSearch);

  // Handle change event of the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setUserInputValue(target.value);
  };

  return (
    <Layout>
      <div className='flex flex-col gap-10 text-sm w-full h-full overflow-y-auto p-3'>
        <div className='w-full flex gap-2'>
          <form className='w-full flex' onSubmit={handleDocumentSearchResult}>
            <input
              type='text'
              value={userInputValue}
              onChange={handleChange}
              className='w-full  input bg-transparent border-[1px] border-gray-50/60 placeholder:text-white'
              placeholder='Search file name...'
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
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left'>
              <thead className='text-xs uppercase bg-[rgba(255,255,255,0.8)] backdrop-blur-lg dark:bg-[rgba(255,255,255,0.4)] dark:text-white'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Filename
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Document ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Main URL
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Preview URL
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Size
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    mimeType
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Privacy
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Access Code
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    open
                  </th>
                </tr>
              </thead>
              <tbody>
                {gottenDocumentsFromSearch?.length !== 0 ? (
                  gottenDocumentsFromSearch?.map((file, index) => {
                    const extension = `${file.mimeType.split('/').shift()}`;

                    const subDirectoryMap: { [key: string]: string } = {
                      app: 'application',
                      deb: 'application',
                      apk: 'application',
                      xapk: 'application',
                      audio: 'music',
                      image: 'image',
                      video: 'video',
                    };

                    const subDirectory =
                      subDirectoryMap[extension] || 'document';
                    return (
                      <tr
                        key={index}
                        className='dark:bg-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.5)] dark:text-white/80 border-b-[1px] border-gray-50/40'
                      >
                        <th className='px-6 py-4 font-medium whitespace-nowrap'>
                          {file.filename.slice(0, 12)}...{file.extension}
                        </th>
                        <td className='px-6 py-4'>{file.$id}</td>
                        <td className='px-6 py-4'>
                          {file.view.slice(0, 14)}..
                        </td>
                        <td className='px-6 py-4'>
                          {file.preview.slice(0, 14)}..{' '}
                        </td>
                        <td className='px-6 py-4'>{file.size}</td>
                        <td className='px-6 py-4'>{file.mimeType}</td>
                        <td className='px-6 py-4'>
                          {file.isPublic === true ? 'Public' : 'Private'}
                        </td>
                        <td className='px-6 py-4'>{file.accessCode}</td>
                        <Link to={`/dashboard/${subDirectory}/${file.$id}`}>
                          <td className='px-6 py-4'> View Details</td>
                        </Link>
                      </tr>
                    );
                  })
                ) : (
                  <tr className='border-[1px]'>
                    <th className='px-6 py-4 font-medium whitespace-nowrap'>
                      Start looking for a file to see data here.
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FileSearchUsers;
