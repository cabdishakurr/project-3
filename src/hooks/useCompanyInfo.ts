import { useState } from 'react';
import { CompanyInfo } from '../types';

const defaultCompanyInfo: CompanyInfo = {
  name: 'Restaurant Name',
  logo: null,
  address: '123 Main Street, City, Country',
  phone: '+1 234 567 890',
  salesTax: 0.1, // 10%
};

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('companyInfo');
    return saved ? JSON.parse(saved) : defaultCompanyInfo;
  });

  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
    localStorage.setItem('companyInfo', JSON.stringify(info));
  };

  return {
    companyInfo,
    updateCompanyInfo,
  };
};