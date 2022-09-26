
let bulkAction = {
	
	checkAll(){
		cy.get('#cb-select-all-1').click()

		return this
	},

	selectAction(action){
		cy.get('#bulk-action-selector-top').select(action)

		return this
	},

	doAction(){
		cy.get('#doaction').click()
	},

	getMessage(){
		return cy.get('#message > p').then( function(notice){
			return notice;
		})
	}

};

export default bulkAction;