describe('Cars page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8000/api/tags', {
      body: ['white car', 'white', 'car', 'orange car', 'yellow', 'vehicle', 'sport', 'red car', 'red'],
    }).as('getAllTags');
    cy.intercept('GET', 'http://localhost:8000/api/tags?tag=red', {
      body: ['red car'],
    }).as('getTag');
  });

  it('should show a search bar with all the tags in dropdown', () => {
    cy.visit('http://localhost:5173');

    cy.wait('@getAllTags');
    cy.get('[data-testid=show-all-tags]').click();

    cy.get('[data-testid=cars-select] li').should('have.length', 9).last().should('have.text', 'Red');
    cy.get('[data-testid=red]').click();
    cy.get('h1').should('have.text', 'Red');
  });

  it('should allow the user to select a tag ', () => {
    cy.visit('http://localhost:5173');

    cy.wait('@getAllTags');
    cy.get('[data-testid=show-all-tags]').click();
    cy.get('[data-testid=red]').click();
    cy.get('h1').should('have.text', 'Red');
    cy.get('img').invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
  });
});
