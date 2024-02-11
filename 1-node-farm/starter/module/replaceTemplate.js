module.exports = (temp, product) => {
  let output = temp.replace(/{productName}/g, product.productName);
  output = output.replace(/{productImage}/g, product.image);
  output = output.replace(/{productPrice}/g, product.price);
  output = output.replace(/{productFrom}/g, product.from);
  output = output.replace(/{prodcutNutrion}/g, product.nutrients);
  output = output.replace(/{productQuantity}/g, product.quantity);
  output = output.replace(/{productDescription}/g, product.description);
  output = output.replace(/{productId}/g, product.id);
  if (!product.organic) output = output.replace(/{productOrganic}/g, 'not-organic');
  return output;
}