import React from 'react'

import { Button, Input, Text, YStack } from 'components'
import { Image, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import { NewTeamFormFields } from 'types/formTypes';
import useTheme from 'contexts/ThemeContext/useTheme';

const NewTeamForm = () => {
  const { themeConstants } = useTheme();
  const { 
    setValue, handleSubmit, control, watch, formState: { errors },
  } = useForm<NewTeamFormFields>({
    defaultValues: { teamName: '', teamIconURL: ''}
  })

  const onSubmit = (form: NewTeamFormFields) => {
    console.log(form)
  }

  return (
    <YStack style={{ gap: 12, padding: 8 }}>
      <TouchableOpacity style={{ }}>
        <View style={{ backgroundColor: themeConstants.colors.background, borderRadius: '100%', padding: 24 }}>
          {/* <Image
            style={{ width: 36, height: 36, borderRadius: 36, overflow: 'hidden' }}
            src={session?.picture}
          /> */}
          <MaterialCommunityIcons name="shield-edit-outline" size={68} color={'white'}/>
        </View>
      </TouchableOpacity>
      <Input 
        placeholder="Team name..."
        name="teamName"
        control={control}
        rules={{
          required: 'Team name is required',
          minLength: {
            value: 5,
            message: 'Name must be at least 5 characters',
          },
        }}
        style={{ fontSize: 18, paddingHorizontal: 18 }}
      />
      <Button text={"Submit"} type='modest' onPress={handleSubmit(onSubmit)}/>
    </YStack>
  )
}

export default NewTeamForm