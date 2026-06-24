import React, { createContext, useState, useContext } from 'react';

export const CurrencyContext = createContext(null);

// Base prices in the app are stored in USD.
// Exchange rates relative to 1 USD:
export const EXCHANGE_RATES = {
  USD: 1,
  ETB: 57.5,   // 1 USD ≈ 57.5 ETB (Ethiopian Birr)
  EUR: 0.92,   // 1 USD ≈ 0.92 EUR
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  ETB: 'ETB ',
  EUR: '€',
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(
    () => localStorage.getItem('currency') || 'USD'
  );

  const switchCurrency = (code) => {
    setCurrency(code);
    localStorage.setItem('currency', code);
  };

  /**
   * Converts a USD price to the active currency and returns a formatted string.
   * e.g.  formatPrice(9.99) → "$9.99" | "ETB 574.43" | "€9.19"
   */
  const formatPrice = (usdPrice) => {
    const rate = EXCHANGE_RATES[currency] ?? 1;
    const converted = usdPrice * rate;
    const symbol = CURRENCY_SYMBOLS[currency] ?? '$';

    // ETB shows no decimals (whole birr), others show 2
    const decimals = currency === 'ETB' ? 0 : 2;
    return `${symbol}${converted.toFixed(decimals)}`;
  };

  /**
   * Raw converted number (useful for totals / arithmetic).
   */
  const convertPrice = (usdPrice) => {
    const rate = EXCHANGE_RATES[currency] ?? 1;
    return usdPrice * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, switchCurrency, formatPrice, convertPrice, CURRENCY_SYMBOLS }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Convenience hook
export const useCurrency = () => useContext(CurrencyContext);
