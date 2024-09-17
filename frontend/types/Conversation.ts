import { Prompt } from "./Prompt";

export interface ConversationGet {
    _id: string;
    name: string;
    params?: {[key: string]: string};
    tokens?: number;
}

export interface Conversation {
    _id: string;
    name: string;
    params?: {[key: string]: string};
    tokens?: number; 
}

export interface ConversationFull extends Conversation {
    message?: Prompt[];
}

export interface ConversationPOST {
    name: string;
    params?: {[key: string]: string}
}

export interface ConversationPUT {
    name: string;
    params?: {[key: string]: string}
}