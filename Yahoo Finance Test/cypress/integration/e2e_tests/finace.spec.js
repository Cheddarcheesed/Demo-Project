describe('Vist Main Page', () => {
    it('Should Visit URL', () => {
        cy.visit("https://ca.finance.yahoo.com/")
    });
    it('Check that URL is correct', () => {
        cy.url().should('include', "finance")
    });
    it('Sign into test user account', () => {
        cy.get('#uh-signedin').click()
        cy.pause()

    });

})
