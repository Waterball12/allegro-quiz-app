Feature: Manage game in the system
    
    Scenario: Games get created successfully
        When I create game with the following details
            | Id    | Quiz    | Started    | CurrentQuestion    | Users    | Status     | OwnerId    |
            | 1     | {}      | 13/04/2021 | 1                  | []       | "Idle"     | 31411      |
        Then the games are created successfully
        
    Scenario: Games get deleted successfully
        Given the following game in the system 
          | Id | Quiz | Started    | CurrentQuestion | Users | Status | OwnerId |
          | 1  | {}   | 13/04/2021 | 1               | []    | "Idle" | 31411   |
        When those games get deleted
        Then the games are deleted successfully
        