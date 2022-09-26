let heading = {
	getHeading(){
		return cy.get('.wrap > h1').then((element) => {
			return element
		})
	}
}

export default heading