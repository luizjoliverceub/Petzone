import convertToSubCurrency from "@/lib/convertToSubCurrency";
import { NextRequest, NextResponse} from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



export async function POST(request:NextRequest) {

try {


   

    const {amount} = await request.json()

    console.log(amount);
    
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency:"brl",
        automatic_payment_methods:{enabled:true}
    })
  

    return NextResponse.json({clientSecret:paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`})
} catch (error) {
    console.log("iternal error payment route " + error);

    return NextResponse.json({error:error},{status:500})
    
}

}