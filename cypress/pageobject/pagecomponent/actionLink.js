
let actionsLink = {
	
	cssRow : '#the-list > tr:first-child',
	rowId : null,
	
	showActions(rowId=null){ 
		if(rowId){
			this.cssRow = '#tag-'+rowId
			this.rowId = rowId
		}
		cy.get(this.cssRow).realHover()
		
		return this
	},

	showPostActions(rowId=null){ 
		if(rowId){
			this.cssRow = '#post-'+rowId
			this.rowId = rowId
		}
		cy.get(this.cssRow).realHover()
		
		return this
	},
		
	clickEdit(){
		cy.get(this.cssRow)
			.find('.edit > a')
			.should('be.visible').click()
		
		return this
	},

	clickDelete(){
		cy.get(this.cssRow)
			.find('.delete > a')
			.should('be.visible').click()
		
		return this
	},

	moveToTrash(){
		cy.get(this.cssRow)
			.find('.trash > a')
			.should('be.visible').click()
		
		return this
	},


}	


export default actionsLink