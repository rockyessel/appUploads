import express from 'express';
import sdk from 'node-appwrite';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const shuffleString = (input) => {
  const shuffleRatio = Math.random() * 0.8;
  let characters = input.split('');
  characters = characters.sort(() => Math.random() - shuffleRatio);
  return characters.join('');
};

const generateString = () => {
  const characters = shuffleString(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  );
  const length = Math.floor(Math.random() * 6) + 5;
  const usedChars = [];
  let result = '';

  for (let i = 0; i < length; i++) {
    let index;

    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
};

const getBucket = async () => {
  try {
    const data = await storage.listFiles('1212');
    console.log('data', data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Request done.');
  }
};

const client = new sdk.Client();
const storage = new sdk.Storage(client);
const users = new sdk.Users(client);
const account = new sdk.Account(client);
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6467e00455d86a312998')
  .setKey(
    '0900a0eaa60f6f2319bd695cc89339c088dc5e5911a829a783b2fedacaa60455823fc48c4d79c8f040c2798181a9edba0c5cfb027f4583ed46166c0a537387d68da43c0cee4a85e8bec975f9aa91fb7b2868a0a53caf75b209f50e3d9d5d8b378c645c7ed91aa1b78518783c8e3f675ebe1fe8b56a4068879ca970032ba2544e'
  );

const createUser = async (req, res) => {
  const rnd = generateString();
  const data = await user.createBcryptUser(
    `${rnd}`,
    `${req.body?.email}`,
    `${req.body?.password}`,
    `${req.body?.name}`
  );
  res.json(data);
};

const getUsers = async (req, res) => {
  const data = await users.get('u8hCl2');
  res.json(data);
};

app.post('/user', createUser);

app.get('/user', getUsers);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
