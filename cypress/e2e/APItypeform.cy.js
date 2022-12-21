describe('API - Typeform', () => {

  const API_URL = 'https://api.typeform.com'
  const AUTHORIZATION = ''   // insira seu token dentro de ''

  it('[GET] - Consulta dos dados do perfil', () => {
    cy.api({
      method: 'GET',
      url: `${API_URL}/me`,
      headers: {
        authorization: `Bearer ${AUTHORIZATION}`
      }
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.alias).to.eq('Marco Antonio')
      expect(response.body.email).to.eq('marco.antoniosilva@nttdata.com')
      expect(response.body.language).to.eq('en')
    })
  })

  it('[GET] - Consulta dos dados do perfil (SEM TOKEN)', () => {
    cy.api({
      method: 'GET',
      url: `${API_URL}/me`,
      failOnStatusCode: false
    }).should((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('[POST] - Criando um novo form', () => {
    cy.api({
      method: 'POST',
      url: `${API_URL}/forms`,
      headers: {
        authorization: `Bearer ${AUTHORIZATION}`
      },
      body: {
        title: 'NTTDATA - Treinamento de Testes Automatizados de API com Cypress'
      }
    }).should((response) => {
      expect(response.status).to.eq(201)
      Cypress.env('id_form', response.body.id)
    })
  })

  it('[PATCH] - Substituindo um título do form', () => {
    cy.api({
      method: 'PATCH',
      url: `${API_URL}/forms/` + Cypress.env('id_form'),
      headers: {
        authorization: `Bearer ${AUTHORIZATION}`
      },
      body: [
        {
          "op": "replace",
          "path": "/title",
          "value": "Novo título trocado pelo Cypress"
        }
      ]
    }).should((response) => {
      expect(response.status).to.eq(204)
    })
  })

  it('[GET] - Busca por um form específico', () => {
    cy.api({
      method: 'GET',
      url: `${API_URL}/forms/` + Cypress.env('id_form'),
      headers: {
        authorization: `Bearer ${AUTHORIZATION}`
      },
    }).should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('[DELETE] - Deletando um form que foi criado', () => {
    cy.api({
      method: 'DELETE',
      url: `${API_URL}/forms/` + Cypress.env('id_form'),
      headers: {
        authorization: `Bearer ${AUTHORIZATION}`
      },
    }).should((response) => {
      expect(response.status).to.eq(204)
    })
  })

})