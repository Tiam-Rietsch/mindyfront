import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesome5, FontAwesome6  } from '@expo/vector-icons'
import { useGlobalContext } from '../../context/GlobalProvider'

const TabLayout = () => {
  const { isTablet } = useGlobalContext()
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#777777",
        tabBarStyle: {
          height: isTablet ? 100 : 60
        },
        tabBarIconStyle: {
          width: 100,
        },
        tabBarActiveBackgroundColor: "#8A46EA",
      }}
    >
      <Tabs.Screen 
        name="study"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="brain" size={ isTablet ? 50 : 30 } color={color}/>,
          headerShown: false
        }}
      />
      <Tabs.Screen 
        name="games"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="gamepad" size={isTablet ? 50 : 30} color={color}/>
        }}
      />
      <Tabs.Screen 
        name="chat"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="message" size={isTablet ? 50 : 30} color={color}/>
        }}
      />
      <Tabs.Screen 
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="calendar-days" size={isTablet ? 50 : 30} color={color}/>
        }}
      />
      <Tabs.Screen 
        name="stats"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name="chart-line" size={isTablet ? 50 : 30} color={color}/>
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="cog" size={isTablet ? 50 : 30} color={color}/>
        }}
      />
    </Tabs>
  )
}

export default TabLayout