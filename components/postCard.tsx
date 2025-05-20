import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Accordion, Button, Text, XStack, YStack } from 'components';
import useTheme from 'contexts/ThemeContext/useTheme';
import { useRouter } from 'expo-router';
import Sticker from './sticker';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

interface PostCardProps {
    post: Post;
}


const PostCard:React.FC<PostCardProps> = ({ post }) => {
    const router = useRouter();
    const { themeConstants } = useTheme();

    const timeDifference = () => {
        const todaysDate: any = new Date();
        const postDate: any = new Date(post.timestamp);
        const differenceInMs = todaysDate - postDate;
        
        const minutes = Math.floor(differenceInMs / (1000 * 60));
        const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
        const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      
        if (minutes < 60) {
          return `${minutes} min`;
        } else if (minutes > 60 && hours < 24) {
          return `${hours} hora${hours > 1 ? 's' : ''}`;
        } else {
          return `${days} dia${days > 1 ? 's' : ''}`;
        }
      }

    return (
        <TouchableOpacity 
            onPress={() => router.push(`note/${post.post_id}`)}
            style={{ gap: 12, paddingHorizontal: 12, paddingVertical: 12, width: '100%', backgroundColor: themeConstants.colors.background }}
        >
            <XStack fitContent style={{ position: 'absolute', gap: 12, right: 4, top: 4 }}>
                <TouchableOpacity style={{ padding: 8 }}>
                    <Entypo name="dots-three-horizontal" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 8 }}>
                    <Feather name="x" size={20} color="gray" />
                </TouchableOpacity>
            </XStack>
            <XStack style={{ gap: 8, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => router.push(`user/${post.sub}?username=${encodeURIComponent(post.username)}${
                    post?.picture !== '' && `&picture=${encodeURIComponent(post.picture)}`}`)}
                >
                    <Image
                        style={{ width: 52, height: 52, borderRadius: 100, overflow: 'hidden' }}
                        src={post?.picture ? post.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                    />
                </TouchableOpacity>
                <YStack style={{ alignItems: 'flex-start' }} fitContent>
                    <XStack style={{ gap: 3 }} fitContent>
                        <Text style={{ fontSize: 16 }}>{post.username}</Text>
                        <MaterialIcons name="verified" size={14} color="#6DF700" />
                    </XStack>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Hace {timeDifference()}</Text>
                </YStack>
            </XStack>
            <YStack style={{ alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 24, fontWeight: 600 }}>{post.title}</Text>
                {post.description.length > 0 && <Text>{post.description}</Text>}
            </YStack>
            <YStack style={{ gap: 8 }}>
                <XStack style={{ justifyContent: 'flex-start', gap: 8 }}>
                    <Sticker type='blue' text='7:15 PM'/>
                    <Sticker text='$3.00'/>
                    <Sticker type='purple' text='Sintetico'/>
                </XStack>
                <XStack style={{ gap: 4, justifyContent: 'flex-start' }}>
                    <SimpleLineIcons name="location-pin" size={16} color="gray"/>
                    <Text style={{ fontSize: 14, color: 'gray' }}>Av. Padre Hurtado 2650, Las Condes</Text>
                </XStack>
            </YStack>
            <XStack style={{ gap: 8 }}>
            <TouchableOpacity style={{ backgroundColor: themeConstants.colors.secondary, padding: 10, borderRadius: '100%'}}>
                    <AntDesign name="staro" size={24} color="#6DF700" />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: themeConstants.colors.secondary, padding: 12, borderRadius: '100%'}}>
                    <FontAwesome6 name="message" size={20} color="#6DF700" />
                </TouchableOpacity>
                <TouchableOpacity style={{ 
                    backgroundColor: themeConstants.colors.primary, flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 24
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: "black" }}>Request to join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: themeConstants.colors.secondary, padding: 10, borderRadius: '100%'}}>
                    <Feather name="heart" size={24} color="#6DF700" />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: themeConstants.colors.secondary, padding: 10, borderRadius: '100%'}}>
                    <Feather name="send" size={24} color="#6DF700"/>
                </TouchableOpacity>
            </XStack>
            {/* <Accordion header={<Text>Club Cordillera - 19:00 Confirmado</Text>}>
                <YStack style={{ flex: 1 }}>
                    <Text>
                        Hi
                    </Text>
                    <Text>
                        Hi
                    </Text>
                    <Text>
                        Hi
                    </Text>
                </YStack>
            </Accordion> */}
        </TouchableOpacity>
    )
}

export default PostCard