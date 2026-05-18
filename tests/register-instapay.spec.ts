// tests/register-instapay.spec.ts
import { test, expect } from '@playwright/test';
import { RegisterInstapayPage } from '../pages/RegisterInstapayPage';

test.describe('Register for Instapay - Functional Tests', () => {
  let registerPage: RegisterInstapayPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterInstapayPage(page);
    await registerPage.goto();
  });

  // ===========================================
  // Table A: Required Fields Validation (TC-01 to TC-10)
  // ===========================================

  // TC-01: Valid complete form submission
  test('TC-01 - Valid complete form submission', async () => {
    await registerPage.fillValidForm();
    await registerPage.clickCreateInvoice();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // TC-02: Empty Name
  test('TC-02 - Empty Name field', async () => {
    await registerPage.fillValidForm();
    await registerPage.nameInput.fill('');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Name is required');
  });

  // TC-03: Empty Email
  test('TC-03 - Empty Email field', async () => {
    await registerPage.fillValidForm();
    await registerPage.emailInput.fill('');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Email is required');
  });

  // TC-04: Invalid email format
  test('TC-04 - Invalid email format', async () => {
    await registerPage.fillValidForm();
    await registerPage.emailInput.fill('notanemail');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Invalid email format');
  });

  // TC-05: Empty Phone number
  test('TC-05 - Empty Phone number', async () => {
    await registerPage.fillValidForm();
    await registerPage.phoneInput.fill('');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Phone number is required');
  });

  // TC-06: Invalid phone format (missing +62)
  test('TC-06 - Invalid phone format (missing +62)', async () => {
    await registerPage.fillValidForm();
    await registerPage.phoneInput.fill('81234567890');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Phone must start with +62');
  });

  // TC-07: Empty Store name
  test('TC-07 - Empty Store name', async () => {
    await registerPage.fillValidForm();
    await registerPage.storeNameInput.fill('');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Store name is required');
  });

  // TC-08: No business category selected
  test('TC-08 - No business category selected', async () => {
    await registerPage.fillValidForm();
    await registerPage.businessCategoryDropdown.selectOption('');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Business category is required');
  });

  // TC-09: Declaration checkbox unchecked
  test('TC-09 - Declaration checkbox unchecked', async () => {
    await registerPage.fillValidForm();
    await registerPage.declarationCheckbox.uncheck();
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('You must declare that information is true and correct');
  });

  // TC-10: Terms & Conditions unchecked
  test('TC-10 - Terms & Conditions unchecked', async () => {
    await registerPage.fillValidForm();
    await registerPage.termsCheckbox.uncheck();
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('You must agree to the terms and conditions');
  });

  // ===========================================
  // Table B: Amount & Payment Validation (TC-11 to TC-15)
  // ===========================================

  // TC-11: Amount below minimum
  test('TC-11 - Amount below minimum (10,000)', async () => {
    await registerPage.fillValidForm();
    await registerPage.amountInput.fill('10000');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Minimum amount is IDR 15,000');
  });

  // TC-12: Amount equals minimum
  test('TC-12 - Amount equals minimum (15,000)', async () => {
    await registerPage.fillValidForm();
    await registerPage.amountInput.fill('15000');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // TC-13: Amount with decimals
  test('TC-13 - Amount with decimals', async () => {
    await registerPage.fillValidForm();
    await registerPage.amountInput.fill('15000.50');
    await registerPage.clickCreateInvoice();
    // Either accept rounded value or show error
    const hasError = await registerPage.errorMessage.isVisible();
    const hasSuccess = await registerPage.successMessage.isVisible();
    expect(hasError || hasSuccess).toBeTruthy();
  });

  // TC-14: No payment channel selected
  test('TC-14 - No payment channel selected', async () => {
    await registerPage.fillValidForm();
    // Note: This assumes there is a way to deselect all payment options
    // If radio buttons cannot be deselected, skip or modify this test
    await registerPage.clickCreateInvoice();
    const errorText = await registerPage.errorMessage.textContent();
    expect(errorText).toContain('Please select payment channel');
  });

  // TC-15: Debit/Credit with service fee calculation
  test('TC-15 - Debit/Credit service fee (2.5%)', async () => {
    await registerPage.fillValidForm();
    await registerPage.amountInput.fill('100000');
    await registerPage.debitCreditRadio.check();
    // Wait for total to update
    await registerPage.page.waitForTimeout(500);
    const totalText = await registerPage.totalAmountDisplay.textContent();
    // Expected: 100000 + 2.5% = 102500
    expect(totalText).toContain('102,500');
  });

  // ===========================================
  // Table C: Optional Fields & Edge Cases (TC-16 to TC-20)
  // ===========================================

  // TC-16: All optional fields filled
  test('TC-16 - All optional fields filled', async () => {
    await registerPage.fillValidForm();
    await registerPage.customerNameInput.fill('Alice Customer');
    await registerPage.customerEmailInput.fill('alice@example.com');
    await registerPage.customerPhoneInput.fill('+6289876543210');
    await registerPage.descriptionInput.fill('Test transaction description');
    await registerPage.referenceNoInput.fill('INV-2025-001');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // TC-17: All optional fields empty
  test('TC-17 - All optional fields empty', async () => {
    await registerPage.fillValidForm();
    // Optional fields are already empty by default
    await registerPage.clickCreateInvoice();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // TC-18: "Let customer pay service fee" checked
  test('TC-18 - Let customer pay service fee enabled', async () => {
    await registerPage.fillValidForm();
    await registerPage.amountInput.fill('100000');
    await registerPage.debitCreditRadio.check();
    await registerPage.letCustomerPayFeeCheckbox.check();
    await registerPage.page.waitForTimeout(500);
    const totalText = await registerPage.totalAmountDisplay.textContent();
    // Total should still show same amount (customer pays fee separately)
    expect(totalText).toContain('100,000');
  });

  // TC-19: Valid referral code
  test('TC-19 - Valid referral code', async () => {
    await registerPage.fillValidForm();
    await registerPage.referralCodeInput.fill('VALIDREF123');
    await registerPage.clickCreateInvoice();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // TC-20: SQL injection attempt
  test('TC-20 - SQL injection attempt in Name field', async () => {
    await registerPage.fillValidForm();
    await registerPage.nameInput.fill("' OR '1'='1");
    await registerPage.clickCreateInvoice();
    // Should not cause server error or expose data
    const hasError = await registerPage.errorMessage.isVisible();
    const hasSuccess = await registerPage.successMessage.isVisible();
    expect(hasError || hasSuccess).toBeTruthy();
  });
});