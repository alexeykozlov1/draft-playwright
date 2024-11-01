import {Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase{

    // readonly page: Page

    // constructor(page: Page) {  // ': Page' - is the TypeScript way to specify a type of an argument
    //     this.page = page // call constructor of the super-class
    // }

    constructor(page: Page) {  // ': Page' - is the TypeScript way to specify a type of an argument
        super(page) // call constructor of the super-class
    }

    /**
     * This method fills out the grid form with user credentials and option
     * @param email 
     * @param password 
     * @param optionText 
     */
    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string){
        const usingTheGridForm= this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)        
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
        await this.waitForSeconds(2)
    }

    /**
     * This method fill out the inline form with user details
     * @param name - should be the frist and last name
     * @param email - value email for test user
     * @param rememberMe - remember the user session or now
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineForm= this.page.locator('nb-card', {hasText: 'Inline Form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)   
        if (rememberMe == true) {
            await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByRole('button').click()
    }
}