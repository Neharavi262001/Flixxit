const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const {stripe}=require('../utils/stripe')

const viewAvailableSubscriptions = asyncHandler(async (req, res) => {
  try {
    const pricesWithProducts = await stripe.prices.list({ expand: ['data.product'] });
    const formattedPrices = pricesWithProducts.data.map(price => ({
      id: price.id,
      productName: price.product.name,
      amount: price.unit_amount / 100, 
      currency: price.currency,
      interval: price.recurring ? price.recurring.interval : null,
    }));
    res.json(formattedPrices);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const checkoutSession = asyncHandler(async (req, res) => {
  try {
    
     if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }

    const user = await User.findById(req.user);

     if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const session = await stripe.checkout.sessions.create({
     
      payment_method_types: ['card'],
      line_items: [
        {
          price: req.body.id, 
          quantity: 1,
        },
      ],

      mode: 'subscription',
      success_url: 'https://flixxit-zeta.vercel.app/', 
      cancel_url: 'https://flixxit-zeta.vercel.app/subscribe', 
      
      customer: user.stripeCustomerId
      
    });
 
  
    res.json({ sessionId: session.id, session, checkoutUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error', stripeError: error.message  });
  }
});

const viewUserSubscriptionDetails = asyncHandler(async (req, res) => {
  try {
    
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    const user = await User.findById(req.user);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
    });

    function formatDate(timestamp) {
      const date = new Date(timestamp * 1000); 
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const year = date.getFullYear();
      return `${day} / ${month} / ${year}`;
    }

   
    const subscriptionDetails = subscriptions.data.map((subscription) => {
      const formattedEndDate = formatDate(subscription.current_period_end);
      return {
        id: subscription.id,
        status: subscription.status,
        current_period_end: formattedEndDate,
        price: subscription.items.data[0].price.id,
        plan: subscription.items.data[0].price.recurring.interval,
        amount: subscription.payment_settings.payment_method_options.card.mandate_options.amount / 100,
        planName: subscription.payment_settings.payment_method_options.card.mandate_options.description,
      };
    });
    

    res.json(subscriptionDetails);
  } catch (error) {
    console.error('Error fetching user subscription details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = { viewAvailableSubscriptions,checkoutSession,  viewUserSubscriptionDetails };
