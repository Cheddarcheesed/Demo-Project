import { isTaggedTemplateExpression } from 'typescript'
import { ROUTES } from '../constants'

describe('Auth', () => {
  describe('Login and logout', () => {
    it.only('should login success when submit a valid login form', () => {
      cy.login()

      cy.url().should('match', /\/#\/$/)
    })

    it('should logout when click logout button', () => {
      cy.get(`[href="${ROUTES.SETTINGS}"]`).click()

      cy.get('button.btn-outline-danger')
        .contains('logout')
        .click()

      cy.get('ul.navbar-nav')
        .should('contain', 'Sign in')
        .should('contain', 'Sign up')
    })

    it.only('should display error when submit an invalid form (password not match)', () => {
      cy.intercept('POST', /users\/login/, {
        statusCode: 422,
        body: { errors: { 'email or password': ['is invalid '] } },
      })
      cy.visit(ROUTES.LOGIN)

      cy.get('[type="email"]').type('foo@example.com')
      cy.get('[type="password"]').type('12345678')
      cy.get('[type="submit"]').click()

      cy.contains('email or password is invalid')
    })

    it('should display format error without API call when submit an invalid format', () => {
      cy.intercept('POST', /users\/login/).as('loginRequest')
      cy.visit(ROUTES.LOGIN)

      cy.get('[type="email"]').type('foo')
      cy.get('[type="password"]').type('123456')
      cy.get('[type="submit"]').click()
      //cy.pause()
      cy.get('form').then(([$el]) => {
        cy.wrap($el.checkValidity()).should('to.be', false)
      })
    })
  })

  describe('Register', () => {
    it('should call register API and jump to home page when submit a valid form', () => {
      cy.intercept('POST', /users$/, { fixture: 'user.json' }).as('registerRequest')
      cy.visit(ROUTES.REGISTER)

      cy.get('[placeholder="Your Name"]').type('foo')
      cy.get('[placeholder="Email"]').type('foo@example.com')
      cy.get('[placeholder="Password"]').type('12345678')

      cy.get('[type="submit"]').click()

      cy.wait('@registerRequest')
      cy.url().should('match', /\/#\/$/)
    })

    it('should display error message when submit the form that username already exist', () => {
      cy.intercept('POST', /users$/, {
        statusCode: 422,
        body: { errors: { email: ['has already been taken'], username: ['has already been taken'] } },
      }).as('registerRequest')

      cy.visit(ROUTES.REGISTER)

      cy.get('[placeholder="Your Name"]').type('foo')
      cy.get('[placeholder="Email"]').type('foo@example.com')
      cy.get('[placeholder="Password"]').type('12345678')

      cy.get('[type="submit"]').click()

      cy.wait('@registerRequest')
      cy.contains('email has already been taken')
      cy.contains('username has already been taken')
    })
  })
  describe('Test Home page Headers', () => {
    it('Should go to the home page', () => {
      cy.get(':nth-child(1) > .nav-link').click()
    });
    it('Should check that each the first header link works', () => {
      cy.get(':nth-child(2) > .preview-link > h1').click()
      cy.get('h1').should('contain', 'Create a new')
      cy.get(':nth-child(1) > .nav-link').click()

    });
    it('Should Check second link', () => {
      cy.get(':nth-child(3) > .preview-link > h1').click()
      cy.get('h1').should('contain', 'Explore implementations')
      cy.get(':nth-child(1) > .nav-link').click()
      //cy.pause()
    });
  });
  describe('Test popular Tags', () => {
    it('Check that first Tag Link works', () => {
      cy.get('[href="#/tag/welcome"]').click()
      cy.url().should('contain', 'tag/welcome')


    });

  });
})
