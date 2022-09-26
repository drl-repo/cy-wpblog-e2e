import SignInPage from '../pageobject/LoginPage'
import Post from '../pageobject/Post'
import DashboardPage from '../pageobject/DashboardPage'

describe('Post all Post page', function(){
  let ref_id = null
  
  beforeEach(function(){
    Cypress.Cookies.defaults({
      preserve: [
      'wordpress_bbfa5b726c6b7a9cf3cda9370be3ee91',
      'wordpress_logged_in_bbfa5b726c6b7a9cf3cda9370be3ee91'
      ]
    })  
  })
  
  it('User should be able to move multiple post to trash' ,function(){
    const postPage = new Post()
    postPage.visit()

    postPage
      .getAll()
      .eq(0)
      .invoke('attr','class')
      .then( function(className){
        if(className!='no-items'){
          postPage
            .checkAll()
            .selectAction('Move to Trash')
            .doAction()

          postPage
            .getSuccessMessage()
            .should('exist')
            .contains('moved to the Trash')
        }
      })

  })
  

  it('User should be able to add new post' ,function(){

    const postPage = new Post(true)
    postPage.visit('add');

    const postContent = 'Cypress is a next generation front end testing tool built for modern web. '
                       +'we address the key pain points developers and QA engineers face when testing '
                       +'modern applications, we make possible Set up tests, Write tests, Run tests, '
                       +'Debug tests, cypress is most often compared to Selenium; however cypress is both '
                       +'fundamentally and architecturally different. cypress is not constrained by the same '
                       +'restrictions as Selenium this enable you to write faster, easier, and more '
                       +'reliable test';

    postPage
      .fillTitle('Cypress, automate your web app test')
      .fillBody(postContent)
      .chooseCategories(['Uncategorized'])
      .chooseTags(['Selenium'])
      .submit()

    postPage
      .getSuccessMessage()
      .should('be.visible')
      .contains('Post published.')

  })
  
  
  it('User should be able to edit post' ,function(){
    const postPage = new Post(false)
    postPage.visit()
  
    postPage
      .showPostActions()
      .clickEdit()
    
    postPage.getEditId().then((el)=>{
      ref_id = el.val()
    })

    const newContent = 'This content is edited by cypress, Cypress is a next generation' 
                       +'front end testing tool built for modern web. '
                       +'we address the key pain points developers and QA engineers face when testing '
                       +'modern applications, we make possible Set up tests, Write tests, Run tests, '
                       +'Debug tests, cypress is most often compared to Selenium'

    postPage
      .fillTitle('New title come from Cypress')
      .fillBody(newContent)
      .chooseCategories(['Functional Testing'])
      .submit()
    
    postPage
      .getSuccessMessage()
      .should('be.visible')
      .contains('Post updated.')
    
  })
  
  it('User should be able to move post to trash' ,function(){
    const postPage = new Post()
    postPage.visit()
  
    postPage
      .showPostActions()
      .moveToTrash(ref_id)

     postPage
      .getSuccessMessage()
      .should('be.visible')
      .contains('1 post moved to the Trash')

  })
  
})