import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class StripeService {
  private readonly stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')
  }

  getStripeInstance() {
    return this.stripe
  }

  async createCustomer(email: string) {
    return this.stripe.customers.create({ email })
  }

  async retrieveCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId)
  }

  async setupIntent(customerId: string) {
    return this.stripe.setupIntents.create({ customer: customerId })
  }

  async findCustomerByEmail(email: string) {
    const customers = await this.stripe.customers.list({ email })
    return customers.data.length > 0 ? customers.data[0] : null
  }

  async findSubscriptionByCustomerId(customerId: string) {
    const subscriptions = await this.stripe.subscriptions.list({
      customer: customerId,
    })
    if (subscriptions.data.length === 0) {
      return null
    } else {
      const subscription = await this.stripe.subscriptions.retrieve(
        subscriptions.data[0].id,
        {
          expand: ['latest_invoice.confirmation_secret'],
        },
      )
      return subscription
    }
  }

  async retrieveInvoice(invoiceId: string) {
    return this.stripe.invoices.retrieve(invoiceId)
  }

  async createSubscription(customerId: string, priceId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.confirmation_secret'],
    })
  }

  async attachNewPaymentMethod(customerId: string, paymentMethodId: string) {
    return this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })
  }

  async setDefaultPaymentMethod(customerId: string, paymentMethodId: string) {
    return this.stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })
  }

  async retrievePaymentMethod(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
    })
  }

  async detachPaymentMethod(paymentMethodId: string) {
    return this.stripe.paymentMethods.detach(paymentMethodId)
  }

  async updateCustomerDefaultPaymentMethod(
    customerId: string,
    paymentMethodId: string,
  ) {
    return this.stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })
  }
}
