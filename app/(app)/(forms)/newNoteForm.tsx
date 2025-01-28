import React, { useEffect, useRef, useState } from 'react'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { registerRef, removeRef, getAllRefs } from './utils/refRegistry';
import { useController, useForm } from 'react-hook-form';

import useTheme from 'contexts/ThemeContext/useTheme';
import useSession from 'contexts/SessionContext/useSession';
import { AddDetails, Button, Input, SelectAccount, Text, TextArea, XStack, YStack } from 'components'
import { NewPostFormFields } from 'types/formTypes';
import { Alert } from 'react-native';

const options = [
  "Buscando Jugador/es",
  "Buscando Rival",
  "Buscando Equipo",
  "Buscando Liga",
  "Buscando Torneo",
  "Otro"
]

const NewNoteForm = () => {
  const { session, getAuthorizer } = useSession();
  const { 
    setValue, handleSubmit, unregister, control, watch, formState: { errors },
  } = useForm<NewPostFormFields>({
    defaultValues: { 
      user: {
        sub: session?.sub,
        username: session?.preferred_username,
        picture: session?.picture,
      }, title: options[0], description: '', location: '', date: '' }
  })

  const [customTitle, setCustomTitle] = useState(false)
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

  const onSubmit = async (formData: NewPostFormFields) => {
    if(formData.customTitle){
      formData.title = formData.customTitle
      delete formData.customTitle
    }

    formData.timestamp = new Date().toISOString();

    try {
      const authorizer = await getAuthorizer();
      //add authorizer to endpoint
      const formResponse = await fetch('https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/notes', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${authorizer}`,
        // },
        body: JSON.stringify(formData)
      })
      if(formResponse.ok){
        console.log('Note uploaded!')
        router.back()
        router.back()
      } else {
        const response = await formResponse.json()
        console.log(response)
        Alert.alert('Error Uploading Note', 'Internal server error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleTitleChange = async (option: string) => {
    if(option !== watch('title')) {
      setValue('title', option)
      if(option === 'Otro'){
        setCustomTitle(true)
      } else {
        setCustomTitle(false)
        unregister('customTitle')
      }
    }
  }

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

  // useEffect(() => {
  //   console.log('Component re-rendered');
  // });

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
            onPress={() => handleTitleChange(option)}
          />
        ))}
      </XStack>

      {customTitle && 
        <Input 
          placeholder='Enter custom title...'
          name='customTitle'
          control={control}
          rules={{
            required: 'Custom title is required'
          }}
        />
      }

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
        onPress={() => router.push(`utils/locationPicker?refId=${selectLocationRefId.current}`)}
        logo={<SimpleLineIcons name="location-pin" size={24} color={themeConstants.colors.text} />}
      />
      <AddDetails
        text={watch('date').split('T')[0] || 'Agregar Fecha/Hora'}
        onPress={() => router.push(`utils/datePicker?refId=${selectDateRefId.current}`)}
        logo={<MaterialCommunityIcons name="calendar-clock-outline" size={24} color={themeConstants.colors.text} />}
      />
      {/* <Button text={"Get all refs"} onPress={getAllRefs}/> */}
      <Button text={"Subir nota"} type='modest' onPress={handleSubmit(onSubmit)}/>
    </YStack>
  )
}

export default NewNoteForm;