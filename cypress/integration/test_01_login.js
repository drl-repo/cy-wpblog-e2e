import SignInPage from '../pageobject/LoginPage'
import Category from '../pageobject/Category'
import DashboardPage from '../pageobject/DashboardPage'

describe('Login to Admin Panel', () => {
  
  beforeEach(function(){
    Cypress.Cookies.defaults({
      preserve: [
      'wordpress_bbfa5b726c6b7a9cf3cda9370be3ee91',
      'wordpress_logged_in_bbfa5b726c6b7a9cf3cda9370be3ee91'
      ]
    })  
  })

  it('User should not be able to login without username and password' ,function(){

    const signIn = new SignInPage()
    signIn.visit()

    signIn
      .submit()

    signIn
      .getErrorNotice()
      .should('exist')
      .contains('The password field is empty')
  
  })  

  it('User should not be able to login without password' ,function(){

    const signIn = new SignInPage()
    signIn.visit()

    signIn
      .fillEmail('admin')
      .submit()

    signIn
      .getErrorNotice()
      .should('exist')
      .contains('The password field is empty')
  
  })

  it('User should not be able to login using invalid password' ,function(){

    const signIn = new SignInPage()
    signIn.visit();

    signIn
      .fillEmail('admin')
      .fillPassword('what???')
      .submit();

    signIn
      .getErrorNotice()
      .should('exist')
      .contains('The password you entered')
  
  })
  
  it('User should be able to login using valid username and password' ,function(){

    const signIn = new SignInPage()
    signIn.visit();

    signIn
      .fillEmail('admin')
      .fillPassword(Cypress.env('password'))
      .submit();

    const dashboard = new DashboardPage()
    dashboard
      .getHeading()
      .should('exist')
      .contains('Dashboard')
    
  })
 
 }) 
