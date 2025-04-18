Magento Automation Assessment

Features Covered

1. Search Functionality

Searches for "jacket" from the homepage.

Validates that search results contain the correct keyword.



2. Add to Cart

Opens the first product from the search results.

Selects size and color.

Adds the product to the cart.

Validates product presence in the cart.



3. Update Quantity in Cart

Changes the quantity before adding to cart.

Validates updated cart total.

Decreases quantity and verifies total again.





---

Setup Instructions
Resource for setup instruction [youtube] https://www.youtube.com/watch?v=HpoCx2a9l5w&list=PLhW3qG5bs-L9K2xtu-04jZFqykzXzqJW8&index=7

1. Clone the Repository



git clone https://github.com/johnadel104/Magento-automation-assesment
cd Magento-automation

2. Install Dependencies



npm install

3. Run WDIO Configuration (optional) To modify or review browser settings:



npx wdio config


---

How to Run Tests

Run All Features ---->    npx wdio wdio.conf.js

Run Specific Feature

Search feature -------> npx wdio wdio.conf.js --spec features/1-search.feature
Add to cart feature ------> npx wdio wdio.conf.js --spec features/2-Addtocart.feature
update quantity feature ----->  npx wdio wdio.conf.js --spec features/3-UpdateQuantity.feature


---

Use Cases

The selected use cases represent:

Core user flows such as product search, cart operations, and quantity update.

Verification of UI interaction and content correctness.

Strategic testing of key e-commerce components.



---

Project Structure

Magento-cucumber/
├── features/
step-definitions/
        └── README.md
│       └── steps.js
│   ├── 1-search.feature
│   ├── 2-Addtocart.feature
│   ├── 3-UpdateQuantity.feature
├── package.json
├── wdio.conf.js

Created by : John Adel
