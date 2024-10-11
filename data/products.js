import formatCurrency from "../scripts/utils/money.js";

export function findMatchingProduct(productId) {
  let matchedProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchedProduct = product;
    }
  });

  return matchedProduct;
}

export class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  findMatchingProduct(productId) {
    let matchedProduct;
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchedProduct = product;
      }
    });
  
    return matchedProduct;
  }

  extraInfoHTML() {
    return '';  
  }
}

export class Clothing extends Product {
  type;
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); // Calls constructor of parent class
    this.sizeChartLink = productDetails.sizeChartLink;
    this.type = productDetails.type;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target ="_blank">
      Size Chart
      </a>
    `;
  }
}

export class Appliance extends Product {
  type;
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails); // Calls constructor of parent class
    this.type = productDetails.type;
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target ="_blank">
      Instructions
      </a>
      <a href="${this.warrantyLink}" target ="_blank">
      Warranty
      </a>
    `;
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    const productsPlus = [
      {
        id: "id1",
        image: "https://m.media-amazon.com/images/I/51YMyR2ItkL._AC_SX425_.jpg",
        name: "Pokemon Center: Sitting Cuties: Mewtwo Plush # 150 - Generation 1",
        rating: {
          stars: 3.5,
          count: 186
        },
        priceCents: 3999,
        keywords: [
          "pokemon",
          "games",
          "anime",
          "japan"
        ]
      },
      {
        id: "id2",
        image: "https://m.media-amazon.com/images/I/51-wtgwBmIL._AC_SL1200_.jpg",
        name: "Frog Dragon I Nick Michel Skateboard Deck - Black - 8.25",
        rating: {
          stars: 4.5,
          count: 83
        },
        priceCents: 7695,
        keywords: [
          "skateboard",
          "frog",
          "skateboaring",
          "extreme sports"
        ]
      },
      {
        id: "id3",
        image: "https://m.media-amazon.com/images/I/51TNwmUxQTL._AC_SY395_.jpg",
        name: "Punk Skeleton Skull Necklace Captivity Skull Pendent Biker Rock Jewelry Gift for Men and Women",
        rating: {
          stars: 4.0,
          count: 213
        },
        priceCents: 1199,
        keywords: [
          "punk",
          "goth",
          "skeleton",
          "necklace"
        ]
      },
      {
        id: "id4",
        image: "https://m.media-amazon.com/images/I/71XcbPOEWVL._SL1500_.jpg",
        name: "Blood On The Dance Floor / HIStory In The Mix: CD",
        rating: {
          stars: 4.5,
          count: 13 
        },
        priceCents: 998,
        keywords: [
          "music",
          "cd",
          "michael jackson",
          "pop"
        ]
      },
      {
        id: "id5",
        image: "https://m.media-amazon.com/images/I/713XWtE3wpL._AC_SL1500_.jpg",
        name: "Automatic Cat Food Dispenser: Automatic Cat Feeder- 4L Timed Pet Feeder 1-6 Meals Portion Control for Cat& Small Dog",
        rating: {
          stars: 4.5,
          count: 152 
        },
        priceCents: 3599,
        keywords: [
          "pets",
          "cat",
          "automatic feeder",
          "dog"
        ]
      },
      {
        id: "id6",
        image: "https://m.media-amazon.com/images/I/51xw-1rkxNL._AC_SL1500_.jpg",
        name: "MEGAWISE Cool Mist Humidifiers for Bedroom",
        rating: {
          stars: 4.0,
          count: 2787 
        },
        priceCents: 1439,
        keywords: [
          "bedroom",
          "living",
          "humidifier",
          "houseware"
        ]
      },
      {
        id: "id7",
        image: "https://m.media-amazon.com/images/I/815+UyDCT+L._SL1500_.jpg",
        name: "SOUR PATCH KIDS Soft & Chewy Candy, Family Size, 1.8 lb",
        rating: {
          stars: 5.0,
          count: 670 
        },
        priceCents: 689,
        keywords: [
          "candy",
          "food",
          "perishable",
          "dessert"
        ]
      }
    ].map((productDetails) => {
      if (productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    productsPlus.forEach((product) => {
      products.push(product);
    });
    //console.log('load products');
  })/*.catch(() => {
    console.log('Unexpected error. Please try again later.');
  })*/;
  return promise; // returns entire promise
}

export async function loadProducts() {
  const response = await fetch('https://supersimplebackend.dev/products');
  
  const productsData = await response.json();
  
  let products = [];
  
  products = productsData.map((productDetails) => {
    if (productDetails.type === 'clothing'){
      return new Clothing(productDetails);
    }
    else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
    }
    return new Product(productDetails);
  });
  
  const productsPlus = [
    {
      id: "id1",
      image: "https://m.media-amazon.com/images/I/51YMyR2ItkL._AC_SX425_.jpg",
      name: "Pokemon Center: Sitting Cuties: Mewtwo Plush # 150 - Generation 1",
      rating: {
        stars: 3.5,
        count: 186
      },
      priceCents: 3999,
      keywords: [
        "pokemon",
        "games",
        "anime",
        "japan"
      ]
    },
    {
      id: "id2",
      image: "https://m.media-amazon.com/images/I/51-wtgwBmIL._AC_SL1200_.jpg",
      name: "Frog Dragon I Nick Michel Skateboard Deck - Black - 8.25",
      rating: {
        stars: 4.5,
        count: 83
      },
      priceCents: 7695,
      keywords: [
        "skateboard",
        "frog",
        "skateboaring",
        "extreme sports"
      ]
    },
    {
      id: "id3",
      image: "https://m.media-amazon.com/images/I/51TNwmUxQTL._AC_SY395_.jpg",
      name: "Punk Skeleton Skull Necklace Captivity Skull Pendent Biker Rock Jewelry Gift for Men and Women",
      rating: {
        stars: 4.0,
        count: 213
      },
      priceCents: 1199,
      keywords: [
        "punk",
        "goth",
        "skeleton",
        "necklace"
      ]
    },
    {
      id: "id4",
      image: "https://m.media-amazon.com/images/I/71XcbPOEWVL._SL1500_.jpg",
      name: "Blood On The Dance Floor / HIStory In The Mix: CD",
      rating: {
        stars: 4.5,
        count: 13 
      },
      priceCents: 998,
      keywords: [
        "music",
        "cd",
        "michael jackson",
        "pop"
      ]
    },
    {
      id: "id5",
      image: "https://m.media-amazon.com/images/I/713XWtE3wpL._AC_SL1500_.jpg",
      name: "Automatic Cat Food Dispenser: Automatic Cat Feeder- 4L Timed Pet Feeder 1-6 Meals Portion Control for Cat& Small Dog",
      rating: {
        stars: 4.5,
        count: 152 
      },
      priceCents: 3599,
      keywords: [
        "pets",
        "cat",
        "automatic feeder",
        "dog"
      ]
    },
    {
      id: "id6",
      image: "https://m.media-amazon.com/images/I/51xw-1rkxNL._AC_SL1500_.jpg",
      name: "MEGAWISE Cool Mist Humidifiers for Bedroom",
      rating: {
        stars: 4.0,
        count: 2787 
      },
      priceCents: 1439,
      keywords: [
        "bedroom",
        "living",
        "humidifier",
        "houseware"
      ]
    },
    {
      id: "id7",
      image: "https://m.media-amazon.com/images/I/815+UyDCT+L._SL1500_.jpg",
      name: "SOUR PATCH KIDS Soft & Chewy Candy, Family Size, 1.8 lb",
      rating: {
        stars: 5.0,
        count: 670 
      },
      priceCents: 689,
      keywords: [
        "candy",
        "food",
        "perishable",
        "dessert"
      ]
    }
  ].map((productDetails) => {
    if (productDetails.type === 'clothing'){
      return new Clothing(productDetails);
    }
    else if (productDetails.type === 'appliance') {
      return new Appliance(productDetails);
    }
    return new Product(productDetails);
  });
  
  productsPlus.forEach((product) => {
    products.push(product);
  });

  return products;
}

products = await loadProducts();

