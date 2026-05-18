import { test, expect } from '@playwright/test';
import { CreateInvoicePage } from '../pages/CreateInvoicePage';

test.describe('Create Invoice Page - Functional Tests', () => {
  let invoicePage: CreateInvoicePage;

  test.beforeEach(async ({ page }) => {
    invoicePage = new CreateInvoicePage(page);
    await invoicePage.goto();
  });

  // INV-01: Valid create invoice
  test('INV-01 - Valid create invoice', async () => {
    await invoicePage.fillValidAmountAndPayment();
    await invoicePage.clickCreateInvoice();
    await expect(invoicePage.successMessage).toBeVisible();
  });

  // INV-02: Amount below minimum
  test('INV-02 - Amount below minimum', async () => {
    await invoicePage.amountInput.fill('10000');
    await invoicePage.debitCreditRadio.check();
    await invoicePage.clickCreateInvoice();
    await expect(invoicePage.errorMessage).toBeVisible();
    await expect(invoicePage.errorMessage).toContainText('Minimum amount is IDR 15,000');
  });

  // INV-03: Amount equals minimum
  test('INV-03 - Amount equals minimum', async () => {
    await invoicePage.amountInput.fill('15000');
    await invoicePage.debitCreditRadio.check();
    await invoicePage.clickCreateInvoice();
    await expect(invoicePage.successMessage).toBeVisible();
  });

  // INV-05: No payment channel selected
  test('INV-05 - No payment channel selected', async () => {
    await invoicePage.amountInput.fill('100000');
    // Do NOT select any payment channel
    await invoicePage.clickCreateInvoice();
    await expect(invoicePage.errorMessage).toBeVisible();
    await expect(invoicePage.errorMessage).toContainText('Please select payment channel');
  });

  // INV-06: Debit/Credit service fee
  test('INV-06 - Debit/Credit service fee (2.5%)', async () => {
    await invoicePage.amountInput.fill('100000');
    await invoicePage.debitCreditRadio.check();
    await invoicePage.page.waitForTimeout(500);
    const total = await invoicePage.getTotalText();
    expect(total).toContain('102,500');
  });

  // INV-09: All optional fields filled
  test('INV-09 - All optional fields filled', async () => {
    await invoicePage.fillValidAmountAndPayment();
    await invoicePage.fillAllOptionalFields();
    await invoicePage.clickCreateInvoice();
    await expect(invoicePage.successMessage).toBeVisible();
  });

  // INV-10: SQL injection
  test('INV-10 - SQL injection in Customer name', async () => {
    await invoicePage.fillValidAmountAndPayment();
    await invoicePage.customerNameInput.fill("' OR '1'='1");
    await invoicePage.clickCreateInvoice();
    const hasError = await invoicePage.errorMessage.isVisible();
    const hasSuccess = await invoicePage.successMessage.isVisible();
    expect(hasError || hasSuccess).toBeTruthy();
  });
});