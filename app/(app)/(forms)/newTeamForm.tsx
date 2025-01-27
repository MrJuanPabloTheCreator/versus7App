import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { AddDetails, Button, Input, Text, XStack, YStack } from 'components'
import { NewTeamFormFields } from 'types/formTypes';
import useTheme from 'contexts/ThemeContext/useTheme';
import { UserInfo } from 'types/returnedDataTypes';
import { registerRef, removeRef } from './utils/refRegistry';

const NewTeamForm = () => {
  const { setValue, handleSubmit, control, watch, formState: { errors }, } = useForm<NewTeamFormFields>({
    defaultValues: { teamName: '', teamIconURL: '', invitedUsers: []}
  })
  const [invitedUsers, setInvitedUsers] = useState<UserInfo[]>([])
  const { themeConstants } = useTheme();
  const router = useRouter();

  const selectUsersRefId = useRef<string | null>(null);

  const onSubmit = (form: NewTeamFormFields) => {
    console.log(form)
  }

  const updateList = (updatedList: UserInfo[]) => {
    setInvitedUsers(updatedList)
    setValue('invitedUsers', updatedList.map((user) => user.sub))
  }

  const usersObject = {updateList, users: invitedUsers} // check why the () => 

  const removeRefs = () => {
    if (selectUsersRefId.current) {
      removeRef(selectUsersRefId.current);
    }
  }

  useEffect(() => {
    selectUsersRefId.current = registerRef(usersObject);
  
    return () => {
      removeRefs();
    };
  }, [])

  return (
    <ScrollView>
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
          style={{ fontWeight: 500, fontSize: 24, paddingVertical: 12, textAlign: 'center' }}
        />

        {invitedUsers.length > 0  && (
          <XStack style={{ flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              {invitedUsers.map((user, index) => (
                  <TouchableOpacity 
                      key={index} 
                      style={{ width: '33.33%' }}>
                      <YStack style={{ gap: 8, padding: 12, paddingVertical: 16, justifyContent: 'flex-start' }}>
                          <Image
                              style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden' }}
                              src={user?.picture ? user.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                          />
                          <Text 
                              style={{ fontWeight: 500, }} 
                              numberOfLines={1}
                              ellipsizeMode="tail"
                          >
                              {user.username}
                          </Text>
                      </YStack>
                  </TouchableOpacity>
              ))}
          </XStack>
        )} 

        <AddDetails 
          text='Add Players' 
          logo={ <FontAwesome6 name="user-shield" size={24} color="white" /> }
          onPress={() => router.push(`(app)/(forms)/utils/addTeamMembers?refId=${selectUsersRefId.current}`)}
        />

        <Button text={"Crear equipo"} type='modest' onPress={handleSubmit(onSubmit)}/>

      </YStack>
    </ScrollView>
  )
}

export default NewTeamForm