import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import Inbox from '../screens/userSide/inbox/inbox';
import Messages from '../screens/Messages/messages';
 
 import * as SVGS from '../assets/svgs';
import Label from '../components/core/Label';
 

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const Tabs = [
    {
      name: 'Messages',
      component: Messages,
      title: 'offers',
      icon:'NewsFeed'
    },
    {
      name: 'Inbox',
      component: Inbox,
      title: 'Message',
       icon:'Message'
    },
    
  ];
  return (
    
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName='Messages'
      >
      {Tabs.map(item => {
          const Icon=SVGS[item?.icon];
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              header: props => null,
              tabBarLabel: '',
              tabBarIcon: isFocused => (
                <View
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                    <Icon  fill={isFocused ? 'rgba(0, 122, 255, 1)' : 'rgba(120, 120, 128, 0.4)'}/>
                 {/* <Label label={item.name} style={{fontFamily: 'Lao Sangam MN'}}/> */}
                 {/* <Icon  fill={isFocused ? 'rgba(0, 122, 255, 1)' : 'rgba(120, 120, 128, 0.4)'}/> */}
                  
                </View>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
    
  );
};
/** bottom tabbar component */
function MyTabBar(props) {
  const {state, descriptors, navigation} = props;
  return (
    <View
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        height: Platform.OS === 'android' ? 60 : 70,
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'android' ? 0 : 10,
        paddingHorizontal: 16,
          
        borderTopColor:'gray',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={0.1}
              key={index.toString()}
              accessibilityRole="button"
              accessibilityStates={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              {options.tabBarIcon(isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// const MyTabBar = props => {
//   return (
//     <View
//       style={{
//         backgroundColor: 'pink',
//         height: Platform.OS === 'android' ? 64 : 70,
//         justifyContent: 'center',
//       }}></View>
//   );
// };
export default MyTabs;
