// tests/api/va-api.spec.ts
import { test, expect } from '@playwright/test';
import crypto from 'crypto';

test.describe('VA API - POST /va', () => {
  const merchant_index = 'MCP2023011830';
  const secret_unbound_id = '0x00558c744cb597f6b0';
  const hash_key = 'fsNmnFkUGG8nhKYpQGzDWQ4bMQZKA6QGBBRgrbx+tMI';

  function generateSignature(external_id: string, order_id: string): string {
    const payload = hash_key + external_id + order_id;
    return crypto.createHmac('sha256', hash_key).update(payload).digest('hex');
  }

  function generateAuth(): string {
    const authString = merchant_index + ':' + secret_unbound_id;
    const base64Auth = Buffer.from(authString).toString('base64');
    return 'Basic ' + base64Auth;
  }

  // TC-01: Valid request
  test('TC-01 - Valid request with correct signature', async ({ request }) => {
    const external_id = `AUTO_TEST_EXT-${Date.now()}`;
    const order_id = `AUTO_TEST_ORDER-${Date.now()}`;
    const signature = generateSignature(external_id, order_id);
    const auth = generateAuth();

    const response = await request.post('https://api-stage.tspayment.id/va', {
      headers: {
        'Authorization': auth,
        'x-req-signature': signature,
        'x-version': 'v3',
        'Content-Type': 'application/json'
      },
      data: {
        external_id,
        order_id,
        currency: 'IDR',
        payment_method: 'bank_transfer',
        payment_channel: 'MANDIRI',
        payment_details: {},
        billing_name: 'Auto Test Customer',
        payment_system: 'CLOSED',
        amount: 100000,
        transaction_description: 'Auto test transaction',
        customer_details: {
          email: 'autotest@example.com',
          full_name: 'Auto Test User',
          phone: '81234567890'
        },
        callback_url: 'https://merchant-test.example.com/callback'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('00');
  });

  // TC-02: Invalid signature
  test('TC-02 - Invalid signature', async ({ request }) => {
    const external_id = `AUTO_TEST_EXT-${Date.now()}`;
    const order_id = `AUTO_TEST_ORDER-${Date.now()}`;
    const auth = generateAuth();

    const response = await request.post('https://api-stage.tspayment.id/va', {
      headers: {
        'Authorization': auth,
        'x-req-signature': 'invalid_signature_12345',
        'x-version': 'v3',
        'Content-Type': 'application/json'
      },
      data: {
        external_id,
        order_id,
        currency: 'IDR',
        payment_method: 'bank_transfer',
        payment_channel: 'MANDIRI',
        payment_details: {},
        billing_name: 'Auto Test Customer',
        amount: 100000,
        transaction_description: 'Test',
        customer_details: {
          email: 'test@example.com',
          full_name: 'Test User',
          phone: '81234567890'
        },
        callback_url: 'https://test.com'
      }
    });

    expect(response.status()).toBe(401);
  });
});