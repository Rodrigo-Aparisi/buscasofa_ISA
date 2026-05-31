/// <reference types="cypress" />
// Pruebas de la página de perfil de usuario (/perfil)

describe('Página de perfil de usuario', () => {

    it('redirige a /login si no hay sesión', () => {
        cy.visit('/perfil');                       // visitamos el perfil sin token
        cy.url().should('include', '/login');      // el guard debe rebotarnos al login
    });

});
