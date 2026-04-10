import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  
  await page.getByTestId('order-id').fill('VLO-MVRT5P')
  //await page.getByTestId('search-order-button').click()
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 15_000})
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-MVRT5P')

  await expect(page.getByText('VLO-MVRT5P')).toBeVisible({timeout: 15_000})
  await expect(page.getByTestId('order-result-VLO-MVRT5P')).toContainText('VLO-MVRT5P')

  //Assert 
  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-MVRT5P')).toContainText('APROVADO')

});