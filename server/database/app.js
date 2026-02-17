const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const  cors = require('cors')
const app = express()
const port = 3030;

app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});


const Reviews = require('./review');

const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data['reviews']);
  });
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data['dealerships']);
  });
  
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}


// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API")
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});


// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({
      state: req.params.state
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships by state' });
  }
});


// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const document = await Dealerships.findOne({
      id: parseInt(req.params.id)
    });

    if (!document) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealership by id' });
  }
});


//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  console.log("(((((((((((((((((IAM IN)))))))))))))))))")
  const data = JSON.parse(req.body);
  console.log("111111111111111111111", data)
  const documents = await Reviews.find().sort( { id: -1 } )
  console.log("22222222222222222222222222", documents)
  let new_id = documents[0]['id']+1
  console.log("33333333333333333333333333", new_id)

  const review = new Reviews({
		"id": new_id,
		"name": data['name'],
		"dealership": data['dealership'],
		"review": data['review'],
		"purchase": data['purchase'],
		"purchase_date": data['purchase_date'],
		"car_make": data['car_make'],
		"car_model": data['car_model'],
		"car_year": data['car_year'],
	});

    console.log("555555555555555555555555555", review)

  try {
    console.log("(((((((((((((((((IAM IN TRY)))))))))))))))))")
    const savedReview = await review.save();
    console.log("6666666666666666666666666666", savedReview)
    res.json(savedReview);
  } catch (error) {
    console.log("(((((((((((((((((IAM IN CATCH)))))))))))))))))", error)
		console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Express route to insert review
// app.post('/insert_review', express.json(), async (req, res) => {
//     console.log("(((((((((((((((((IAM IN)))))))))))))))))")
//     try {
//         console.log("(((((((((((((((((IAM IN TRY)))))))))))))))))")
//         // Get data from req.body (express.json() parses it automatically)
//         const data = req.body;
//         console.log("111111111111111111111", data)
//         // Handle empty collection case
//         const documents = await Reviews.find().sort({ id: -1 }).limit(1);
//         console.log("22222222222222222222222222", documents)
//         let new_id = 1; // Default for empty collection
//         console.log("33333333333333333333333333", new_id)
//         if (documents.length > 0) {
//         new_id = documents[0].id + 1;
//         }
        
//         // Validate required fields
//         if (!data.name || !data.review) {
//         return res.status(400).json({ error: 'Name and review are required' });
//         }
//         console.log("444444444444444444444444444")
        
//         const review = new Reviews({
//         "id": new_id,
//         "name": data.name,
//         "dealership": data.dealership || '', // Provide defaults for optional fields
//         "review": data.review,
//         "purchase": data.purchase || false,
//         "purchase_date": data.purchase_date || null,
//         "car_make": data.car_make || '',
//         "car_model": data.car_model || '',
//         "car_year": data.car_year || null,
//         });

//         console.log("555555555555555555555555555", review)

//         const savedReview = await review.save();
//         res.status(201).json(savedReview); // 201 Created is more appropriate

//         console.log("6666666666666666666666666666", savedReview)
        
//     } catch (error) {
//         console.log("(((((((((((((((((IAM IN CATCH)))))))))))))))))", error.message)
//         console.error('Error inserting review:', error);
        
//         // Handle specific errors
//         if (error.name === 'ValidationError') {
//         return res.status(400).json({ error: error.message });
//         }
        
//         res.status(500).json({ error: 'Error inserting review' });
//     }
// });



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
