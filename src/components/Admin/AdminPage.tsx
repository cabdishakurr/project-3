import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './Dashboard/AdminDashboard';
import { OrderManagementPage } from '../OrderManagement/OrderManagementPage';
import { MenuEditor } from '../MenuManagement/MenuEditor';
import { SystemConfigPage } from '../SystemConfig/SystemConfigPage';
import { AnalyticsPage } from './Analytics/AnalyticsPage';
import { CustomersPage } from './Customers/CustomersPage';
import { IntegrationsPage } from './Integrations/IntegrationsPage';
import { products } from '../../data/products';

export const AdminPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [menuProducts, setMenuProducts] = useState(products);

  const handleAddProduct = (product: any) => {
    setMenuProducts([...menuProducts, { ...product, id: Date.now().toString() }]);
  };

  const handleUpdateProduct = (product: any) => {
    setMenuProducts(menuProducts.map(p => p.id === product.id ? product : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setMenuProducts(menuProducts.filter(p => p.id !== productId));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'orders':
        return <OrderManagementPage />;
      case 'menu':
        return (
          <MenuEditor
            products={menuProducts}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'customers':
        return <CustomersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'system':
        return <SystemConfigPage />;
      default:
        return <div>Page under construction</div>;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </AdminLayout>
  );
};