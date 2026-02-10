import React from 'react';
import { PlanType } from '@/interfaces';
import { Text, TouchableOpacity, View } from 'react-native';


const PLANS: PlanType[] = [
  {
    id: 1,
    name: 'Starter',
    trialPeriod: 7,
    amount: 29
  },
  {
    id: 2,
    name: 'Professional',
    trialPeriod: 14,
    amount: 45
  }
]

type PlanPropsType = {
  selectedPlan: PlanType | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<PlanType | null>>;
  setSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}

const Plan = ({ selectedPlan, setSelectedPlan, setSuccessful }: PlanPropsType) => {
  
  const selectPlan = (value: string) => {
    const selectedPlan = PLANS?.find(plan => plan.name === value);
    selectedPlan && setSelectedPlan(selectedPlan);
  }

  return (
      <View>
        {PLANS?.map((item, i) => (
          <TouchableOpacity
            onPress={() => selectPlan(item.name)}
            key={i} 
            className={`w-full px-3 py-4 rounded-2xl border flex-row items-center justify-between mb-5 ${selectedPlan?.name === item.name ? 'border-blueColor' : 'border-grayText'}`}
          >
            {/* <RadioButton value={item.name} /> */}
            <View className='flex-row items-center gap-5'>
              <View className={`w-[22px] h-[22px] items-center justify-center rounded-full ${selectedPlan?.name === item.name ? 'border-2 border-blueColor' : 'border border-grayText'}`}>
                {selectedPlan?.name === item.name && <View className='bg-blueColor w-[13px] h-[13px] rounded-full'></View>}
              </View>
              <View>
                <Text className='text-lightText text-2xl font-bold'>{item.name}</Text>
                <Text className='text-grayText text-xl'>{item.trialPeriod} - days free trial</Text>
              </View>
            </View>
            <Text className='text-lightText text-lg'>
              <Text className='text-2xl font-bold'>${item.amount}</Text>
              /month
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => setSuccessful(true)} className='bg-blueColor w-full py-4 rounded-full mb-5'>
          <Text className='text-lightText text-center text-xl font-bold'>Continue for Payment</Text>
        </TouchableOpacity>
        <Text className='text-lightText text-lg text-center'>Terms of use | Privacy Policy | Restore</Text>
      </View>
  )
}

export default Plan