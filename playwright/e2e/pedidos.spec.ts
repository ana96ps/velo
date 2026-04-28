import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers'

// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)


test.describe('Consulta de Pedido', () => {


  test.beforeEach(async ({ page }) => {
    //Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })



  test('Deve consultar um pedido aprovado', async ({ page }) => {

    //const order = 'VLO-MVRT5P'

    const order = {
      number: 'VLO-MVRT5P',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Glazieli Pereira',
        email: 'glazipereira@mail.com'
      },
      payment: 'À Vista',
      status: 'APROVADO'
    }
    //Act

    await page.getByTestId('order-id').fill(order.number)
    //await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  });

  test('Deve consultar um pedido reprovado', async ({ page }) => {

    //const order = 'VLO-XE0GMC'

    const order = {
      number: 'VLO-XE0GMC',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'Tony Stark',
        email: 'ironman@mail.com'
      },
      payment: 'À Vista',
      status: 'REPROVADO'
    }

    //Act

    await page.getByTestId('order-id').fill(order.number)
    //await page.getByTestId('search-order-button').click()
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  });


  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 15_000})
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-MVRT5P')

  /* await expect(page.getByText('VLO-MVRT5P')).toBeVisible({timeout: 15_000})
  await expect(page.getByTestId('order-result-VLO-MVRT5P')).toContainText('VLO-MVRT5P') */

  /* const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-MVRT5P"]')
  await expect(orderCode).toBeVisible({timeout: 10_000}) */

  /*  const containerPedido = page.getByRole('paragraph')
     .filter({hasText: /^Pedido$/}) // ^ significa começa com e $ significa termina com
     .locator('..') // Sobe para o elemento pai (a div que agrupa ambos)
 
     await expect(containerPedido).toContainText(order, {timeout: 10_000}) */

  //Assert 
  //await expect(page.getByTestId('order-result-status')).toBeVisible()
  //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

  /*  await expect(page.getByText('APROVADO')).toBeVisible();
   await expect(page.getByTestId('order-result-VLO-MVRT5P')).toContainText('APROVADO') */



  test('Deve exibir mensagem quando o pedido não é encotrado', async ({ page }) => {

    const order = generateOrderCode()

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()


    /* const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
    await expect(title).toBeVisible()
   
    const message= page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    await expect(message).toBeVisible() */

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);
  })

})

