# Pro Rata Web

## What is this?

This project is a simple React web application that makes it easy to use the API in calculation of the pro rated
investor allocation. The web application accepts information around size of the full allocation, investor name, average
invested amount and requested amount. Results are returned and displayed in browser for reference.

## Assumptions and requirements

Please ensure you have the latest `node.js` installed and configured correctly.

## Outstanding concerns

* There is little to no validation on the type of input. This opens the potential for various types of exploits. This
  has been left out given the nature of this project. If you intend to run this in a production environment, please
  ensure validation is implemented correctly.

* Validation messages are also lacking making it a little tricky in the event incorrect information is provided such as
  strings when numbers are required.

* The UI does not allow for the use of decimal places in the data entered.

* Tests should be implemented.

## Running the Web Application

The application implemented using React and thus can be run in a similar fashion.

To run the app simply start it as follows:

```bash
yarn install
yarn start
```

The application should now be running. The standard port is `3000`

## Docker support

Not currently implemented. 