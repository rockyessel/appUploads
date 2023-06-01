import {TbApps} from 'react-icons/tb'
import {MdOutlineBrokenImage,MdOutlineSmartDisplay,MdOutlineMusicVideo,MdOutlineDocumentScanner, MdOutlineCloudUpload,MdRestartAlt} from 'react-icons/md'

  export const sidebarMenuCategoriesItems = [
      { name: 'music', title: 'Music', icon: <MdOutlineMusicVideo className='text-2xl text-rose-600' /> },
      { name: 'video', title: 'Videos', icon: <MdOutlineSmartDisplay className='text-2xl text-orange-600' /> },
    { name: 'image', title: 'Images', icon: <MdOutlineBrokenImage className='text-2xl text-green-600' /> },
    { name: 'document', title: 'Documents', icon: <MdOutlineDocumentScanner className='text-2xl text-yellow-500' /> },
    { name: 'application', title: 'Applications', icon: <TbApps className='text-2xl text-slate-500' /> },
    // { name: 'generative-image', title: 'Generative Image', icon: <GiArtificialHive className='text-xl' /> },
];

export const sidebarMenuAppItems = [
    { name: 'upload', title: 'Upload', icon: <MdOutlineCloudUpload className='text-2xl text-blue-500' /> },
    { name: 'recent', title: 'Recent', icon: <MdRestartAlt className='text-2xl text-blue-500' /> },
]
  
export const tabMenu = [
  { name: 'link', title: 'Link Only' },
  { name: 'html-code', title: 'HTML-Code' },
  { name: 'bb-code', title: 'BB-Code' },
];
