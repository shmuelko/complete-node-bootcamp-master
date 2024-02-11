const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file :)');
      resolve(data);
    });
  });
};

const writeFilePro = (file, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err) => {
      if (err) reject('I could not write to the file :(');
      resolve('File saved!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);

    console.log(`Breed: ${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);

    const imags = all.map((x) => x.body.message);
    console.log(imags);

    await writeFilePro('dog-img.txt', imags.join('\n'));
    console.log('Random dog image saved to dog-img.txt');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return 'Dog pic is REALLY Done';
};
(async () => {
  try {
    console.log('Dog pic is running');

    const result = await getDogPic();
    console.log(result);
    console.log('Dog pic is Done');
  } catch (err) {
    console.log(err);
  }
})();

// console.log('Dog pic is running');
// getDogPic()
//   .then((x) => console.log(x))
//   .catch((err) => console.log(err));

// console.log('Dog pic is Done');

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to dog-img.txt');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
