Feature: Add product to cart from product details page

  Scenario: User can select size and color and add product to the cart
    Given I am on Magento homepage
    When I search for jacket
    When I open the first product in the search results
    When I select the size and color options
    When I add the product to the cart
    Then I should see the product in the cart