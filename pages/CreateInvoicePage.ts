import { Page, Locator } from '@playwright/test';

export class CreateInvoicePage {
  readonly page: Page;
  
  // Locators
  readonly amountInput: Locator;
  readonly debitCreditRadio: Locator;
  readonly virtualAccountRadio: Locator;
  readonly shopeePayRadio: Locator;
  readonly letCustomerPayFeeCheckbox: Locator;
  readonly totalDisplay: Locator;
  readonly createInvoiceButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  
  // Optional fields
  readonly customerNameInput: Locator;
  readonly customerEmailInput: Locator;
  readonly customerPhoneInput: Locator;
  readonly descriptionInput: Locator;
  readonly referenceNoInput: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Amount & Payment
    this.amountInput = page.locator('[data-testid="amount"]');
    this.debitCreditRadio = page.locator('[data-testid="payment-debit-credit"]');
    this.virtualAccountRadio = page.locator('[data-testid="payment-va"]');
    this.shopeePayRadio = page.locator('[data-testid="payment-shopeepay"]');
    this.letCustomerPayFeeCheckbox = page.locator('[data-testid="customer-pay-fee"]');
    this.totalDisplay = page.locator('[data-testid="total-amount"]');
    this.createInvoiceButton = page.locator('[data-testid="create-invoice-btn"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
    
    // Optional fields
    this.customerNameInput = page.locator('[data-testid="customer-name"]');
    this.customerEmailInput = page.locator('[data-testid="customer-email"]');
    this.customerPhoneInput = page.locator('[data-testid="customer-phone"]');
    this.descriptionInput = page.locator('[data-testid="description"]');
    this.referenceNoInput = page.locator('[data-testid="reference-no"]');
  }

  async goto() {
    await this.page.goto('https://[your-test-url]/create-invoice');
  }

  async fillValidAmountAndPayment() {
    await this.amountInput.fill('100000');
    await this.debitCreditRadio.check();
  }

  async fillAllOptionalFields() {
    await this.customerNameInput.fill('Alice Customer');
    await this.customerEmailInput.fill('alice@example.com');
    await this.customerPhoneInput.fill('+6289876543210');
    await this.descriptionInput.fill('Test transaction');
    await this.referenceNoInput.fill('INV-001');
  }

  async clickCreateInvoice() {
    await this.createInvoiceButton.click();
  }

  async getTotalText(): Promise<string> {
    return await this.totalDisplay.textContent() || '';
  }
}