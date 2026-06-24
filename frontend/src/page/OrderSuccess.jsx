import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const OrderSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">{t('order_success_title')}</h1>
      <p>{t('order_success_desc')}</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-500">
        {t('order_success_back')}
      </Link>
    </div>
  );
};

export default OrderSuccess;
