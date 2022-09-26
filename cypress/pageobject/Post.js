import notice from './pagecomponent/notice'
import bulkAction from './pagecomponent/bulkAction'
import actionLink from './pagecomponent/actionLink'

class Post{

	pageUrl = {
		index: 'wp-admin/edit.php',
		add: 'wp-admin/post-new.php'
	}

	constructor(isNew){
		this.isNew = isNew
		this.hasTag = false
	}

	visit(page=null){
		switch(page){
			case 'add':
				cy.visit(Cypress.env('host')+this.pageUrl['add'])
				break
			default:
				cy.visit(Cypress.env('host')+this.pageUrl['index'])
		}
	}

	getAll(){
		return cy.get('#the-list tr').then( function(element){
			return element
		})
	}

	fillTitle(title){
		cy.get('#title').clear().type(title)

		return this
	}
	
	fillBody(content){
		cy.get('#content_ifr')
	    	.its('0.contentDocument.body')
	    	.should('be.visible')
	    	.then((iframBody) => {
	    		cy.wrap(iframBody)
	    		  .clear()
	    		  .type(content)
	   		 })

		return this
	}

	chooseCategories(categories=[]){
		
		if(categories.length){
			cy.get('#categorychecklist li').each((element, index)=>{
				cy.wrap(element).invoke('text').then((category)=>{
					if(categories.includes(category.trim())){
						cy.get('#categorychecklist li input').eq(index).check()
					}else{
						if(!this.isNew){
							cy.get('#categorychecklist li input').eq(index).then((input)=>{
								//do uncheck is this previously checked
								if(input.is(':checked')){
									cy.wrap(input).uncheck()
								}
							})
						}
					}
				})
			})
		}
		return this
	}

	chooseTags(tagKeywords=[]){
		this.typeAndChooseTag(tagKeywords,0)
		return this
	}

	typeAndChooseTag(tagKeywords,index){
		//check if tag is not empty
		if(tagKeywords.length){
			if(index < tagKeywords.length){
				//current tag
				let tag = tagKeywords[index]
				//the autocomplete is triggered if more than 1 character typed
				if(tag.length > 1){
					//type to trigger autocomplete dropdown
					cy.get('#new-tag-post_tag').type(tag)
					cy.get('.ui-autocomplete-loading').should('be.visible')
					//increase timeout to prevent unfinished request
					cy.get('.ui-autocomplete-loading',{timeout:10000}).should('not.exist')
					//finished
					cy.get('.wp-tags-autocomplete').then((element)=>{
						//do get list of autocomplete result
						const tags = element.find('li')
						//if the list of result is not empty (not zero)
						if(tags.length){
							//loop through list
							cy.wrap(tags).each((val,ind)=>{
								//is current item match with tag you going to choose
								if(tagKeywords.includes(val.text().trim())){
									//then choose
									this.hasTag = true
									val.click()
								}
							})
						}
					})
				}
				cy.wrap(null).then(()=>{
					//inrease, we go to the next tag
					index++
					//iterate all tag
					this.typeAndChooseTag(tagKeywords,index)
				})
			}else{
				//prevent immediately execute
				cy.wrap(null).then(()=>{
					if(this.hasTag){
						cy.get('#tagsdiv-post_tag input[type=button]').click()
					}
				})
			}
		}
	}


	submit(){
		cy.get('#publish').click()
	}

	getEditId(){
		return cy.get('input[name="post_ID"]').then( (element) => {
			return element
		})
	}
	
}

Object.assign(Post.prototype, notice)
Object.assign(Post.prototype, bulkAction)
Object.assign(Post.prototype, actionLink)
export default Post