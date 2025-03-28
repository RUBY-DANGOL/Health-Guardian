import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        // Renders app/(tabs)/index.tsx
        name="index"
        options={{ 
            title: 'Home',
            headerShown: false
        }}  
      />
    </Tabs>
  );
}
