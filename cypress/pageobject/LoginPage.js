class SignInPage {
  visit() {
    cy.visit(Cypress.env('host')+'wp-login.php');
  }

  getErrorNotice() {
    return cy.get('#login_error').then((element)=>{
        return element
    })
  }


  fillEmail(value) {
    cy.get('#user_login').focus().clear().type(value)
    
    return this;
  }

  fillPassword(value) {
    cy.get('#user_pass').focus().clear().type(value)
    
    return this;
  }
  
  submit() {
    cy.get('#wp-submit').click()
  }
}

export default SignInPage