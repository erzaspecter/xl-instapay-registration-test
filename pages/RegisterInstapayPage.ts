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
  
  // Locators - Transaction Details Section
  readonly amountInput: Locator;
  readonly customerNameInput: Locator;
  readonly customerEmailInput: Locator;
  readonly customerPhoneInput: Locator;
  readonly descriptionInput: Locator;
  readonly referenceNoInput: Locator;
  
  // Locators - Payment Channels
  readonly debitCreditRadio: Locator;
  readonly virtualAccountRadio: Locator;
  readonly shopeePayRadio: Locator;
  
  // Locators - Options & Action
  readonly letCustomerPayFeeCheckbox: Locator;
  readonly totalAmountDisplay: Locator;
  readonly createInvoiceButton: Locator;
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
    
    // Transaction Details Section
    this.amountInput = page.locator('[data-testid="amount"]');
    this.customerNameInput = page.locator('[data-testid="customer-name"]');
    this.customerEmailInput = page.locator('[data-testid="customer-email"]');
    this.customerPhoneInput = page.locator('[data-testid="customer-phone"]');
    this.descriptionInput = page.locator('[data-testid="description"]');
    this.referenceNoInput = page.locator('[data-testid="reference-no"]');
    
    // Payment Channels
    this.debitCreditRadio = page.locator('[data-testid="payment-debit-credit"]');
    this.virtualAccountRadio = page.locator('[data-testid="payment-va"]');
    this.shopeePayRadio = page.locator('[data-testid="payment-shopeepay"]');
    
    // Options & Action
    this.letCustomerPayFeeCheckbox = page.locator('[data-testid="customer-pay-fee"]');
    this.totalAmountDisplay = page.locator('[data-testid="total-amount"]');
    this.createInvoiceButton = page.locator('[data-testid="create-invoice-btn"]');
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
    await this.declarationCheckbox.check();
    await this.termsCheckbox.check();
    await this.amountInput.fill('100000');
    await this.debitCreditRadio.check();
  }

  async clickCreateInvoice() {
    await this.createInvoiceButton.click();
  }
}