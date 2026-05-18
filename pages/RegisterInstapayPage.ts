// pages/RegisterInstapayPage.ts
import { Page, Locator } from '@playwright/test';

export class RegisterInstapayPage {
  readonly page: Page;
  
  // Locators - User Profile Section
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  
  // Locators - Store Profile Section
  readonly storeNameInput: Locator;
  readonly businessCategoryDropdown: Locator;
  readonly referralCodeInput: Locator;
  
  // Locators - Agreement Section
  readonly declarationCheckbox: Locator;
  readonly termsCheckbox: Locator;
  
  // Locators - Action
  readonly registerButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // User Profile Section
    this.nameInput = page.locator('[data-testid="name"]');
    this.emailInput = page.locator('[data-testid="email"]');
    this.phoneInput = page.locator('[data-testid="phone"]');
    
    // Store Profile Section
    this.storeNameInput = page.locator('[data-testid="store-name"]');
    this.businessCategoryDropdown = page.locator('[data-testid="business-category"]');
    this.referralCodeInput = page.locator('[data-testid="referral-code"]');
    
    // Agreement Section
    this.declarationCheckbox = page.locator('[data-testid="declaration"]');
    this.termsCheckbox = page.locator('[data-testid="terms"]');
    
    // Action
    this.registerButton = page.locator('[data-testid="register-btn"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
  }

  async goto() {
    await this.page.goto('https://[your-test-url]/register-instapay');
  }

  async fillValidForm() {
    await this.nameInput.fill('John Doe');
    await this.emailInput.fill('john@example.com');
    await this.phoneInput.fill('+6281234567890');
    await this.storeNameInput.fill('John Store');
    await this.businessCategoryDropdown.selectOption('Fashion');
    await this.referralCodeInput.fill('REF123');
    await this.declarationCheckbox.check();
    await this.termsCheckbox.check();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }
}