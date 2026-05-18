// tests/register-instapay.spec.ts
import { test, expect } from '@playwright/test';
import { RegisterInstapayPage } from '../pages/RegisterInstapayPage';

test.describe('Register for Instapay - Functional Tests', () => {
  let registerPage: RegisterInstapayPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterInstapayPage(page);
    await registerPage.goto();
  });

  // REG-01: Valid registration
  test('REG-01 - Valid registration', async () => {
    await registerPage.fillValidForm();
    await registerPage.clickRegisterButton();
    await expect(registerPage.successMessage).toBeVisible();
  });

  // REG-02: Empty Name
  test('REG-02 - Empty Name field', async () => {
    await registerPage.fillValidForm();
    await registerPage.nameInput.fill('');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Name is required');
  });

  // REG-03: Empty Email
  test('REG-03 - Empty Email field', async () => {
    await registerPage.fillValidForm();
    await registerPage.emailInput.fill('');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Email is required');
  });

  // REG-04: Invalid email format
  test('REG-04 - Invalid email format', async () => {
    await registerPage.fillValidForm();
    await registerPage.emailInput.fill('notanemail');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Invalid email format');
  });

  // REG-05: Empty Phone number
  test('REG-05 - Empty Phone number', async () => {
    await registerPage.fillValidForm();
    await registerPage.phoneInput.fill('');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Phone number is required');
  });

  // REG-06: Invalid phone format (missing +62)
  test('REG-06 - Invalid phone format (missing +62)', async () => {
    await registerPage.fillValidForm();
    await registerPage.phoneInput.fill('81234567890');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Phone must start with +62');
  });

  // REG-07: Empty Store name
  test('REG-07 - Empty Store name', async () => {
    await registerPage.fillValidForm();
    await registerPage.storeNameInput.fill('');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Store name is required');
  });

  // REG-08: No business category selected
  test('REG-08 - No business category selected', async () => {
    await registerPage.fillValidForm();
    await registerPage.businessCategoryDropdown.selectOption('');
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('Business category is required');
  });

  // REG-09: Declaration checkbox unchecked
  test('REG-09 - Declaration checkbox unchecked', async () => {
    await registerPage.fillValidForm();
    await registerPage.declarationCheckbox.uncheck();
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('You must declare that information is true and correct');
  });

  // REG-10: Terms & Conditions unchecked
  test('REG-10 - Terms & Conditions unchecked', async () => {
    await registerPage.fillValidForm();
    await registerPage.termsCheckbox.uncheck();
    await registerPage.clickRegisterButton();
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toContainText('You must agree to the terms and conditions');
  });
});