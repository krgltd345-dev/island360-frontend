'use client';
import { useNmiPaymentMutation } from '@/services/bookingApi';
import dynamic from 'next/dynamic';

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

  return (
    <NmiPayments
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
      tokenizationKey="F2w7mF-57Gq85-qR3358-Uc64M9"
      onPay={handlePay}
    />
  );
};

export default CheckoutElement;