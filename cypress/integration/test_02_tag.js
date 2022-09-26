import SignInPage from '../pageobject/LoginPage'
import Tag from '../pageobject/Tag'
import DashboardPage from '../pageobject/DashboardPage'

describe('Testing all Tag pages', function(){
  let ref_id = null
  
  beforeEach(function(){
    Cypress.Cookies.defaults({
      preserve: [
      'wordpress_bbfa5b726c6b7a9cf3cda9370be3ee91',
      'wordpress_logged_in_bbfa5b726c6b7a9cf3cda9370be3ee91'
      ]
    })
    
  })
    
  it('User should be able to delete multiple Tag' ,function(){
    
    const tagPage = new Tag()
    tagPage.visit()

    tagPage
      .getAll()
       .eq(0)
      .invoke('attr','class')
      .then( function(className){
        if(className!='no-items'){
          tagPage
            .checkAll()
            .selectAction('Delete')
            .doAction()

          tagPage
            .getMessage()
            .should('exist')
            .and('have.text','Tags deleted.')
        }
      })
  })
  
  it('User should not be able to create empty Tag' ,function(){
    
    const tagPage = new Tag(true)
    tagPage.visit()

    tagPage
      .submit()

    tagPage
      .getErrorNotice()
      .should('exist')
      .and('have.text','A name is required for this term.')
  
  })

  it('User should be able to create new Tag with only name field' ,function(){
    
    const tagPage = new Tag(true)
    tagPage.visit()

    tagPage
      .fillName('Automation')
      .submit()

    tagPage
      .getSuccessNotice()
      .should('exist')
      .and('have.text','Tag added.')
  
  })
  
  it('User Should be able to create new Tag with name and slug' ,function(){
    
    const tagPage = new Tag(true)
    tagPage.visit()

    tagPage
      .fillName('Cypress')
      .fillSlug('cypressjs')
      .submit()

    tagPage
      .getSuccessNotice()
      .should('exist')
      .contains('Tag added.')

  })
  
  it('User should be able to create new Tag with name, slug and description' ,function(){
    
    const tagPage = new Tag(true)
    tagPage.visit()

    tagPage
      .fillName('Appium')
      .fillSlug('appium')
      .fillDescription('Automate your mobile app testing')
      .submit()

    tagPage
      .getSuccessNotice()
      .should('exist')
      .contains('Tag added.')

  })
  

  it('User should be able to edit Tag', function(){
    const tagPage = new Tag(false)
    tagPage.visit()
  
    tagPage
      .showActions()
      .clickEdit()
    
    tagPage.getEditId().then((el)=>{
      ref_id = el.val()
    })
    
    tagPage
      .fillName('Selenium')
      .fillSlug('selenium')
      .fillDescription('Selenium automate your browser')
      .submit()
    
  })
  
  it('User should be able to delete Tag', function(){
    const tagPage = new Tag()
    tagPage.visit()
    tagPage
      .showActions(ref_id)
      .clickDelete()
  })
  

 })
  