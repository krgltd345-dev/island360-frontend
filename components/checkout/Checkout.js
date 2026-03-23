'use client';
import { useNmiPaymentMutation } from '@/services/bookingApi';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const NmiPayments = dynamic(
  () => import('@nmipayments/nmi-pay-react').then(mod => mod.NmiPayments),
  { ssr: false }
);

const appearance = {
  "theme": "light",
  "customTheme": {
    "layout": {
      "radius": {
        "small": "4px",
        "medium": "8px",
        "large": "12px"
      },
      "borderWidth": {
        "small": "1px",
        "medium": "1px",
        "large": "4px"
      },
      "spacing": {
        "padding": "16px",
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "3xl": "64px"
      }
    },
    "typography": {
      "size": {
        "xs": "12px",
        "sm": "14px",
        "md": "16px",
        "lg": "18px",
        "xl": "20px",
        "2xl": "24px"
      },
      "weight": {
        "light": "300",
        "medium": "500",
        "bold": "700"
      },
      "font": {
        "sans": "ui-sans-serif, system-ui, sans-serif",
        "mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
      }
    },
    "colors": {
      "background": "#ffffff",
      "foreground": "#11181C",
      "border": "#E5E7EB",
      "input": "#ffffff",
      "primary": {
        "100": "#EBF5FF",
        "200": "#1E70EB",
        "default": "#3B82F6",
        "foreground": "#ffffff"
      },
      "secondary": {
        "100": "#e4d4f4",
        "200": "#ae7ede",
        "default": "#7828C8",
        "foreground": "#ffffff"
      },
      "success": {
        "100": "#d1f4e0",
        "200": "#75dea2",
        "default": "#17C964",
        "foreground": "#ffffff"
      },
      "warning": {
        "100": "#fde9cc",
        "200": "#f9bd66",
        "default": "#F5A524",
        "foreground": "#000000"
      },
      "danger": {
        "100": "#fecede",
        "200": "#fc6c9c",
        "default": "#F31260",
        "foreground": "#ffffff"
      },
      "default": {
        "100": "#e4e4e6",
        "200": "#acacb3",
        "default": "#71717A",
        "foreground": "#ffffff"
      },
      "content1": {
        "100": "#f8f9fa",
        "200": "#f1f3f5",
        "default": "#ffffff",
        "foreground": "#11181C"
      },
      "content2": {
        "100": "#f1f3f5",
        "200": "#eceef0",
        "default": "#f8f9fa",
        "foreground": "#11181C"
      }
    }
  },
  "layoutSpacing": "compact",
  "textSize": "default",
  "radiusSize": "default"
};

const CheckoutElement = ({ handlePay }) => {

  const [billingInfo, setBillingInfo] = useState({
    fName: '',
    lName: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(true);

  const validate = () => {
    const newErrors = {};
    if (!billingInfo.fName.trim()) newErrors.fName = 'First Name is required';
    if (!billingInfo.lName.trim()) newErrors.lName = 'Last Name is required';
    if (!billingInfo.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!/^[a-zA-Z0-9\s-]{3,10}$/.test(billingInfo.zip)) newErrors.zip = 'Invalid ZIP code';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const inputStyle = {
    width: '100%',
    padding: '36px 16px 16px 16px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    color: '#11181C',
    boxSizing: 'border-box',
  };

   const handlePayWithBilling = (event) => {
    if (!validate()) return;

    handlePay({
      ...event,
      billing: {
        fName: billingInfo.fName,
        lName: billingInfo.lName,
        zip: billingInfo.zip,
      },
    });
  };

  return (
    <>
    {
      !load && 
      <div className="billing-fields flex flex-col gap-2 p-3 pb-0">
        <div className='flex max-sm:flex-col gap-2 w-full'>
          <div className="field-group relative w-full">
            <label className=' z-10 left-4 absolute top-4 text-sm' htmlFor="cardholder-name">First Name</label>
            <input
              id="cardholder-name"
              type="text"
              placeholder="John"
              value={billingInfo.fName}
              className='focus:outline-none transition-all duration-300 focus:border-blue-500! relative '
              onChange={(e) => setBillingInfo(prev => ({ ...prev, fName: e.target.value }))}
              style={inputStyle}
            />
            {errors.fName && <span className="error text-sm pl-2 text-red-500">{errors.fName}</span>}
          </div>
          <div className="field-group relative w-full">
            <label className=' z-10 left-4 absolute top-4 text-sm' htmlFor="cardholder-name">Last Name</label>
            <input
              id="cardholder-name"
              type="text"
              placeholder="Doe"
              value={billingInfo.lName}
              className='focus:outline-none transition-all duration-300 focus:border-blue-500! relative '
              onChange={(e) => setBillingInfo(prev => ({ ...prev, lName: e.target.value }))}
              style={inputStyle}
            />
            {errors.lName && <span className="error text-sm pl-2 text-red-500">{errors.lName}</span>}
          </div>
        </div>
        <div className="field-group relative">
          <label className=' z-10 left-4 top-4 absolute text-sm' htmlFor="zip-code">ZIP / Postal Code</label>
          <input
            id="zip-code"
            type="text"
            placeholder="10001"
            className='focus:outline-none transition-all duration-300 focus:border-blue-500! relative '
            maxLength={10}
            value={billingInfo.zip}
            onChange={(e) => setBillingInfo(prev => ({ ...prev, zip: e.target.value }))}
            style={inputStyle}
          />
          {errors.zip && <span className="error text-sm pl-2 text-red-500">{errors.zip}</span>}
        </div>
      </div>
    }
      <NmiPayments
      onFieldsAvailable={() => {
        setLoad(false)
        setErrors({})
      }}
        layout="multiLine"
        paymentMethods={["card"]}
        expressCheckoutConfig={{
          googlePay: {
            merchantId: 'your-google-merchant-id',
            displayName: 'Your Business Name',
            transaction: {
              amount: 10.9,       // ← amount goes here
              currencyCode: 'USD',  // ← currency goes here
            },
          },
        }}
        appearance={appearance}
        tokenizationKey={process.env.NEXT_PUBLIC_TOKEN_KEY}
        onPay={handlePayWithBilling}
      />
    </>
  );
};

export default CheckoutElement;