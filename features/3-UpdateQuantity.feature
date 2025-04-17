Feature: Update product quantity in the cart

  Scenario: User increases and decreases product quantity before adding to cart and verifies updated total
    Given I am on Magento homepage
    When I search for jacket
    When I open the first product in the search results
    When I select the size and color options
    When I set the quantity to 2
    When I add the product to the cart
    When I open the cart
    Then the cart total should be 2 times the product price
    When I update the quantity to 1 from the cart
    Then the cart total should be 1 times the product price