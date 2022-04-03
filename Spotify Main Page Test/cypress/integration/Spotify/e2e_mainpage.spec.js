
describe('Spotify Main Page', () => {
    beforeEach(() => {
        cy.visit('https://www.spotify.com/us/')

    })
    it.skip('Test Free Sign up button and account creation', () => {
        cy.get('.ButtonInner-peijbp-0').click()
        cy.get('.cpKWA').should('have.text', 'Sign up with your email address')
        cy.get('#email').type('Fake@gmail.com')
        cy.get('#confirm').type('Fake1@gmail.com')  // Wrong Confirmation Email
        cy.get('.cpKWA').click()
        cy.get(':nth-child(3) > .FormHelpText__Help-sc-7bszd7-1').should('be.visible')// Wrong Email Error
        cy.get('#confirm').type('{selectall}').clear().type('Fake@gmail.com')
        cy.get('#password').type('password1')
        cy.get('#displayname').type('FakeDisplayName')
        cy.get('#month').select('January')
        cy.get('#day').type('01')
        cy.get('#year').type('2000')
        cy.get(':nth-child(1) > .Label-sc-17gd8mo-0 > .Type__TypeElement-goli3j-0').click() // Select Male

    });

    it.skip('Check header list ', () => {
        cy.get('.mh-desktop > .svelte-4ldyho li').should('have.length', 6)
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(0).should('have.text', 'Premium')
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(1).should('have.text', 'Support')
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(2).should('have.text', 'Download')
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(4).should('have.text', 'Sign up')
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(5).should('have.text', 'Log in')
    });

    it('Check Premium Page', () => {
        cy.get('.mh-desktop > .svelte-4ldyho li').eq(0).click()
        cy.get('.sc-lbVvki > :nth-child(1) > .Button-qlcn5g-0 > .ButtonInner-sc-14ud5tc-0 > span').should('have.text', 'TRY 1 MONTH FREE')
        cy.get(':nth-child(2) > .Button-qlcn5g-0 > .ButtonInner-sc-14ud5tc-0 > span').should('have.text', 'view plans')
        cy.get('#STOREFRONT-PLAN').should('be.visible')
        cy.get('#STOREFRONT-PLAN-2').should('be.visible')
        cy.get('#STOREFRONT-PLAN-3').should('be.visible')
        cy.get('#STOREFRONT-PLAN-4').should('be.visible')
        cy.get('#STOREFRONT-PLAN-5').should('be.visible')
        cy.get('#STOREFRONT-PLAN-6').should('be.visible')
        cy.get('#STOREFRONT-PLAN-7').should('be.visible')
        cy.get('#STOREFRONT-PLAN-8').should('be.visible')

    });

})
