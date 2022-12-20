describe('API - Typeform', () => {
  
  it('[GET] - Consulta dos dados do perfil', () => {
    cy.api({
      method: 'GET',
      url: 'https://api.typeform.com/me',
      headers: {
        authorization: 'Bearer tfp_7aPCzKcFWpG9MoqzZBi7xwwgGGwYkLRKU23SPxbrps3m_3pcooCXx3Pja8A'
      }

    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.alias).to.eq('Marco Antonio')
      expect(response.body.email).to.eq('marco.antoniosilva@nttdata.com')
      expect(response.body.language).to.eq('en')
      expect(response.body.user_id).to.eq('01GJE15B7YPR923VQTGRK53A95')
      expect(response.body.tracking_id).to.eq(22411884)
    })
  })

})