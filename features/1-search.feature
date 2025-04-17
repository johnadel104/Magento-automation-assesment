Feature: Search funcionality on Magneto website

  Scenario: As a user, I can search for a product from homepage

    Given I am on Magento homepage
    When I search for jacket
    Then I should see results related to jacket

    

