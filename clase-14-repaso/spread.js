const product = {
  title: "Product 1",
  price: 100,
  stock: 10,
};

const product2 = { ...product, price: 1000 };

console.log(product, product2);
