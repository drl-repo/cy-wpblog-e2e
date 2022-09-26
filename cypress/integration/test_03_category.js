import SignInPage from '../pageobject/LoginPage'
import Category from '../pageobject/Category'
import DashboardPage from '../pageobject/DashboardPage'

describe('Testing all Category page', function(){
  let ref_id = null
  
  beforeEach(function(){
    Cypress.Cookies.defaults({
      preserve: [
      'wordpress_bbfa5b726c6b7a9cf3cda9370be3ee91',
      'wordpress_logged_in_bbfa5b726c6b7a9cf3cda9370be3ee91'
      ]
    })  
  })
  
  it('User should be able to delete multiple category' ,function(){
    
    const categoryPage = new Category()
    categoryPage.visit()

    categoryPage
      .getAll()
      .its('length')
      .then( function(c){
        if(c > 1){
          categoryPage
            .checkAll()
            .selectAction('Delete')
            .doAction()

          categoryPage
            .getMessage()
            .should('exist')
            .and('have.text','Categories deleted.')
        }
      })
  })
  
  it('User should not be able to create empty category' ,function(){
    
    const categoryPage = new Category(true)
    categoryPage.visit()

    categoryPage
      .submit()

    categoryPage
      .getErrorNotice()
      .should('exist')
      .and('have.text','A name is required for this term.')
  
  })

  it('User should be able to create new category with only name field' ,function(){
    
    const categoryPage = new Category(true)
    categoryPage.visit()

    categoryPage
      .fillName('Functional Testing')
      .submit()

    categoryPage
      .getSuccessNotice()
      .should('exist')
      .and('have.text','Category added.')
  
  })
  
  it('User should be able to create new category with name and slug' ,function(){
    
    const categoryPage = new Category(true)
    categoryPage.visit()

    categoryPage
      .fillName('Non-Functional Testing')
      .fillSlug('non-function')
      .submit()

    categoryPage
      .getSuccessNotice()
      .should('exist')
      .contains('Category added.')

  })
  
  it('User should be able to create new category with name, slug and description' ,function(){
    
    const categoryPage = new Category(true)
    categoryPage.visit()

    categoryPage
      .fillName('End To End Testing')
      .fillSlug('e2e')
      .fillDescription('Test your app via user interface')
      .submit()

    categoryPage
      .getSuccessNotice()
      .should('exist')
      .contains('Category added.')

  })
  

  it('User should be able to edit category', function(){
    const categoryPage = new Category(false)
    categoryPage.visit()
  
    categoryPage
      .showActions()
      .clickEdit()
    
    categoryPage.getEditId().then((el)=>{
      ref_id = el.val()
    })
    
    categoryPage
      .fillName('Performance Testing')
      .fillSlug('performance')
      .fillDescription('Determine how a system performs in terms of responsiveness and stability')
      .submit()
    
  })
  
  it('User should be able to delete category', function(){
    const categoryPage = new Category()
    categoryPage.visit()
    categoryPage
      .showActions(ref_id)
      .clickDelete()
  })

 })
  