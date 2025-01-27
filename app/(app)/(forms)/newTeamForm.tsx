import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome5';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { AddDetails, Button, Input, Text, XStack, YStack } from 'components'
import { NewTeamFormFields } from 'types/formTypes';
import useTheme from 'contexts/ThemeContext/useTheme';
import { UserInfo } from 'types/returnedDataTypes';
import { registerRef, removeRef } from './utils/refRegistry';
import useSession from 'contexts/SessionContext/useSession';

type TeamIcon = {
  teamIconURI: string;
  teamIconMetadata: {
    fileType: string;
    fileSize: number;
  }
}

const NewTeamForm = () => {
  const { setValue, handleSubmit, control, watch, formState: { errors }, } = useForm<NewTeamFormFields>({
    defaultValues: { teamName: '', teamIconURL: '', invitedUsers: []}
  })
  const [invitedUsers, setInvitedUsers] = useState<UserInfo[]>([])
  const [teamIcon, setTeamIcon] = useState<TeamIcon | null>(null)

  const { session, getAuthorizer } = useSession();
  const { themeConstants } = useTheme();
  const router = useRouter();

  const selectUsersRefId = useRef<string | null>(null);

  const getSignedURL = async (fileType: string, fileSize: number) => {
    try {
      const authorizer = await getAuthorizer();
      const getSignedURLresponse = await fetch('https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/S3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authorizer}`,
        },
        body: JSON.stringify({
          fileType,
          fileSize,
        }),
      });

      if(getSignedURLresponse.ok){
        const { signedUrl, imageUrl } = await getSignedURLresponse.json();
        return { signedUrl, imageUrl };
      } else {
        throw new Error("Failed to fetch signed URL");
      }
    } catch (error) {
      throw error;
    }
  }

  const handlePickImage = async () => {
    // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!permissionResult.granted) {
    //   Alert.alert("Permission required", "Please allow access to your photo library to upload an image.");
    //   return;
    // }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const fileType = result.assets[0].mimeType;
        const fileSize = result.assets[0].fileSize;

        if(!fileType || !fileSize){
          throw new Error('Error obtaining image metadata')
        }

        const maxSizeInMB = 5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (fileSize > maxSizeInBytes) {
          throw new Error(`File size must be under ${maxSizeInMB} MB.`);
        }

        const teamIcon = {
          teamIconURI: result.assets[0].uri,
          teamIconMetadata: { fileType, fileSize }
        }
        setTeamIcon(teamIcon);
      }
    } catch(error){
      Alert.alert('Error uploading image',`${error}`);
    }
  };

  const onSubmit = async (formData: NewTeamFormFields) => {
    console.log(formData)
    try {
      if(teamIcon?.teamIconMetadata){
        const { fileType, fileSize } = teamIcon.teamIconMetadata;
        const { signedUrl, imageUrl } = await getSignedURL(fileType, fileSize);

        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType,
            'Content-Length': String(fileSize)
          },
          body: await fetch(teamIcon.teamIconURI).then(res => res.blob()),
        });

        if(uploadResponse.ok){
          formData.teamIconURL = imageUrl;       
        } else {
          throw new Error("Failed to upload image");
        }
      }

      const postTeam = await fetch('https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthorizer()}`,
        },
        body: JSON.stringify(formData),
      })

      if(postTeam.ok){
        console.log(await postTeam.json())
      } else {
        throw new Error("Failed to post team");
      }
    } catch(error) {
      Alert.alert('Error creating team.',`${error}`);
    }
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

        <TouchableOpacity onPress={handlePickImage}> 
          {teamIcon ? (
            <Image
              style={{ width: 68, height: 68, borderRadius: 36, overflow: 'hidden' }}
              src={teamIcon.teamIconURI}
            />
          ):(
            <View style={{ backgroundColor: themeConstants.colors.background, borderRadius: '100%', padding: 24 }}>
              <MaterialCommunityIcons name="shield-edit-outline" size={68} color={'white'}/>
            </View>
          )}
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