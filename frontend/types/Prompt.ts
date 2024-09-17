export type QueryRoleType = 'system' | 'user' | 'assistant' | 'function';

export interface Prompt {
    role: QueryRoleType;
    content: string;
}