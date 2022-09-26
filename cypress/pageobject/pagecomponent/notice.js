let notice = {
	getSuccessNotice(){
		return cy.get('#ajax-response .notice p').then( function(element){
			return element
		})
	},

	getErrorNotice(){
		return cy.get('#ajax-response .error p').then( function(element){
			return element
		})
	},

	getSuccessMessage(){
		return cy.get('#message.notice').then( function(element){
			return element
		})
	}
}

export default notice; 