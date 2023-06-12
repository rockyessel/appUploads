import React from 'react';
import Layout from '../../../components/dashboard/layout';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { Button } from '../../../components';
import { useAppwriteContext } from '../../../context/app-write';
import { UserDocumentProps } from '../../../interface';
import MediaCard from '../../../components/media-card';

const FileSearchUsers = () => {
  const [hideDropdownMenu, setHideDropdownMenu] = React.useState(false);
  const [publicDocumentData, setPublicDocumentData] = React.useState<
    UserDocumentProps[]
  >([]);
  const [documentCodeValue, setDocumentCodeValue] = React.useState<string>('');
  const { getAllPublicDocuments, getDocumentByCode } = useAppwriteContext();

  React.useEffect(() => {
    getAllPublicDocuments().then((data) => {
      setPublicDocumentData(data.documents);
    });
  }, [getAllPublicDocuments]);
  const handleHideDropdownMenu = () => {
    setHideDropdownMenu((prev) => !prev);
  };

  const handleFindDocumentByCode = async (event: any) => {
    event.preventDefault()
    if (documentCodeValue) {
      const findCodeArr = documentCodeValue.split(',');
      console.log('findCodeArr', findCodeArr);
        const findPromise = findCodeArr.map((code) => getDocumentByCode(code));
        await Promise.allSettled(findPromise);
    }
  };

  console.log('documentCodeValue', documentCodeValue);

  const dropdownMenu = [
    { name: 'All Categories' },
    { name: 'Images' },
    { name: 'Applications' },
    { name: 'Documents' },
    { name: 'File with code' },
  ];

  const handleChange = (event: any) => {
    const { target } = event;
    setDocumentCodeValue(target.value);
  };

  console.log('publicDocumentData', publicDocumentData);

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
              value={documentCodeValue}
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
