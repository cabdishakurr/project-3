import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { PaymentPage } from './components/PaymentPage';
import { OrderHistory } from './components/OrderHistory';
import { CartButton } from './components/CartButton';
import { CategoryMenu } from './components/CategoryMenu';
import { OrderNotification } from './components/OrderNotification';
import { AdminPage } from './components/Admin/AdminPage';
import { useOrder } from './hooks/useOrder';
import { useNotifications } from './hooks/useNotifications';
import { playOrderSound } from './utils/sound';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const {
    cart,
    orders,
    step,
    setStep,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    placeOrder,
  } = useOrder();

  const { notifications, addNotification, removeNotification } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handlePlaceOrder = (details: any) => {
    const order = placeOrder(details);
    addNotification(order);
    playOrderSound();
    setStep('tracking');
  };

  if (isAdmin) {
    return (
      <QueryClientProvider client={queryClient}>
        <AdminPage />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <Header
          currentStep={step}
          onStepChange={setStep}
          cartItemsCount={cart.length}
          onAdminClick={() => setIsAdmin(true)}
        />

        <div className="fixed top-4 right-4 z-50 space-y-4">
          {notifications.map((order) => (
            <OrderNotification
              key={order.id}
              order={order}
              onClose={() => removeNotification(order.id)}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {step === 'products' && (
            <>
              <CategoryMenu
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <ProductList
                categoryId={selectedCategory}
                onAddToCart={(product) => {
                  addToCart({ ...product, quantity: 1 });
                }}
              />
              <CartButton
                count={cart.length}
                onClick={() => setStep('payment')}
              />
            </>
          )}

          {step === 'payment' && (
            <PaymentPage
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              total={getCartTotal()}
              onSubmit={handlePlaceOrder}
            />
          )}

          {step === 'tracking' && (
            <OrderHistory
              orders={orders}
              onBackToShopping={() => setStep('products')}
            />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;