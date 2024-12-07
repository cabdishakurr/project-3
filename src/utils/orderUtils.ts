import { Order } from '../types';

export const calculateStageTime = (order: Order): number => {
  const currentStage = order.status;
  const stageTime = order.stageTimes[currentStage];
  
  if (!stageTime?.start) return 0;
  
  const startTime = new Date(stageTime.start).getTime();
  const endTime = stageTime.end 
    ? new Date(stageTime.end).getTime()
    : new Date().getTime();
  
  return Math.floor((endTime - startTime) / (1000 * 60)); // Convert to minutes
};

export const calculateAveragePreparationTime = (orders: Order[]): number => {
  const completedOrders = orders.filter(order => order.status === 'completed');
  
  if (completedOrders.length === 0) return 0;
  
  const totalTime = completedOrders.reduce((sum, order) => {
    const startTime = order.stageTimes.pending?.start;
    const endTime = order.stageTimes.completed?.end;
    
    if (!startTime || !endTime) return sum;
    
    const duration = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60);
    return sum + duration;
  }, 0);
  
  return Math.round(totalTime / completedOrders.length);
};

export const isOrderDelayed = (order: Order): boolean => {
  if (order.status === 'completed' || !order.stageTimes.pending?.start) {
    return false;
  }

  const startTime = new Date(order.stageTimes.pending.start).getTime();
  const currentTime = new Date().getTime();
  const expectedPrepTime = order.items.reduce((total, item) => total + item.preparationTime, 0);
  
  return (currentTime - startTime) > (expectedPrepTime * 60 * 1000);
};