import {
  Post,
  Req,
  Headers,
  Controller,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { Response } from 'express'
import Stripe from 'stripe'
import { StripeService } from './stripe.service'

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  getStripeInstance() {
    return this.stripeService.getStripeInstance()
  }

  @Get('customer/:email')
  async findCustomerByEmail(
    @Req() req: any,
    @Param('email') email: string,
    @Res() res: Response,
  ) {
    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Email parameter is required',
      })
    }
    try {
      const customer = await this.stripeService.findCustomerByEmail(email)
      return res.status(HttpStatus.OK).json(customer)
    } catch (error) {
      console.error('Error finding customer:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to find customer',
      })
    }
  }

  @Get('setup-intent/:customerId')
  async setupIntent(
    @Req() req: any,
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    if (!customerId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID parameter is required',
      })
    }
    try {
      const setupIntent = await this.stripeService.setupIntent(customerId)
      return res.status(HttpStatus.OK).json(setupIntent)
    } catch (error) {
      console.error('Error creating setup intent:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to create setup intent',
      })
    }
  }

  @Get('subscription/customer/:customerId')
  async findSubscriptionByCustomerId(
    @Req() req: any,
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    if (!customerId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID parameter is required',
      })
    }
    try {
      const subscription =
        await this.stripeService.findSubscriptionByCustomerId(customerId)
      return res.status(HttpStatus.OK).json(subscription)
    } catch (error) {
      console.error('Error finding subscription:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to find subscription',
      })
    }
  }

  @Get('payment-method/customer/:customerId')
  async retrievePaymentMethod(
    @Req() req: any,
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    if (!customerId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID parameter is required',
      })
    }
    try {
      const paymentMethods =
        await this.stripeService.retrievePaymentMethod(customerId)
      return res.status(HttpStatus.OK).json(paymentMethods)
    } catch (error) {
      console.error('Error retrieving payment method:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to retrieve payment method',
      })
    }
  }

  @Post('new-payment-method')
  async attachNewPaymentMethod(
    @Req() req: any,
    @Body()
    body: { customerId: string; paymentMethodId: string },
    @Res() res: Response,
  ) {
    const { customerId, paymentMethodId } = body
    if (!customerId || !paymentMethodId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID and Payment Method ID headers are required',
      })
    }
    try {
      await this.stripeService.attachNewPaymentMethod(
        customerId,
        paymentMethodId,
      )
      return res.status(HttpStatus.OK).json({
        message: 'Payment method attached successfully',
      })
    } catch (error) {
      console.error('Error attaching new payment method:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to attach new payment method',
      })
    }
  }

  @Patch('default-payment-method')
  async setDefaultPaymentMethod(
    @Req() req: any,
    @Body()
    body: { customerId: string; paymentMethodId: string },
    @Res() res: Response,
  ) {
    const { customerId, paymentMethodId } = body
    if (!customerId || !paymentMethodId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID and Payment Method ID headers are required',
      })
    }
    try {
      await this.stripeService.setDefaultPaymentMethod(
        customerId,
        paymentMethodId,
      )
      return res.status(HttpStatus.OK).json({
        message: 'Default payment method set successfully',
      })
    } catch (error) {
      console.error('Error setting default payment method:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to set default payment method',
      })
    }
  }

  @Delete('payment-method/:paymentMethodId')
  async detachPaymentMethod(
    @Req() req: any,
    @Param('paymentMethodId') paymentMethodId: string,
    @Res() res: Response,
  ) {
    if (!paymentMethodId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Payment Method ID parameter is required',
      })
    }
    try {
      await this.stripeService.detachPaymentMethod(paymentMethodId)
      return res.status(HttpStatus.OK).json({
        message: 'Payment method detached successfully',
      })
    } catch (error) {
      console.error('Error detaching payment method:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to detach payment method',
      })
    }
  }

  @Post('create-customer')
  async createCustomer(
    @Req() req: any,
    @Body() body: { email: string },
    @Res() res: Response,
  ) {
    const { email } = body
    if (!email) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Email header is required',
      })
    }
    try {
      const customer = await this.stripeService.createCustomer(email)
      return res.status(HttpStatus.CREATED).json(customer)
    } catch (error) {
      console.error('Error creating customer:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to create customer',
      })
    }
  }

  @Post('create-subscription')
  async createSubscription(
    @Req() req: any,
    @Body() body: { customerId: string; lookupKey: string },
    @Res() res: Response,
  ) {
    const { customerId, lookupKey } = body
    if (!customerId || !lookupKey) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID and Lookup Key headers are required',
      })
    }
    const priceId = await this.stripeService.getStripeInstance().prices.list({
      lookup_keys: [lookupKey],
      expand: ['data.product'],
    })
    try {
      const subscription = await this.stripeService.createSubscription(
        customerId,
        priceId.data[0].id,
      )
      return res.status(HttpStatus.CREATED).json(subscription)
    } catch (error) {
      console.error('Error creating subscription:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to create subscription',
      })
    }
  }

  @Patch('update-user-default-payment-method')
  async updatePaymentMethod(
    @Req() req: any,
    @Body()
    body: { customerId: string; paymentMethodId: string },
    @Res() res: Response,
  ) {
    const { customerId, paymentMethodId } = body
    if (!customerId || !paymentMethodId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Customer ID and Payment Method ID headers are required',
      })
    }
    try {
      await this.stripeService.attachNewPaymentMethod(
        customerId,
        paymentMethodId,
      )
      await this.stripeService.updateCustomerDefaultPaymentMethod(
        customerId,
        paymentMethodId,
      )
      return res.status(HttpStatus.OK).json({
        message: 'Payment method updated successfully',
      })
    } catch (error) {
      console.error('Error updating payment method:', error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Failed to update payment method',
      })
    }
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') sig: string,
    @Res() res: Response,
  ) {
    const stripe = this.stripeService.getStripeInstance()
    let event: Stripe.Event

    try {
      const buf = Buffer.isBuffer(req.rawBody)
        ? req.rawBody
        : Buffer.from(req.body)
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || '',
      )
    } catch (err) {
      console.error(
        'Stripe webhook signature verification failed:',
        err.message,
      )
      return res.status(400).json({ error: 'Webhook signature verification failed' })
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        // handle payment success
        break
      // handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  }
}
