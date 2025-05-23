// components/promotions/CreatePromotionForm.tsx
'use client'

import React, { useState } from 'react';
import { 
  Stack, 
  Select, 
  Button, 
  Group, 
  Text, 
  Card, 
  SimpleGrid, 
  Badge, 
  List, 
  ThemeIcon,
  Radio,
  RadioGroup
} from '@mantine/core';
import { IconCheck, IconInfoCircle } from '@tabler/icons-react';
import { Promotion, PROMOTION_PLANS } from '@/types/promotion';

interface CreatePromotionFormProps {
  userCars: any[];
  onSubmit: (promotion: Promotion) => void;
  onCancel: () => void;
}

export default function CreatePromotionForm({ 
  userCars, 
  onSubmit, 
  onCancel 
}: CreatePromotionFormProps) {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const carOptions = userCars.map((car) => ({
    value: car.id,
    label: car.title,
  }));

  const handleSubmit = () => {
    if (!selectedCar || !selectedPlan) return;
    
    const plan = PROMOTION_PLANS.find(p => p.id === selectedPlan);
    if (!plan) return;
    
    const car = userCars.find(c => c.id === selectedCar);
    
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);
    
    const newPromotion: Promotion = {
      id: `promo${Date.now()}`,
      carId: selectedCar,
      car: car,
      userId: 'user1', // In a real app, this would come from auth
      planId: plan.id,
      planName: plan.name,
      price:plan.price,
      startDate,
      endDate,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    onSubmit(newPromotion);
  };

  return (
    <Stack gap="lg">
      <Select
        label="Select a car listing to promote"
        placeholder="Choose from your listings"
        data={carOptions}
        value={selectedCar}
        onChange={setSelectedCar}
        withAsterisk
        required
      />
      
      <Text fw={500} size="sm" mt="md">Select a promotion plan:</Text>
      
      <RadioGroup value={selectedPlan || ''} onChange={setSelectedPlan}>
        <SimpleGrid cols={3} spacing="md" >
          {PROMOTION_PLANS.map((plan) => (
            <Card 
              key={plan.id} 
              withBorder 
              shadow="sm" 
              p="md" 
              radius="md"
              style={(theme) => ({
                borderColor: selectedPlan === plan.id ? theme.colors.blue[5] : theme.colors.gray[3],
                backgroundColor: selectedPlan === plan.id ? theme.colors.blue[0] : 'transparent',
              })}
            >
              <Radio value={plan.id} label={null} />
              
              <Text fw={700} size="lg">{plan.name}</Text>
              <Badge size="sm" color="blue" variant="light" my="xs">
                {plan.duration} days
              </Badge>
              <Text color="dimmed" size="sm" mb="md">{plan.description}</Text>
              
              <Text fw={700} size="xl" color="blue">${plan.price.toFixed(2)}</Text>
              
              <List 
                spacing="xs" 
                size="sm" 
                mt="md"
                icon={
                  <ThemeIcon color="blue" size={16} radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                }
              >
                {plan.benefits.map((benefit, idx) => (
                  <List.Item key={idx}>{benefit}</List.Item>
                ))}
              </List>
            </Card>
          ))}
        </SimpleGrid>
      </RadioGroup>
      
      <Group justify="apart" mt="xl">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          color="blue" 
          onClick={handleSubmit}
          disabled={!selectedCar || !selectedPlan}
        >
          Create Promotion
        </Button>
      </Group>
    </Stack>
  );
}