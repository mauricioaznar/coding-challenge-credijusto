# Documentation

## Installation and usage

### Development

1. run `npm install`
2. run `npm run start`

### Testing 

1. run `npm run test`

## Development explanation

### Assumptions

* no need to convert to different exchange currencies. EX. USD. MXN was the only one needed and it could be provided directly from the endpoints.
* The welcome form is an authentication process and users cant see the crypto information if they arent authenticated.
* routing was used, though I see no need to use routing in this application with its current requirements. Routes could be conditionally rendered depending if user was authenticated 

### Explanation

* Functionality
  * the project contains the requirements established on the `Frontend Take-Home Challenge.docx`
  * the development strategy that I chose was TDD, considering that the current job position is TDD focused.
* Code format
  * No linters have been used, though coding consistency was a priority.
* Project Structure
  * project has been divided on different abstractions (helper functions, components, testing, etc...)
* Scalability
  * CSS BEM methodology allows for smooth growth of the project regarding styles. Also, the project is heavily inspired by tailwind.css.
  * Crypto providers are contained inside `CryptoComparator.tsx`, so adding a new provider should require to modify this file and the mocking service (MSW).
  * DRY principle was priority. EX: `WelcomeFormInput.tsx`
* Maintainability
  * Typescript allows for faster development and maintainability because most errors are detected prior to compilation.
* Use of industry best practices
  * React testing library is considered the go-to technology in testing due to the lack of coupling with implementation details (Enzyme)
  * Typescript provides a better coding experience due to pre-compilation errors.
  * All components are functional components

### Improvements 

* persisting user locally or externally would improve user experience. the application would load directly to the crypto route if a user has already been created. 
* usage of a 3rd party library for form validation would improve user experience.
* we could add a sub route for each cryptocurrency. the user would be able to save the route as a bookmark. 


## Scenario answers 

1. Depending on 3rd party services problems:
   * Increases the probability of production errors.
   * Decreases the value in user experience. Filling out a form that is to be rejected at the end is a very painful user experience.
2. Providing feedback if 3rd party services are not working properly (json response has changed, network errors) and persisting the form so that the user can continue once the services are functioning properly.
3. Integration testing with 3rd party services. Separately from the application, tests should also inform the developers and related users that the 3rd party services are not working as expected.
4. 
   1. Each time a user fills an input the form gets persisted locally
   2. If the forms fails during the 3rd party services step, the user receives feedback about their form completion status and the services arent available. 
   3. Once the services are back online, users can continue where the left the form.
