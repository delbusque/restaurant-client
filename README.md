# Restaurant Management System

## Overview

This is a web-based Restaurant Management System built with React. The application allows restaurant staff to manage tables, take orders, process payments, and manage menu items.

## Features

- **Table Management**: View available and occupied tables.
- **Order Management**: Add, edit, and remove food and drink orders for each table.
- **Menu Management**: Add, edit, and remove menu items.
- **User Authentication**: Different user roles (e.g., waiter, chef, admin, visitor).
- **Payment Processing**: Calculate and process payments.
- **Kitchen View**: A dedicated view for chefs to see pending orders.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB
- **State Management**: Context API
- **Styling**: CSS
- **Routing**: React Router

## Installation

### Prerequisites

- Node.js and npm installed

### Steps to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/delbusque/restaurant-client.git
   cd restaurant-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open the application in the browser:
   ```
   http://localhost:3000
   ```

## Project Structure

```
restaurant-client/
│── src/
│   │── components/        # Reusable UI components
│   │── pages/             # Page components
│   │── context/           # Context API state management
│   │── hooks/             # Custom React hooks
│   │── services/          # API calls and services
│   │── App.js             # Main application file
│── public/                # Static assets
│── package.json           # Dependencies and scripts
│── README.md              # Project documentation
```

## User Roles

- **Admin**: Full access to the system.
- **Waiter**: Can manage orders and tables. Also view items in stock and chef lists.
- **Chef**: Can view and prepare orders. Can view table orders.
- **Visitor**: Can view menu.

## Deployment

This application is deployed on Render. You can access it here: [Live Demo](https://ourestaurant.onrender.com)

## License

This project is licensed under the MIT License.

## Contributors

- [delbusque](https://github.com/delbusque)
- [Ventsislav Peychev](https://www.linkedin.com/in/ventsislav-peychev/)

## Contact

For any inquiries, please contact: [del.busque@gmail.com](mailto\:del.busque@gmail.com)


