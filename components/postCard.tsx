import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Accordion, Text, XStack, YStack } from 'components';
import useTheme from 'contexts/ThemeContext/useTheme';
import { useRouter } from 'expo-router';

interface Post {
    post_id: string
    sub: number
    title: string
    description: string
    created_at: string
    username: string
    picture: string
}

interface PostCardProps {
    post: Post
}

const PostCard:React.FC<PostCardProps> = ({ post }) => {
    const router = useRouter();
    const { themeConstants } = useTheme();

    const timeDifference = () => {
        const todaysDate: any = new Date();
        const postDate: any = new Date(post.created_at);
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
        <YStack style={{ gap: 8, padding: 8, alignItems: 'flex-start', backgroundColor: themeConstants.colors.background }}>
            <XStack style={{ gap: 8, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => router.push(`user/${post.sub}?username=${encodeURIComponent(post.username)}${
                    post?.picture !== '' && `&picture=${encodeURIComponent(post.picture)}`}`)}
                >
                    <Image
                        style={{ width: 52, height: 52, borderRadius: 100, overflow: 'hidden' }}
                        src={post?.picture ? post.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => router.push(`team/${post.sub}?username=${encodeURIComponent(post.username)}${
                    post?.picture !== '' && `&picture=${encodeURIComponent(post.picture)}`}`)}
                >
                    <Image
                        style={{ width: 52, height: 52, borderRadius: 100, overflow: 'hidden' }}
                        src={post?.picture ? post.picture : 'https://randomuser.me/api/portraits/men/1.jpg'}
                    />
                </TouchableOpacity> */}
                <YStack style={{ alignItems: 'flex-start' }} fitContent>
                    <XStack style={{ gap: 3 }} fitContent>
                        <Text>{post.username}</Text>
                        <MaterialIcons name="verified" size={14} color="#6DF700" />
                    </XStack>
                    <Text style={{ fontSize: 12, color: 'gray' }}>Hace {timeDifference()}</Text>
                </YStack>
            </XStack>
            {/* <Text style={{ fontSize: 20 }}>{post.title}</Text> */}
            {post.description.length > 0 && <Text>{post.description}</Text>}
            <Accordion header={<Text>Club Cordillera - 19:00 Confirmado</Text>}>
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
            </Accordion>
        </YStack>
    )
}

export default PostCard