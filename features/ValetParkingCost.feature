Feature: Calculate Valet Parking Cost

Scenario: Calculate Valet Parking Cost for 1 hour
    Given I enter start date time 1pm and endtime 2pm
    When I press Calculate
    Then I see cost $12