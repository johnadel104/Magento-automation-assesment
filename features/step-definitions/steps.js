const { Given, When, Then } = require('@wdio/cucumber-framework');
const {$, $$, browser } = require('@wdio/globals')
const assert = require('assert');

Given('I am on Magento homepage', async () => {
 browser.url('https://magento.softwaretestingboard.com/');
 await browser.maximizeWindow(); //here I chose to maximize the window for better view 
 // and to avoid any erros locating the products after we search
});

When('I search for jacket', async () => {
    const searchInput = await $('#search');
    await searchInput.setValue('jacket');
    const searchIcon = await $ ('.action.search');
    await searchIcon.click();
    await browser.pause(4000); // we need to allow time for the results to upload 

  
});

Then('I should see results related to jacket', async () => {
  await browser.pause(3000); // wait until the results are fully displayed
  await browser.waitUntil(async () => (await $$('li.product-item')).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Expected at least one product to be visible',
  });

  const results = await $$('li.product-item');
  const firstItem = results[0];
  await firstItem.scrollIntoView(); // this is needed as you need to scroll to ensure the item is visible before interacting with it
  const firstTitle = await firstItem.$('a.product-item-link').getText(); // here we are getting the title

  assert(firstTitle.toLowerCase().includes('jacket')); // making sure the title contains the key word "jacket"
});
//To run the above function alone enter "npx wdio wdio.conf.js --spec features/1-search.feature" in the terminal.

//add to cart function

When('I open the first product in the search results', async () => {
  const results = await $$('li.product-item'); // Get all search result items
  const firstItem = results[0]; // Select the first product
  await firstItem.scrollIntoView(); // Ensure it's visible

  const link = await firstItem.$('a.product-item-link'); // Get the product link
  const href = await link.getAttribute('href'); // Extract href attribute
  await browser.url(href); // Navigate to the product page in the same tab to run all 3 features at the sametime without issues

  await browser.pause(2000); // Optional: Wait for the page to load
});

When ('I select the size and color options', async () => {
  const sizeOption = await $('div.swatch-attribute.size .swatch-option'); // Select size
  const colorOption = await $('div.swatch-attribute.color .swatch-option'); // Select color
  await sizeOption.click();
  await colorOption.click();
})

When ('I add the product to the cart', async () => {
  const addToCartBtn = await $('button#product-addtocart-button'); // Locate final Add to Cart button
  await addToCartBtn.waitForClickable({ timeout: 5000 }); // Wait until it's clickable
  await addToCartBtn.click(); // Add the product to cart
  await browser.pause(3000); // Wait for cart to update
})

Then ('I should see the product in the cart', async () => {
  const cartIcon = await $('.action.showcart'); // Open the mini cart
  await cartIcon.click();
  await browser.pause(2000); // Wait for mini cart to load
  const cartItem = await $('.minicart-items .product-item-name'); // Get product name inside cart
  const cartText = await cartItem.getText(); // Read the product name
  assert(cartText.toLowerCase().includes('jacket')); // Verify that the product matches the search
  
})
// To run the above feauture seperately type "npx wdio run wdio.conf.js --spec features/2-Addtocart.feature" in the terminal  

//change quantity function


// Step: Set quantity before add to cart
When('I set the quantity to 2', async () => {
  const qtyInput = await $('input.input-text.qty');
  await qtyInput.setValue('2');
  await browser.pause(500); // Wait for the quantity to get updated
});

// Step: Open the cart and click on the cart icon
When('I open the cart', async () => {
  // Find the cart icon by its selector and click it
  const cartIcon = await $('.action.showcart');
  await cartIcon.waitForClickable({ timeout: 5000 }); // Wait to ensure it is clickable
  await cartIcon.click();
  await browser.pause(3000); // Wait for the cart to load
});

// Step: Check cart total is correct after setting quantity to 2
Then('the cart total should be 2 times the product price', async () => {
  // Open the full cart page
  const viewCartBtn = await $('a.action.viewcart');
  await viewCartBtn.waitForClickable({ timeout: 5000 });
  await viewCartBtn.click();
  await browser.pause(3000); // wait for full cart page to load

  // Wait for total price to be visible
  const total = await $('tr.grand.totals span.price');
  await total.waitForDisplayed({ timeout: 5000 });

  // Read and validate the total
  const totalText = await total.getText();
  console.log('Cart Total:', totalText);
  expect(totalText).toContain('$114.00'); // adjust based on the product price x2
});

// Step: Update quantity from 2 to 1 and validate total
When('I update the quantity to 1 from the cart', async () => {
  const qtyInput = await $('input.input-text.qty');
  await qtyInput.setValue('1'); //change the quantity from 2 to 1

  const updateBtn = await $('button.update');
  await updateBtn.waitForClickable({ timeout: 5000 });
  await updateBtn.click();
  await browser.pause(3000); // wait for cart to update
});

// Step: Validate cart total is correct after decreasing quantity
Then('the cart total should be 1 times the product price', async () => {
  const total = await $('tr.grand.totals span.price');
  await total.waitForDisplayed({ timeout: 5000 });

  const totalText = await total.getText();
  console.log('Updated Cart Total:', totalText);
  expect(totalText).toContain('$57.00'); // adjust as needed
});

// To run the last feature alone type "npx wdio wdio.conf.js --spec features/3-UpdateQuantity.feature" in the terminal







