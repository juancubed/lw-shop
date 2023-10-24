# LW Shop

![App Logo](app-logo.png)

## Description

Mock of a Mobile App of a Store that shows any type of products and allows the user to choose among product variations to add to a cart, and then confirm a purchase. 
The list of products is obtained by making a request to a public Store API (https://api.escuelajs.co/api/v1/) 
The products are modified upon response to comply with the requirement of the variations. 

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
-  
## Screenshots

Include some screenshots or gifs of your app to give users a visual representation of the project.
Product List
![image](https://github.com/juancubed/lw-shop/assets/88357714/dca5eaa6-9a2e-406e-8b04-2be9d3f18f2a)
Product Detail
![image](https://github.com/juancubed/lw-shop/assets/88357714/9f7f384b-858a-4c5e-ab8e-558031c54fd8)
Add to Cart Confirmation
![image](https://github.com/juancubed/lw-shop/assets/88357714/be4aeb52-e106-4e01-9349-f72d5d38fcbc)
Shopping Cart 
![image](https://github.com/juancubed/lw-shop/assets/88357714/a9c5fca5-4251-4b2d-a71c-06da83ab94d7)
Checkout 
![image](https://github.com/juancubed/lw-shop/assets/88357714/fcff0d66-5db2-4dc3-9a83-e726baf9de4b)
Order Confirmation
![image](https://github.com/juancubed/lw-shop/assets/88357714/c8be2c09-db0f-4723-92d8-e94859754135)


## Features

List the key features and functionalities of your app.

- Product List, selection between product variations. 
- Add to Cart (only one product variation per product)
- Confirmation (Empty Cart)

## Technologies

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- Nativebase UI Library
- React Native Router
- SWR, Axios
- 
## Getting Started

To run this project you need to download Expo installed your laptop, follow https://docs.expo.dev/get-started/installation/
- You also need a device (simulator or real device) Web version is not responsive enough and doesn't work as seamlessly.
- Clone this repository, cd into it and install all dependencies npm i

### Prerequisites

Expo,
If you are going to use a Real device, you need to download the App Expo Go from any of the Stores

### Installation

```bash
# Clone the repository
git clone https://github.com/juancubed/lw-shop/

# Navigate to the project directory
cd lw-shop/

# Install dependencies
npm install

# Start the development server
npm start
