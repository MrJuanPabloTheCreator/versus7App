import { getItemAsync } from 'expo-secure-store';
import React, { createContext, useEffect, useRef, useState } from 'react';

import useSession from 'contexts/SessionContext/useSession';

interface WebSocketContextValue {
    connected: boolean
    sendMessage: (message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session } = useSession();

    const [connected, setConnected] = useState(false)
    const socketRef = useRef<WebSocket | null>(null);

    const getAccessToken = () => {
        const accessToken = getItemAsync('accessToken');
        if(accessToken) {
            return accessToken;
        } else return null;
    }

    const connectWebSocket = (accessToken: string) => {
        const wsUrl = 'wss://4ad7nsx2oa.execute-api.sa-east-1.amazonaws.com/development/';

        const socket = new WebSocket(`${wsUrl}?token=${accessToken}`);

        socket.onopen = () => {
            setConnected(true);
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message received from server:', message);
        };

        socket.onclose = () => {
            setConnected(false);
            console.log('WebSocket disconnected');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketRef.current = socket;
    };

    const sendMessage = (message: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log('Sent: ', message)
            socketRef.current.send(JSON.stringify({ action: 'sendmessage', data: message }));
        } else {
            console.error('WebSocket is not open');
        }
    };

    const disconnectWebSocket = () => {
        socketRef.current?.close();
    };

    useEffect(() => {
        if(session?.sub){
            const fetchAccessToken = async () => {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    console.log('Establishing connection...')
                    connectWebSocket(accessToken);
                }
            };
            fetchAccessToken();
        }

        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ connected, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketContext;
