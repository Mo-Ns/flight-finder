describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe("Search Form Tests", () => {
    it('fills out the search form and submits it', () => {
      cy.get('[data-cy="search-form__origin"]').should('be.visible').clear().type('MUC');

      cy.get('[data-cy="search-form__destination"]').should('be.visible').clear().type('CGN');

      cy.get('[data-cy="search-form__departureDate"]')
        .clear()
        .should('not.be.disabled')
        .type('13.12.2023');

      cy.get('[data-cy="search-form__returnDate"]')
        .clear()
        .should('be.visible')
        .should('not.be.disabled')
        .type('21.12.2023');

      cy.intercept('GET', '/src/assets/flights-mock.json', (req) => {
        req.reply({
          statusCode: 200,
          fixture: 'flights.json'
        })
      }).as('backendAPI');

      cy.get('[data-cy=search-form__search-button]').click().wait('@backendAPI');

      cy.get('[data-cy=flight-card]').should('be.visible');
    });
  });

  describe("Back to Top Button Tests", () => {
    beforeEach(() => {
      cy.intercept('GET', '/src/assets/flights-mock.json', (req) => {
        req.reply({
          statusCode: 200,
          fixture: 'flights.json'
        })
      }).as('backendAPI');
      cy.get('[data-cy=search-form__search-button]').click().wait('@backendAPI');
    });

    it("should be initially hidden", () => {
      cy.get('[data-cy="back-to-top"]').should("not.exist");
    });

    it("should become visible when scrolling down", () => {
      cy.scrollTo(0, 500);
      cy.wait(1200);
      cy.get('[data-cy="back-to-top"]').should("be.visible");
    });

    it("should scroll back to the top when clicked", () => {
      cy.scrollTo(0, 500);
      cy.get('[data-cy="back-to-top"]').click();
      cy.wait(1200); // Adjust the time as needed
      cy.window().its("scrollY").should("eq", 0);
    });

    it("should disappear after scrolling back to the top", () => {
      cy.scrollTo(0, 500);
      cy.wait(1000);
      cy.get('[data-cy="back-to-top"]').click();
      cy.wait(1200);
      cy.get('[data-cy="back-to-top"]').should("not.exist");
    });

    it("should not be visible after a quick scroll to the top", () => {
      cy.scrollTo(0, 100);
      cy.wait(1200); // A quicker scroll
      cy.get('[data-cy="back-to-top"]').should("not.exist");
    });
  });

  describe("Sorting Tab Tests", () => {
    beforeEach(() => {
      cy.intercept('GET', '/src/assets/flights-mock.json', (req) => {
        req.reply({
          statusCode: 200,
          fixture: 'flights.json'
        })
      }).as('backendAPI');
      cy.get('[data-cy=search-form__search-button]').click().wait('@backendAPI');
    });

    it("should have a sort tabs", () => {
      cy.get('[data-cy=sort-container]').should('exist');
      cy.get('[data-cy=sort-container] .tab__item').should('have.class', 'active');
      cy.get('[data-cy=sort-container] .tab__item.active').contains('Cheapest Price');
    });

    it("should click on the second item", () => {
      cy.get("[data-cy=sort-container] .tab__item").eq(1).click();
      cy.get('[data-cy=sort-container] .tab__item.active').contains('Shortest Duration');
    });

    it("should have only one and only active tab", () => {
      cy.get("[data-cy=sort-container] .tab__item").eq(1).click();
      cy.get('[data-cy=sort-container] .tab__item.active').contains('Shortest Duration');
      cy.get("[data-cy=sort-container] .tab__item.active").should("have.length", 1);
    });
  });
});
