import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Image, Phone, Percent } from 'lucide-react';
import { CompanyInfo } from '../../types';
import { useCompanyInfo } from '../../hooks/useCompanyInfo';

export const CompanyInfoForm: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useCompanyInfo();
  const [formData, setFormData] = useState<CompanyInfo>(companyInfo);
  const [previewLogo, setPreviewLogo] = useState<string | null>(companyInfo.logo);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewLogo(base64String);
        setFormData({ ...formData, logo: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Company Information</h2>

      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="flex items-center gap-4">
            {previewLogo ? (
              <img
                src={previewLogo}
                alt="Company logo"
                className="h-16 w-16 object-contain"
              />
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image className="text-gray-400" size={24} />
              </div>
            )}
            <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
              <span className="text-sm">Choose Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              Company Name
            </div>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </div>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Sales Tax */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Percent size={16} />
              Sales Tax Rate (%)
            </div>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="100"
            value={formData.salesTax * 100}
            onChange={(e) =>
              setFormData({
                ...formData,
                salesTax: parseFloat(e.target.value) / 100,
              })
            }
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save Changes
      </motion.button>
    </form>
  );
};