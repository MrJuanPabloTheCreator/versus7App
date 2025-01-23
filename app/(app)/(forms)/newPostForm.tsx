import React, { useEffect, useRef, useState } from 'react'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { registerRef, removeRef, getAllRefs } from './utils/refRegistry';
import { useController, useForm } from 'react-hook-form';

import useTheme from 'contexts/ThemeContext/useTheme';
import useSession from 'contexts/SessionContext/useSession';
import { AddDetails, Button, SelectAccount, TextArea, XStack, YStack } from 'components'
import { NewPostFormFields } from 'types/formTypes';

const options = [
  "Buscando Jugadores",
  "Buscando Rival",
  "Buscando Equipo",
  "Buscando Liga",
  "Buscando Torneo",
  "Busco",
  "Otro" 
]

const NewPostForm = () => {
  const { session } = useSession();
  const { 
    setValue, handleSubmit, control, watch, formState: { errors },
  } = useForm<NewPostFormFields>({
    defaultValues: { sub: session?.sub, title: '', description: '', location: '', date: '' }
  })
  
  const selectDateRefId = useRef<string | null>(null);
  const selectLocationRefId = useRef<string | null>(null);

  const router = useRouter();
  const { themeConstants } = useTheme();

  const selectLocation = (newValue: string) => {
    setValue('location', newValue)
  }
  const selectDate = (newValue: string) => {
    setValue('date', newValue)
  }

  const locationObject = { selectLocation, location: () => watch('location')}
  const dateObject = { selectDate, date: () => watch('date')}

  const onSubmit = (form: any) => {
    console.log(form)
  }

  // const handleValueChange = async (field) => {
  //   if(field === 'title' && watch('title') !== 'Otro'){
  //     unregister('customTitle')
  //   }
  //   await trigger(field);
  // }

  // useEffect(() => {
  //   console.log('Component re-rendered');
  // });

  const removeRefs = () => {
    if (selectDateRefId.current) {
      removeRef(selectDateRefId.current);
    }
    if (selectLocationRefId.current) {
      removeRef(selectLocationRefId.current);
    }
  }
  
  useEffect(() => {
    selectLocationRefId.current = registerRef(locationObject);
    selectDateRefId.current = registerRef(dateObject);
  
    return () => {
      removeRefs();
    };
  }, [])

  return (
    <YStack style={{ padding: 8, gap: 8 }}>
      <SelectAccount session={session}/>

      <XStack style={{ flexWrap: 'wrap', gap: 4 }}>
        {options.map((option, index) => (
          <Button
            fitContent
            key={index}
            text={option}
            type={watch('title') === option ? 'active' : 'default'}
            onPress={() => (setValue('title', watch('title') !== option ? option : ''))}
          />
        ))}
      </XStack>

      <TextArea
        placeholder="Enter a description..."
        name="description"
        control={control}
        // rules={{
        //   required: 'Description is required',
        //   minLength: {
        //     value: 10,
        //     message: 'Description must be at least 10 characters',
        //   },
        // }}
      />
      
      <AddDetails
        text={watch('location') || 'Agregar Ubicacion'}
        onPress={() => router.push(`(app)/(forms)/utils/locationPicker?refId=${selectLocationRefId.current}`)}
        logo={<SimpleLineIcons name="location-pin" size={24} color={themeConstants.colors.text} />}
      />
      <AddDetails
        text={watch('date').split('T')[0] || 'Agregar Fecha/Hora'}
        onPress={() => router.push(`(app)/(forms)/utils/datePicker?refId=${selectDateRefId.current}`)}
        logo={<MaterialCommunityIcons name="calendar-clock-outline" size={24} color={themeConstants.colors.text} />}
      />
      {/* <Button text={"Get all refs"} onPress={getAllRefs}/> */}
      <Button text={"Submit"} type='modest' onPress={handleSubmit(onSubmit)}/>
    </YStack>
  )
}

export default NewPostForm;