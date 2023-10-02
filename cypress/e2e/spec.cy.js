describe('Uploading Page', () => {

  beforeEach(() => {
    cy.login("ggamerspal@gmail.com", "mockuser12")
  })

  it('uploads an image successfully', () => {

    const fileName = 'example.jpg';

    cy.fixture(fileName, 'base64').then(fileContent => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
      const file = new File([blob], fileName);
    
      cy.get('.file-input').then($input => {
        const event = new MouseEvent('change', {
          bubbles: true,
          cancelable: true,
        });
    
        Object.defineProperty($input[0], 'files', {
          value: [file],
        });
    
        $input[0].dispatchEvent(event);
      });
    
    });

    //Request
    cy.intercept('POST', 'http://127.0.0.1:5001/picfolks/us-central1/setImage').as('uploadImage');

    // Click the "Upload" button
    cy.get('.upload-btn').click();

    cy.wait('@uploadImage').then(xhr => {
 
      expect(xhr.response.statusCode).to.equal(200);
  
      expect(xhr.response.body).to.equal('The picture was uploaded successfully');
    });

    cy.get('.q-notification').should('be.visible')
    cy.contains('The picture was uploaded successfully').should('be.visible')

  });

   it('displays an error message when no image is selected', () => {
  
    cy.get('.upload-btn').click();

    cy.get('.q-notification').should('be.visible')
    cy.contains('Please select a file to upload').should('be.visible')
  
  });
   
});
