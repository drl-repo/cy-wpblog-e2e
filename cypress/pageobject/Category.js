import notice from './pagecomponent/notice'
import bulkAction from './pagecomponent/bulkAction'
import actionLink from './pagecomponent/actionLink'

class Category{

	constructor(isNew){
		this.isNew = isNew
	}

	visit(){
		cy.visit(Cypress.env('host')+'wp-admin/edit-tags.php?taxonomy=category')
	}

	getAll(){
		return cy.get('#the-list tr').then( function(element){
			return element
		})
	}

	fillName(name){
		const cssName = this.isNew ? '#tag-name' : '#name'
		cy.get(cssName).clear().type(name)

		return this
	}
	
	fillSlug(slug){
		const cssSlug = this.isNew ? '#tag-slug' : '#slug'
		cy.get(cssSlug).clear().type(slug)

		return this
	}

	fillDescription(description){
		const cssDesc = this.isNew ? '#tag-description' : '#description'
		cy.get(cssDesc).clear().type(description)

		return this
	}
	
	submit(){
		const cssSave = this.isNew ? '#submit' : '#edittag input[type=submit]'
		cy.get(cssSave).click()
	}

	getEditId(){
		return cy.get('input[name="tag_ID"]').then( (element) => {
			return element
		})
	}
	
}

Object.assign(Category.prototype, notice)
Object.assign(Category.prototype, bulkAction)
Object.assign(Category.prototype, actionLink)
export default Category