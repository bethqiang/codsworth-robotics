const db = require('APP/db');

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'many', email: 'god@example.com', password: '1234'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '1234'},
  {firstName: 'Beth', lastName: 'Qiang', email: 'bqiang@fs.com', password: '1234'},
  {firstName: 'Mark', lastName: 'Hario', email: 'mhario@fs.com', password: '1234'},
  {firstName: 'Joey', lastName: 'Darbyshire', email: 'jdarbyshire@fs.com', password: '1234'}
], user => db.model('users').create(user));

const seedProducts = () => db.Promise.map([
  {name: 'Cat Bot', shortDescription: 'A cat that can change its own litter box.', fullDescription: 'TBD', price: 30000, images: ['/images/cat-bot.png'], category: ['pet'], inventory: 100},
  {name: 'Cute Bot', shortDescription: 'Something cute to look at and entertain you.', fullDescription: 'TBD', price: 18000, images: ['/images/cute-bot.png'], category: ['pet'], inventory: 100},
  {name: 'Dance Bot', shortDescription: 'Learn to dance without making a fool of yourself.', fullDescription: 'TBD', price: 66000, images: ['/images/dance-bot.png'], category: ['sport'], inventory: 100},
  {name: 'Hug Bot', shortDescription: 'Because hugs make everything better.', fullDescription: 'TBD', price: 24000, images: ['/images/hug-bot.jpg'], category: ['emotional'], inventory: 100},
  {name: 'Pet Sitter Bot', shortDescription: 'Take the pain out of finding someone to watch Fido.', fullDescription: 'TBD', price: 48000, images: ['/images/pet-sitter-bot.png'], category: ['pet'], inventory: 100},
  {name: 'Posture Bot', shortDescription: 'Let Posture Bot help you help your back.', fullDescription: 'TBD', price: 36000, images: ['/images/posture-bot.png'], category: ['health'], inventory: 100},
  {name: 'Productivity Bot', shortDescription: 'Never answer another useless email again.', fullDescription: 'TBD', price: 90000, images: ['/images/productivity-bot.jpg'], category: ['productivity'], inventory: 100},
  {name: 'Seasonal Bot', shortDescription: 'Your personal decorator for every holiday.', fullDescription: 'It’s always nice to have your house decorated for the holidays. But it can also be a pain to do, especially for every holiday every year. This cheery seasonal bot can be programmed to decorate for any holiday, including custom ones such as anniversaries or birthdays.', price: 28000, images: ['/images/seasonal-bot.png'], category: ['decorator'], inventory: 100},
  {name: 'Security Bot', shortDescription: 'A personal bodyguard for the home and beyond.', fullDescription: 'TBD', price: 96000, images: ['/images/security-bot.jpg'], category: ['security'], inventory: 100},
  {name: 'Trainer Bot', shortDescription: 'We get it, motivating yourself to exercise is hard.', fullDescription: 'TBD', price: 66000, images: ['/images/trainer-bot.png'], category: ['sport', 'health'], inventory: 100},
  {name: 'Wall-E', shortDescription: 'A friend who\'s willing to pick up after you.', fullDescription: 'TBD', price: 50000, images: ['/images/wall-e.jpg'], category: ['cleaner'], inventory: 100}
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
