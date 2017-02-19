const db = require('APP/db');

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'many', email: 'god@example.com', password: '1234'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '1234'},
  {firstName: 'Beth', lastName: 'Qiang', email: 'bqiang@fs.com', password: '1234'},
  {firstName: 'Mark', lastName: 'Hario', email: 'mhario@fs.com', password: '1234'},
  {firstName: 'Joey', lastName: 'Darbyshire', email: 'jdarbyshire@fs.com', password: '1234'}
], user => db.model('users').create(user));

const seedProducts = () => db.Promise.map([
  {name: 'Cat Bot',
    shortDescription: 'A cat that can change its own litter box.',
    fullDescription: 'Ever want a cat, but don\'t really want to take care of it? (Who really wants to scoop litter, anyway?) With Cat Bot, you get all of the perks of having a furry, cuddly thing, but without any of the work--it can take care of itself!',
    price: 30000,
    images: ['/images/cat-bot.png'],
    category: ['pet'],
    inventory: 100},
  {name: 'Dance Bot',
    shortDescription: 'Learn to dance without making a fool of yourself.',
    fullDescription: 'From impressing people at weddings (or even your own!), to taking your new beau on a salsa date, to even just getting a good workout, knowing how to dance can be a valuable skill. However, one thing that holds a lot of people back is that they feel silly while they\'re learning. With Dance Bot, you can learn in the safety of your own home, and surprise that date with your skills the next time you\'re out!',
    price: 66000,
    images: ['/images/dance-bot.png'],
    category: ['sport'],
    inventory: 100},
  {name: 'Hug Bot',
    shortDescription: 'Because hugs make everything better.',
    fullDescription: 'Sometimes, you just really need a hug, and no one\'s around. Enter, Hug Bot! Hug Bot can be fully customizable with hug styles and the pressure that it uses.',
    price: 24000,
    images: ['/images/hug-bot.jpg'],
    category: ['emotional'],
    inventory: 100},
  {name: 'Pet Sitter Bot',
    shortDescription: 'Take the pain out of finding someone to watch Fido.',
    fullDescription: 'You\'re out somewhere with co-workers or friends, and they decide they want to hit up a different bar for another hour. You\'ve already gone the entire day without letting the pup out, but you also don\'t want to miss the chance of checking out this cool new bar that just opened up. With Pet Sitter Bot, this dilemma isn\'t a dilemma anymore--let it know you\'ll be a little late, and it will perform its duties as determined by your pet\'s schedule until you arrive home.',
    price: 48000,
    images: ['/images/pet-sitter-bot.png'],
    category: ['pet'],
    inventory: 100},
  {name: 'Posture Bot',
    shortDescription: 'Let Posture Bot help you help your back.',
    fullDescription: 'Most of our jobs these days involve sitting at a desk for 9+ hours, with less-than-ideal posture and screen positioning. Posture Bot can help! Not only will it help you set up your work environment to ensure ideal posture, but it can also monitor your posture and alert you accordingly. It can also be programmed to remind you to get up and walk around if you\'ve been sitting for too long.',
    price: 36000,
    images: ['/images/posture-bot.png'],
    category: ['health'],
    inventory: 100},
  {name: 'Productivity Bot',
    shortDescription: 'Never answer another useless email again.',
    fullDescription: 'The amount of emails, phone calls, texts, and Slack messages that we receive these days that interrupt our daily workflow is extraordinary. Productivity Bot will look at all of these, intelligently respond to the ones that it can, and pass off the more important ones to you.',
    price: 90000,
    images: ['/images/productivity-bot.jpg'],
    category: ['productivity'],
    inventory: 100},
  {name: 'Seasonal Bot',
    shortDescription: 'Your personal decorator for every holiday.',
    fullDescription: 'It’s always nice to have your house decorated for the holidays. But it can also be a pain to do, especially for every holiday every year. This cheery seasonal bot can be programmed to decorate for any holiday, including custom ones such as anniversaries or birthdays.',
    price: 28000,
    images: ['/images/seasonal-bot.png'],
    category: ['decorator'],
    inventory: 100},
  {name: 'Security Bot',
    shortDescription: 'A personal bodyguard for the home and beyond.',
    fullDescription: 'Live in an unsafe neighborhood to save on rent, or do you just want some heightend security around the house? Look no further than Security Bot. It can tell the difference between the postman and the person disguised as a postman in attempt to break into your house, and will deal with the intruder accordingly.',
    price: 96000,
    images: ['/images/security-bot.jpg'],
    category: ['security'],
    inventory: 100},
  {name: 'Trainer Bot',
    shortDescription: 'We get it, motivating yourself to exercise is hard.',
    fullDescription: 'We all know motivating ourselves to exercise on a consistent basis (and not just the first two weeks of every new year!) is one of the most challenging feats in life. Not only will Trainer Bot badger you at your time of choice until you\'re in workout clothes, but it\'ll also work with you at your current level to improve your fitness with every workout.',
    price: 66000,
    images: ['/images/trainer-bot.png'],
    category: ['sport', 'health'],
    inventory: 100},
  {name: 'Wall-E',
    shortDescription: 'A friend who\'s willing to pick up after you.',
    fullDescription: 'As seen in the famous futuristic movie, Wall-E isn\'t just a loyal friend, he\'ll also make sure that your home is clean. If you ask nicely, he might even go outside and pick up your non-robotic dog\'s business!',
    price: 50000,
    images: ['/images/wall-e.jpg'],
    category: ['cleaner'],
    inventory: 100}
], product => db.model('products').create(product));

let userArr, productArr;

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => {
    userArr = users;
    console.log(`Seeded ${users.length} users OK`);
  })
  .then(seedProducts)
  .then(products => {
    console.log(`Seeded ${products.length} products OK`);
    productArr = products;
    const arrOfRatingPromises = [];
    let counter = 0;
    products.forEach(product => {
      // runs 5 times, once for each star
      for (let i = 1; i < 6; i++) {
        // Creates up to 5 i star ratings for each product
        let randNum = Math.round(Math.random() * 5);
        for (randNum; randNum > 0; randNum--) {
          counter++;
          arrOfRatingPromises.push(db.model('ratings').create({
            stars: i
          })
          .then(rating => {
            return rating.setProduct(product);
          })
          .catch(err => {
            console.log(`Error with Product: ${product.name}! ${err}`);
          }));
        }
      }
    });
    console.log(`Creating ${counter} random guest ratings`);
    return db.Promise.all(arrOfRatingPromises);
  })
  .then(allRatings => {
    const arrOfReviewPromises = [];
    let counter = 0;
    allRatings.forEach(rating => {
      const userReview = Math.round(Math.random() * 4);
      let createdReview;
      if (userReview === 4) {
        counter++;
        const randUser = Math.floor(Math.random() * userArr.length);
        arrOfReviewPromises.push(db.model('reviews').create({
          title: 'Random Review Name',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur venenatis quam non elementum. In semper erat in ligula iaculis, eu mattis velit maximus. Vivamus.'
        })
        .then(review => {
          createdReview = review;
          review.setUser(userArr[randUser]);
          rating.setUser(userArr[randUser]);
          review.setRating(rating);
          return rating.getProduct();
        })
        .then(ratingProduct => {
          return createdReview.setProduct(ratingProduct)
          .then(updatedReview => {
            const reviewUser = userArr.find(user => {
              return user.id === createdReview.user_id;
            });
            console.log(`Created new Review for ${ratingProduct.name} rating ${rating.id}.  User for the review is ${reviewUser.displayName} and for the rating is ${rating.user_id}`);
          });
        }));
      }
    });
    console.log(`Creating ${counter} random user reviews from ratings`);
    return db.Promise.all(arrOfReviewPromises);
  })
  .then(allReviews => {
    const arrOfOrderPromises = [];
    userArr.map(user => {
      const userOrder = Math.round(Math.random() * 5);
      for (let i = 0; i < userOrder; i++) {
        arrOfOrderPromises.push(db.model('orders').create({
          email: 'someone@somewhere.com',
          shippingAddress: '1234 Fake Lane, Nontown, Earth 12345'
        })
        .then(order => {
          return order.setUser(user);
        })
        .then(order => {
          return order;
        }));
      }
    });
    return db.Promise.all(arrOfOrderPromises);
  })
  .then(orders => {
    const addProductToOrderArr = [];
    orders.map(order => {
      let productCounter = 0;
      let numOfProducts = 0;
      productArr.map(product => {
        numOfProducts = Math.floor(Math.random() * 4);
        if (numOfProducts > 0) {
          addProductToOrderArr.push(order.addProductToOrder(product, numOfProducts));
        }
        productCounter += numOfProducts;
      });
      const orderUser = userArr.find(user => {
        return user.id === order.user_id;
      });
      console.log(`Added ${productCounter} random products to order Number ${order.orderID} for User ${orderUser.displayName}`);
    });
    return db.Promise.all(addProductToOrderArr);
  })
  .then(products => {
    console.log('Finished!!');
  })
  .catch(error => console.error(error))
  .finally(() => db.close());
