/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { message: 'Welcome to calendar-events APIs.' }
})

// Auth
  Route.post('login', 'UsersController.login')
  Route.post('signup', 'UsersController.signUp')
  
  Route.get('google/callback', 'GoogleAccountsController.callback')
Route.group(() => {
  // Google
  Route.get('google/auth-url', 'GoogleAccountsController.createURL')
  Route.get('google/events', 'GoogleAccountsController.getEvents')
}).middleware(['auth']);
