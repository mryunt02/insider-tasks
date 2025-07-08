const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function getUserInfo() {
  const name = await askQuestion("Please enter your name: ");
  const age = parseInt(await askQuestion("Please enter your age: "));
  const profession = await askQuestion("Please enter your profession: ");

  const user = { name, age, profession };
  console.log("User Information:", user);
  return user;
}

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 80 },
  { name: "Monitor", price: 300 },
  { name: "Headphones", price: 150 },
];

let cart = [];

function addToCart(productName) {
  const product = products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );
  if (product) {
    cart.push(product);
    console.log(`${product.name} added to cart!`);
  } else {
    console.log("Product not found!");
  }
}

function listCart() {
  console.log("Items in cart:");
  cart.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price}`);
  });
}

function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Total cart value: $${total}`);
  return total;
}

async function addNewProduct() {
  const name = await askQuestion("Enter product name: ");
  const priceInput = await askQuestion("Enter product price: ");
  const price = parseFloat(priceInput);

  if (name && !isNaN(price)) {
    products.push({ name, price });
    console.log(`${name} added to products list!`);
  } else {
    console.log("Invalid input! Please provide valid name and price.");
  }
}

function removeFromCart(productName) {
  const index = cart.findIndex(
    (item) => item.name.toLowerCase() === productName.toLowerCase()
  );
  if (index !== -1) {
    const removedItem = cart.splice(index, 1)[0];
    console.log(`${removedItem.name} removed from cart!`);
  } else {
    console.log("Product not found in cart!");
  }
}

function showProducts() {
  console.log("Available Products:");
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - $${product.price}`);
  });
}

async function main() {
  console.log("=== Welcome to the Shopping Cart System ===");

  const currentUser = await getUserInfo();
  console.log(`Hello ${currentUser.name}! Welcome to our store.`);

  showProducts();

  console.log("\n=== Adding products to cart ===");
  addToCart("Laptop");
  addToCart("Mouse");
  addToCart("Headphones");

  console.log("\n=== Current Cart ===");
  listCart();

  console.log("\n=== Total Calculation ===");
  calculateTotal();
  console.log("\n=== Adding new product ===");
  products.push({ name: "Webcam", price: 75 });
  console.log("Webcam added to products list!");

  console.log("\n=== Updated Product List ===");
  showProducts();

  console.log("\n=== Removing item from cart ===");
  removeFromCart("Mouse");

  console.log("\n=== Final Cart ===");
  listCart();
  calculateTotal();

  console.log("\n=== Interactive Functions Available ===");
  console.log("You can use these functions in the console:");
  console.log("- addToCart('ProductName')");
  console.log("- removeFromCart('ProductName')");
  console.log("- addNewProduct()");
  console.log("- listCart()");
  console.log("- calculateTotal()");
  console.log("- showProducts()");

  rl.close();
}

main().catch(console.error);
