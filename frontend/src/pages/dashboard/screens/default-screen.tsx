// import React from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '../../../utils/motion';

const VideoScreen = () => {
  return (
    <motion.div
      {...fadeAnimation}
      className='bg-transparent w-full h-full overflow-y-auto p-3 '
    >
      <motion.div className='w-full flex flex-col items-center justify-center p-5'>
        <p className=' w-fit text-xl text-center font-medium rounded-lg px-4 py-2 bg  text-gray-50 bg-[rgb(255,255,255,0.2)]  backdrop-blur-md'>
          User Guidelines and Rules: Creating a Safe and Collaborative
          Environment
        </p>

        <div>
          <ul>
            <li>
              File Size Limit: Please note that the maximum file size allowed
              for upload is 1GB. We recommend compressing large files or using
              alternative methods for sharing larger files.
            </li>

            <li>
              Content Policy: We have a strict policy against the upload and
              sharing of explicit adult content, including pornography, in any
              form. This service is used by a diverse user base, and we aim to
              maintain a respectful and inclusive environment for all users.
            </li>

            <li>
              Spread the Word: Help us grow! If you find our service useful, we
              encourage you to share it with your friends, colleagues, and
              networks. Your support in spreading the word is greatly
              appreciated.
            </li>

            <li>
              Open-source Contributions: This project is open-source, and we
              welcome contributions from developers. If you're interested in
              contributing to the project, please visit our GitHub repository
              [insert link] and follow the contribution guidelines.
            </li>

            <li>
              Respect and Collaboration: Let's maintain a respectful and
              collaborative atmosphere. If you encounter any issues or have
              suggestions for improvement, please reach out to us. We appreciate
              your feedback, and together we can make this service even better.
            </li>

            <li>
              Connect with the Developer: This project was developed by me as a
              solo developer, but I'm open to collaboration and connecting with
              others. You can find me on Google, Facebook, Twitter, LinkedIn,
              and Instagram as Rocky Essel. Feel free to reach out and connect.
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoScreen;
