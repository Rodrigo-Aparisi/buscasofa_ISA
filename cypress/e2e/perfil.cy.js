/// <reference types="cypress" />
// Pruebas de la página de perfil de usuario (/perfil)

describe('Página de perfil de usuario', () => {

    // Datos de un usuario de prueba con sesión ya iniciada
    const sesion = {
        token: 'token-de-prueba-123',
        user: { username: 'rodrigo', email: 'rodrigo@mail.com' },
    };

    it('redirige a /login si no hay sesión', () => {
        cy.visit('/perfil');                       // visitamos el perfil sin token
        cy.url().should('include', '/login');      // el guard debe rebotarnos al login
    });

    it('muestra el usuario y el email cuando hay sesión', () => {
        // Sembramos la sesión en localStorage ANTES de que cargue la app,
        // así el guard encuentra el token y el componente pinta los datos.
        cy.visit('/perfil', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', sesion.token);
                win.localStorage.setItem('user', JSON.stringify(sesion.user));
            },
        });

        cy.url().should('include', '/perfil');                                  // no nos ha echado el guard
        cy.get('[data-cy=perfil-username]').should('contain', sesion.user.username);
        cy.get('[data-cy=perfil-email]').should('contain', sesion.user.email);
    });

});
