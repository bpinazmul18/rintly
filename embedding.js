const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: {
  //     type: authorSchema,
  //     required: true,
  // }
  authors: [authorSchema]
}));

// async function createCourse(name, author) {
//   const course = new Course({
//     name, 
//     author
//   }); 
  
//   const result = await course.save();
//   console.log(result);
// }

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
  const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });
}

async function addAuthor(courseId, author){
  // const course = await Course.findById(courseId);
  // course.authors.push(author);
  // console.log(await course.save());

  const course = await Course.findById(courseId)
  course.authors.push(author)

  course.save()

  console.log(course);
}

async function removeAuthor(courseId, authorId){
  // const course = await Course.findById(courseId);
  // var theAuthor = course.authors.id(authorId);
  // theAuthor.remove();
  // console.log(await course.save());

  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

async function updateAuthor (courseId) {
    // const course = await Course.findById(courseId)
    // console.log(`Before Course ${course}`);
    // course.author.name = 'Borsha'
    // course.save()
    // console.log(`After Course ${course}`);

    // const course = await Course.updateOne({ _id: courseId}, {
    //     $set: {
    //         'author.name': 'Rabeya'
    //     }
    // })

    const course = await Course.updateOne({ _id: courseId}, {
        $unset: {
            'author': ''
        }
    })

    console.log(`Course ${course}`);
}



// createCourse('Node Course', new Author({ name: 'Nazmul Haque'})); 
// createCourse('Node Course', [
//   new Author({ name: 'Nazmul Haque'}),
//   new Author({ name: 'Borsha'})
// ]); 
// updateAuthor('62922489a328a513d5919744')

// addAuthor('62937ca69a8bd84428c84901', new Author({ name: 'Johan'}))
removeAuthor('62937ca69a8bd84428c84901', '62937d5e1d41d28e0072507c')